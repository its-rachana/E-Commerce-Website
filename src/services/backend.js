// src/services/backend.js
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const next = require("next");
const connectionParameters = require("../config/database.config");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const Stripe = require('stripe');
const stripe = Stripe("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");
const PORT = process.env.PORT || 3000;

async function initializeServer() {
    try {
        await nextApp.prepare();
        const app = express();
        app.use(cors({ origin: "*" }));
        app.use(express.json());
        const client = new MongoClient(connectionParameters.url);
        await client.connect();
        const db = client.db("karini_assessment");
        const userDb = client.db("user_auth_db");

        const collection = db.collection("all_products");
        const cartCollection = db.collection("cart");
        const userAddressesCollection = userDb.collection("user_address");
        app.post('/retrieveKey', async (req, res) => {
            const { amount } = req.body;

            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount,
                    currency: 'usd',
                });

                res.send({ clientSecret: paymentIntent.client_secret });
            } catch (err) {
                res.status(500).send({ error: err.message });
            }
        });
        //API calls for user data retrieval
        app.post('/userAddresses', async (req, res) => {
            console.log("Request received at /userAddresses");

            try {
                const { email } = req.body;
                console.log("Email received:", email);

                if (!email) {
                    console.log("No email provided");
                    return res.status(400).json({ error: "Email is required" });
                }

                const user = await userAddressesCollection.findOne({ email: email });

                if (!user) {
                    console.log("User not found in DB");
                    return res.status(404).json({ error: "User not found" });
                }

                console.log("User found:", user);
                return res.json(user.addressList || []);
            } catch (err) {
                console.error("Error occurred while fetching addresses:", err);
                return res.status(500).json({ error: "Failed to fetch address list" });
            }
        });


        app.get("/fetchAlldata", async (req, res) => {
            try {
                const data = await collection.find({}).toArray();
                res.json(data);
            } catch (err) {
                res.status(500).json({ error: "Failed to fetch data" });
            }
        });

        app.delete("/emptyCart", async (req, res) => {
            try {
                const result = await cartCollection.deleteMany({});
                res.status(200).json({
                    message: "All items removed from cart",
                    deletedCount: result.deletedCount,
                });
            } catch (err) {
                res.status(500).json({ error: "Failed to clear cart" });
            }
        });

        app.post("/searchInAllItems", async (req, res) => {
            const { searchQuery } = req.body;
            try {
                const results = await collection
                    .find({
                        $or: [
                            { "Variant SKU": { $regex: searchQuery, $options: "i" } },
                            { Title: { $regex: searchQuery, $options: "i" } },
                        ],
                    })
                    .toArray();
                res.json(results);
            } catch (err) {
                res.status(500).json({ error: "Search failed" });
            }
        });

        app.post("/addItemToCart", async (req, res) => {
            try {
                await cartCollection.insertOne(req.body);
                res.status(200).json(req.body);
            } catch (err) {
                res.status(500).json({ error: "Failed to add item to cart" });
            }
        });

        app.post("/deleteFromCart", async (req, res) => {
            try {
                if (!req.body || Object.keys(req.body).length === 0) {
                    return res.status(400).json({ error: "Request body is empty" });
                }

                const result = await cartCollection.deleteOne(req.body);
                if (result.deletedCount === 0) {
                    return res.status(404).json({ error: "Item not found in cart" });
                }

                res.status(200).json({
                    message: "Item removed from cart",
                    deletedItem: req.body,
                });
            } catch (err) {
                res.status(500).json({ error: "Failed to remove item from cart" });
            }
        });

        app.get("/getCartItems", async (req, res) => {
            try {
                const data = await cartCollection.find({}).toArray();
                res.json(data);
            } catch (err) {
                res.status(500).json({ error: "Failed to fetch data" });
            }
        });

        app.use((req, res) => {
            return handle(req, res);
        });

        app.listen(PORT, () => {
            console.log("Server running at http://localhost:",PORT);
        });

    } catch (error) {
        console.error("Server startup error:", error);
        process.exit(1);
    }
}

initializeServer();
