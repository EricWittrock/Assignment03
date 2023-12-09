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
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;
    const imgUrl = req.body.imgUrl;
    const id = req.body.id*1;
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

app.put("/updatePrice", async (req, res) => {
    console.log("updateItem");
    console.log(req.body);

    const id = req.body.id * 1;
    const price = req.body.price;

    const results = await collection.find({ id: id }).toArray();
    if (results.length === 0) {
        res.json({ success: false, error: "No item with that id exists" });
        return;
    }

    const updatedItem = {
        price: price,
        id: id
    };

    await collection.updateOne({ id: id }, { $set: { price: price } });
    console.log("Updated item with ID: " + id);

    res.json({ success: true, message: "Item updated successfully", updatedItem: updatedItem });
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