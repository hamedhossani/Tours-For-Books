require('dotenv').config()
const port = process.env.PORT || 3000,
      express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path')

// PRESET
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// BASE SETUP
app.use(express.static(path.resolve(__dirname, 'public')))

// DB CONNECT/INIT
import 'firebase-functions';

import * as admin from 'firebase-admin';
var serviceAccount = require(path.resolve(__dirname, 'serviceAccountKey.json'));

var api = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: functions.config().api.dburl,
  storageBucket: functions.config().api.storagebucket,
}
var app = admin.initializeApp(api);

var db = app.database();
var storage = app.storage();

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

// Payment
var braintree = require("braintree");
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  accessToken: process.env.BRAINTREE_SANDBOX_ACCESS_TOKEN
});
// Get client token 
app.get('/api/client_token', function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    if(response.clientToken) {
      res.send({'clientToken': response.clientToken})
    } else {
      res.send({'error': err})
    }
  });
});

// Make payment
app.post('/api/checkout', (req, res) => {
  var nonce = req.body.payload.nonce;
  var transaction = req.body.transaction;
  
  var saleRequest = {
    amount: transaction.paypal.amount,
    merchantAccountId: "USD",
    paymentMethodNonce: nonce,
    orderId: transaction.paypal.orderId,
    options: {
      paypal: {
        customField: "TourID",
        description: transaction.paypal.tourId
      },
      submitForSettlement: true
    }
  }
  
  gateway.transaction.sale(saleRequest, function (error, result) {
  if (error) {
    res.send({ "error": error });
  } else if (result.success) {
    res.send({"status": "success", "transactionID": result.transaction.id, "payerEmail": result.transaction.paypal.payerEmail  });
  } else {
    res.send({"status": "failed", "message": result.message});
  }
});
})

// RUN APP
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

app.listen(port, '0.0.0.0', function() {
  console.log('Listening on port ' + port)
})
