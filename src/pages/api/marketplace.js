const axios = require('axios');
const FB = require('fb');

export default function handler(
    req, res
) {

    // Create a new post in Facebook Marketplace
    axios.post('/facebook/marketplace', async (req, res) => {

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

}