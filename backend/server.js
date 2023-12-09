const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require("cors");
const { MongoClient } = require("mongodb");

const port = 8000;
const url = "mongodb://127.0.0.1:27017/";
const dbName = "reactdata";
const collectionName = "fakestore_catalog";

const client = new MongoClient(url);
var db;
var collection;

app.use(cors());
app.use(bodyParser.json());

// user makes request for the list of shop items
app.get('/shopdata', async (req, res) => {
    const results = await collection.find({}).toArray();
    res.json(results);
});


app.post('/login', async (req, res) => {
    // const email = req.body.email;
    // const password = req.body.password;
    // const passHash = hashPassword(password);

    // const results = await collection.find({"email":email}).toArray();

    // if(results.length == 0) {
    //     res.json({success: false, error: "No account with that email exists"});
    //     return;
    // }

    // if(results[0].password != passHash) {
    //     res.json({success: false, error: "Incorrect password"});
    //     return;
    // }

    // const sessId = randSessionId();
    // await collection.updateOne({email:email},{$set:{session:sessId}})
    // res.json({success: true, email: email, session: sessId});
});

app.post('/sessionLogin', async (req, res) => {
    // const sess = req.body.session;
    // const results = await collection.find({"session":sess}).toArray();

    // if(results.length == 0) {
    //     res.json({success: false});
    //     return;
    // }

    // res.json({success: true, email: results[0].email});
});

// user makes request to create new account
app.post('/register', async (req, res) => {
    // const email = req.body.email;
    // const password = req.body.password;
    // const passHash = hashPassword(password);

    // const results = await collection.find({"email":email}).toArray();

    // if(results.length != 0) {
    //     res.json({success: false, error: "An account already exists with that email"});
    //     return;
    // }

    // const sessId = randSessionId();
    // const newUser = {
    //     email: email,
    //     password: passHash,
    //     session: sessId,
    //     cart: {}
    // };
    // await collection.insertOne(newUser);

    // console.log("register with email: " + email + " and password: " + password);
    // console.log("Hashed password: " + passHash);

    // res.json({success: true, email: email, session: sessId});
});

app.delete("/deleteItem/", async (req, res) => {
    const id = req.body.id*1;
    console.log("request to delete item with id: " + id);
    // check if item exists
    const results = await collection.find({id:id}).toArray();
    if(results.length == 0) {
        res.json({success: false, error: "No item with that id exists"});
        return;
    }
    console.log("deleting item...");
    await collection.deleteOne({"id":id});
    res.json({success: true});
});

app.post("/addItem/", async (req, res) =>{
    console.log("addItem");
    console.log(req.body);
    const name = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;
    const imgUrl = req.body.image;
    const id = req.body.id;
    const ratingNum = req.body.ratingNum;
    const ratingCount = req.body.ratingCount;

    const results = await collection.find({id:id}).toArray();
    if(results.length != 0) {
        res.json({success: false, error: "An item with that id already exists"});
        return;
    }

    const newItem = {
        title: name,
        price: price,
        description: description,
        category: category,
        image: imgUrl,
        id: id,
        rating: {
            rate: ratingNum,
            count: ratingCount
        }
    };

    await collection.insertOne(newItem);
    console.log("Added new item with ID: " + id);

    res.json({ success: true, message: "Item added successfully", newItem: newItem });
});

app.put("/updateCart/", async (req, res) => {
    console.log("updateCart");
    console.log(req.body);
    await collection.updateOne({session:req.body.session},{$set:{cart:req.body.cart}});
    res.json({success: true});
});

app.post("/getCart/", async (req, res) => {
    console.log("getCart");
    const results = await collection.find({"session":req.body.session}).toArray();
    if(results.length == 0) {
        res.json({success: false});
        console.log("getCart failed");
        return;
    }
    res.json({success: true, cart: results[0].cart});
});

(async ()=>{
    console.log("Connecting to database...");
    await client.connect();
    db = client.db(dbName);
    collection = db.collection(collectionName);
    console.log("Connected to database");

    app.listen(port, () => console.log(`listening on port ${port}`));
})();

app.use('/public', express.static(path.join(__dirname, 'public')));