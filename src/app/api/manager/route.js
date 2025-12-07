export async function GET(req, res) {

  console.log("in the manager api page")

  // get the values that were sent across to us
  const { searchParams } = new URL(req.url)
  const customerName = searchParams.get('customerName')
  const address = searchParams.get('address')
  const paymentMethod = searchParams.get('paymentMethod')
  const total = searchParams.get('total')

  // =================================================
  const { MongoClient } = require('mongodb');

  const url = 'mongodb+srv://admin:pass@task5.vfmocfc.mongodb.net/?appName=Task5';
  const client = new MongoClient(url);

  const dbName = 'app'; // database name

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('orders'); // collection name

  const query = {};
  if (customerName) query.customerName = customerName;
  if (address) query.address = address;
  if (paymentMethod) query.paymentMethod = paymentMethod;
  if (total) query.total = total; // build query

  const findResult = await collection.find(query).toArray();

  console.log('Found documents =>', findResult);

  let valid = false

  if(findResult.length > 0){
    valid = true;
    console.log("db pull successful")
  } else {
    valid = false;
    console.log("db pull failed")
  }

  //==========================================================

  // at the end of the process we need to send something back
  return Response.json({ data: findResult, success: valid })
}
