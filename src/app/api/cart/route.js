export async function POST(req) {

  console.log("in the cart api page")

  // get the values that were sent across to us
  const body = await req.json()
  const cart = body.cart
  const total = body.total

  // =================================================
  const { MongoClient } = require('mongodb');

  const url = 'mongodb+srv://admin:pass@task5.vfmocfc.mongodb.net/?appName=Task5';
  const client = new MongoClient(url);

  const dbName = 'app'; // database name

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('cart'); // collection name

  const insertResult = await collection.insertOne({ 
    items: cart, 
    total: total,
    createdAt: new Date()
  });

  console.log('Inserted document =>', insertResult);

  let valid = false

  if(insertResult.insertedId){
    valid = true;
    console.log("cart save successful")
  } else {
    valid = false;
    console.log("cart save failed")
  }

  //==========================================================

  // at the end of the process we need to send something back
  return Response.json({ data: insertResult.insertedId, success: valid })
}

export async function GET(req) {

  console.log("in the cart api page - GET")

  // =================================================
  const { MongoClient } = require('mongodb');

  const url = 'mongodb+srv://admin:pass@task5.vfmocfc.mongodb.net/?appName=Task5';
  const client = new MongoClient(url);

  const dbName = 'app'; // database name

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('cart'); // collection name

  // Get the most recent cart
  const findResult = await collection.find({}).sort({ createdAt: -1 }).limit(1).toArray();

  console.log('Found cart =>', findResult);

  let valid = false

  if(findResult.length > 0){
    valid = true;
    console.log("cart retrieval successful")
  } else {
    valid = false;
    console.log("no cart found")
  }

  //==========================================================

  // send back the cart items or empty array
  return Response.json({ data: findResult[0] || null, success: valid })
}
