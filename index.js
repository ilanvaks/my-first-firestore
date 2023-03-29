// Import the tools from firebase-admin
import { initializeApp, cert } from "firebase-admin/app"; // we use to connect our firebase project
import { getFirestore } from "firebase-admin/firestore"; // we use to connect to firestone

//Import our credentials from a secert file 
import { credentials } from "./credentials.js";

// Connect to our Firebase project
initializeApp({
  credential: cert(credentials)
});

// Connect to Firestore DB
const db = getFirestore();
// first 14 lines connecting to our database
// Add a product to our products collection
const candy2 = {
  name: "twix",
  unitPrice: 2.99,
  size: "12 oz",
  color: "gold",
  inventory: 288,
  productNumber: 2,
}

//how to add a document to Firestore
// db.collection('products').add(candy2) // while we are waiting on the promise... (creates the promise)
//   .then((doc) => {
//     console.log("added doc: " + doc.id) //resolves the promise
//     // i can be sure the inside .then() that the first pricess was completely successfully
//   })
//   .catch(err => console.log(err)) // if promise rejected .then doesnt work will return error because of this line


//How to update a document in Firestore:
db.collection('products').doc('b8lAwPczsHuWxQcR7E2W').update({
  inventory: 555,
  customerFavorite: true 
}) 


// how to read a document from Firestore: (CRUD)

// db.collection('products').doc('b8lAwPczsHuWxQcR7E2W').get() 
//THIS is how u delete a document even though you 
//dont delete much 

 db.collection('products').doc('b8lAwPczsHuWxQcR7E2W').get() 
  .then(doc => {
    console.log(doc.data())
  })
  .catch(err => console.log(err))

  //how to get a whole collection:

db.collection('products').get()
  .then(collection => {
    const productList = collection.docs.map(doc => ({...doc.data(), id: doc.id }))
    console.table(productList); // can be console.log or .table
  })
  .catch(err => console.log(err)) 