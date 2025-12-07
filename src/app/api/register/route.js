export async function POST(req) {

  console.log("in the register api page")

  // get the values that were sent across to us
  const body = await req.json()
  const email = body.email
  const password = body.password
  const fullName = body.fullName

  // =================================================
  const { MongoClient } = require('mongodb');

  const url = 'mongodb+srv://admin:pass@task5.vfmocfc.mongodb.net/?appName=Task5';
  const client = new MongoClient(url);

  const dbName = 'app'; // database name

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('users'); // collection name

  // Check if user already exists
  const existingUser = await collection.findOne({ email: email });

  let valid = false
  let message = ""

  if(existingUser){
    valid = false;
    message = "User already exists";
    console.log("registration failed - user exists")
  } else {
    // Insert new user with default acc_type as 'customer'
    const insertResult = await collection.insertOne({ 
      email: email, 
      password: password,
      fullName: fullName,
      acc_type: 'customer'
    });
    
    console.log('Inserted user =>', insertResult);
    valid = true;
    message = "Registration successful";
    console.log("registration successful")
  }

  //==========================================================

  // at the end of the process we need to send something back
  return Response.json({ success: valid, message: message })
}
