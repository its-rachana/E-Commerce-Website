// src/services/backend.js
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const next = require("next");
const bcrypt = require("bcrypt"); 
const connectionParameters = require("../config/database.config");

require("dotenv").config(); // load .env first
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;


const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const PORT = process.env.PORT || 3000;

async function initializeServer() {
    try {
        await nextApp.prepare();
        const app = express();

        app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        }));

        app.use(passport.initialize());
        app.use(passport.session());


        app.use(cors({ origin: "*" }));
        app.use(express.json());

        const client = new MongoClient(connectionParameters.url);
        await client.connect();

        const db = client.db("karini_assessment");
        const collection = db.collection("all_products");
        const cartCollection = db.collection("cart");

        const userDB = client.db("user_auth_db"); 
        const userCollection = userDB.collection("users");

        passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
        }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            const name = profile.displayName;

            let user = await userCollection.findOne({ email });

            if (!user) {
            await userCollection.insertOne({ email, name, provider: "google" });
            console.log("👤 New Google user created:", email);
            }

            done(null, { email, name });
        } catch (err) {
            done(err, null);
        }
        }));

        passport.serializeUser((user, done) => {
        done(null, user);
        });

        passport.deserializeUser((user, done) => {
        done(null, user);
        });


        // Product & Cart Endpoints
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


        app.post("/register", async (req, res) => {
            const { name, email, password } = req.body;
            try {
                const existing = await userCollection.findOne({ email });
                if (existing) return res.status(409).json({ error: "User already exists" });

                const hashedPassword = await bcrypt.hash(password, 10);
                await userCollection.insertOne({ name, email, password: hashedPassword });

                console.log("✅ User inserted:", { name, email }); 

                res.status(201).json({ message: "Registration successful" });
            } catch (err) {
                 console.error("❌ Registration error:", err); 
                res.status(500).json({ error: "Registration failed" });
            }
        });

        app.post("/login", async (req, res) => {
            const { email, password } = req.body;
            try {
                const user = await userCollection.findOne({ email });
                if (!user) return res.status(401).json({ error: "Invalid credentials" });

                const valid = await bcrypt.compare(password, user.password);
                if (!valid) return res.status(401).json({ error: "Invalid credentials" });
                console.log("✅ User logged in:", { name, email }); 
                res.status(200).json({ message: "Login successful", name: user.name });
            } catch (err) {
                res.status(500).json({ error: "Login failed" });
            }
        });

        app.get("/auth/google",
        passport.authenticate("google", { scope: ["profile", "email"] })
        );

        app.get("/api/auth/google/callback",
        passport.authenticate("google", {
            failureRedirect: "/login",
            successRedirect: "/homepage", 
        })
        );

        app.get("/dev/users", async (req, res) => {
        const users = await userCollection.find({}).toArray();
        res.json(users);
        });

        // Fallback to Next.js handler
        app.use((req, res) => {
            return handle(req, res);
        });

        // Start server
        app.listen(PORT, () => {
            console.log("Server running at http://localhost:", PORT);
        });

    } catch (error) {
        console.error("Server startup error:", error);
        process.exit(1);
    }
}

initializeServer();

//{"web":{"client_id":"789430688415-5shjlch5oqnk2kdr8mrf8vn8cerv08gq.apps.googleusercontent.com","project_id":"ecommerce-app-sso","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["http://localhost:3000/api/auth/google/callback"],"javascript_origins":["http://localhost:3000"]}}