const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const connectionParameters = require("../config/database.config");
const app = express();
const port = 5000;

let cartCollection;
let collection;
app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.get('/fetchAlldata', async (req, res) => {
    try {
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});
app.delete('/emptyCart', async (req, res) => {
    try {
        const result = await cartCollection.deleteMany({});

        res.status(200).json({
            message: 'All items removed from cart',
            deletedCount: result.deletedCount
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to clear cart' });
    }
});
app.post('/searchInAllItems', async (req, res) => {

    const { searchQuery } = req.body;
    try {
        const results = await collection.find({
            $or: [
                { "Variant SKU": { $regex: searchQuery, $options: 'i' } },
                { "Title": { $regex: searchQuery, $options: 'i' } }
            ]
        }).toArray();

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Search failed' });
    }
});

app.post('/addItemToCart', async (req, res) => {
    try {
        await cartCollection.insertOne(req.body);
        res.status(200).json(req.body);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add item to cart' });
    }
});
app.post('/deleteFromCart', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Request body is empty' });
        }

        const result = await cartCollection.deleteOne(req.body);

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }

        res.status(200).json({
            message: 'Item removed from cart',
            deletedItem: req.body
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove item from cart' });
    }
});
app.get('/getCartItems', async (req, res) => {
    try {
        const data = await cartCollection.find({}).toArray();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

async function dbConnection() {
    try {
        const client = new MongoClient(connectionParameters.url);
        await client.connect();
        const db = client.db('karini_assessment');
        collection = db.collection('all_products');
        cartCollection = db.collection('cart');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error("Failed to connect to DB", err);
    }
}

dbConnection();
