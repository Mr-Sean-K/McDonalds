export async function POST(req) {

  console.log("in the checkout api page")

  // get the values that were sent across to us
  const body = await req.json()
  const customerName = body.customerName
  const address = body.address
  const paymentMethod = body.paymentMethod
  const cardNumber = body.cardNumber
  const orderNotes = body.orderNotes
  const total = body.total

  // =================================================
  const { MongoClient } = require('mongodb');

  const url = 'mongodb+srv://admin:pass@task5.vfmocfc.mongodb.net/?appName=Task5';
  const client = new MongoClient(url);

  const dbName = 'app'; // database name

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('orders'); // collection name

  const insertResult = await collection.insertOne({ 
    customerName: customerName,
    address: address,
    paymentMethod: paymentMethod,
    cardNumber: cardNumber,
    orderNotes: orderNotes,
    total: total,
    timestamp: new Date()
  });

  console.log('Inserted order =>', insertResult);

  let valid = false

  if(insertResult.insertedId){
    valid = true;
    console.log("order save successful")
  } else {
    valid = false;
    console.log("order save failed")
  }

  //==========================================================

  // at the end of the process we need to send something back
  return Response.json({ data: insertResult.insertedId, success: valid })
}
