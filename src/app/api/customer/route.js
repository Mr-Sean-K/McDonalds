export async function GET(req, res) {


  // Make a note we are on

  // the api. This goes to the console.

  console.log("in the api page")



  // get the values

  // that were sent across to us.

  const { searchParams } = new URL(req.url)

    const category = searchParams.get('category')
    const name = searchParams.get('name')
    const price = searchParams.get('price')
    const image = searchParams.get('image')
    const description = searchParams.get('description')



 // =================================================

  const { MongoClient } = require('mongodb');


  const url = 'mongodb+srv://admin:pass@task5.vfmocfc.mongodb.net/?appName=Task5';

  const client = new MongoClient(url);

  const dbName = 'app'; // database name


  await client.connect();

  console.log('Connected successfully to server');

  const db = client.db(dbName);

  const collection = db.collection('products'); // collection name

  const query = {};
    if (category) query.category = category;
    if (name) query.name = name;
    if (price) query.price = price;
    if (image) query.image = image;
    if (description) query.description = description; // build query

  const findResult = await collection.find(query).toArray();

  console.log('Found documents =>', findResult);


  let valid = false

  if(findResult.length >0 ){

          valid = true;

          console.log("db pull successful")

  } else {


        valid = false;

        console.log("db pull failed")

  }



 //==========================================================




  // at the end of the process we need to send something back.

  return Response.json({ data: findResult, success: valid })

}