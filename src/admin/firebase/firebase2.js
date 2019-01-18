
import React, {
  Component,
  createRef
} from 'react';
 

const devConfig = {
  apiKey: "AIzaSyDX8HXto42pWC12zdcZwrt-RIPScFyJBik",
  authDomain: "bloggy-170620.firebaseapp.com",
  databaseURL: "https://bloggy-170620.firebaseio.com",
  projectId: "bloggy-170620",
  storageBucket: "bloggy-170620.appspot.com",
  messagingSenderId: "634344137184"
};


var admin = require('firebase-admin');
//admin
var serviceAccount = require(path.resolve(__dirname, 'serviceAccountKey.json')); 

admin.initializeApp({
    credential : admin.credential.cert(serviceAccount),
    databaseURL : devConfig.databaseURL,
    storageBucket : devConfig.storageBucket
  });
const db = admin.database();
const storage = admin.storage();


console.log(db);
console.log(storage);

// export {
//   database 
// }