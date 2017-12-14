require('dotenv').config()
const port = process.env.PORT || 3000,
      express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path')
let request = require('request')

// PRESET
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// BASE SETUP
app.use(express.static(path.resolve(__dirname, 'public')))

// DB CONNECT/INIT
var admin = require('firebase-admin');
var serviceAccount = require(path.resolve(__dirname, 'serviceAccountKey.json'));
var storageBucket = process.env.STORAGE_BUCKET

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL,
  storageBucket: storageBucket
});

var db = admin.database();
var storage = admin.storage();

app.get('/api/tours', (req, res) => {
  db.ref('tours').once('value', (data) => {
    res.send(data.val());
  })
});

app.get('/api/tour/:id', (req, res) => {
  db.ref('/tours/' + req.params.id).once('value', (data) => {
    res.send(data.val());
  })
});

// Get one image's link by its name
app.get('/api/image/:folder/:name', (req, res) => {
  res.send({link: `https://storage.googleapis.com/${storageBucket}/${req.params.folder}/${req.params.name}`})
})

// Get all images links in one folder
// Upload images on Firebase have to be .jpg
app.get('/api/images/:folder', (req, res) => {
  const options = {
    prefix: `${req.params.folder}/`,
    delimiter: '/'
  }
  storage.bucket().getFiles(options).then(links => {
    res.send({links: links})
  })
})

// Make Payment call: 
// get token and send payment info to PayPal
// return payment id
// TO DO: fix this paypal server integration
app.post('/api/make_payment', async function(req, res) {
  try {
    let oauth = await request.post({
      uri:  'https://api.paypal.com/v1/oauth2/token',
      body: 'grant_type=client_credentials',
      auth: {
        user: process.env.NODE_ENV='development'? process.env.PAYPAL_SANDBOX_CLIENT_ID : process.env.PAYPAL_PROD_CLIENT_ID,
        pass: process.env.NODE_ENV='development'? process.env.PAYPAL_SANDBOX_SECRET : process.env.PAYPAL_PROD_CLIENT_ID_SECRET
      }
    })
    
    let payment = await request.post({
      uri: 'https://api.paypal.com/v1/payments/payment',
      auth: { bearer: oauth.access_token },
      json: true,
      body: req.body
    })
    
    res.send({ id: payment.id })
  }   catch(e) {
    res.send(e)
  }
  
})

// Execute Payment call: 
// get token and send payer info to PayPal
// return execution result
app.post('/api/execute_payment', async function(req, res) {
  let paymentID = req.body.paymentID;
  let payerID = req.body.payerID;
  console.log(paymentID)
  let oauth = await request.post({
    uri:  'https://api.paypal.com/v1/oauth2/token',
    body: 'grant_type=client_credentials',
    auth: {
      user: process.env.NODE_ENV='development'? process.env.PAYPAL_SANDBOX_CLIENT_ID : process.env.PAYPAL_PROD_CLIENT_ID,
      pass: process.env.NODE_ENV='development'? process.env.PAYPAL_SANDBOX_SECRET : process.env.PAYPAL_PROD_CLIENT_ID_SECRET
    }
  });

  let payment = await request.post({
    uri:  `https://api.paypal.com/v1/payments/payment/${paymentID}/execute`,
    auth: { bearer: oauth.access_token },
    json: true,
    body: { payer_id: payerID }
  });

  res.json({ status: 'success' });
})

// RUN APP
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

app.listen(port, '0.0.0.0', function() {
  console.log('Listening on port ' + port)
})
