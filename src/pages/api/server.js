require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const FB = require('fb');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Initialize Express app
const app = express();

// Enable CORS
app.use(cors());

// Enable JSON parsing
app.use(express.json());

// Create a new post in Facebook Marketplace
app.post('/facebook/marketplace', async (req, res) => {
    try {
        // Build the Facebook Marketplace item object
        const item = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            images: [
                {
                    url: req.body.image,
                },
            ],
            location: {
                city: req.body.city,
                state: req.body.state,
                country: 'US',
            },
            category_id: 214,
            currency: 'USD',
            condition: 'new',
            availability: 'in_stock',
            shipping_weight_unit: 'pound',
            shipping_weight_value: 1,
            is_local_pickup: false,
        };

        // Authorize with Facebook using your App ID and Secret
        FB.options({
            appId: process.env.FACEBOOK_APP_ID,
            appSecret: process.env.FACEBOOK_APP_SECRET,
        });
        const { access_token } = await FB.napi('oauth/access_token', {
            client_id: process.env.FACEBOOK_APP_ID,
            client_secret: process.env.FACEBOOK_APP_SECRET,
            grant_type: 'client_credentials',
        });

        // Publish the item to Facebook Marketplace
        const response = await axios.post(
            `https://graph.facebook.com/v11.0/me/marketplace_items?access_token=${access_token}`,
            item
        );

        // Return the Facebook Marketplace ID of the created item
        res.json({
            id: response.data.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create item');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});