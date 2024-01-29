const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const port = 3000;

const etsyApiKey = process.env.API_KEY;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('/', async (req, res) => {
  try {
    // Fetch listings from Etsy API
    const response = await axios.get(`https://openapi.etsy.com/v3/application/listings/active`,
      {
          'headers': {
              'x-api-key': etsyApiKey
          }
      }
    )
    //console.log(response.data.results)
    // Extract relevant details from the API response
    const listings = response.data.results.map(listing => {
      return {
        id: listing.listing_id,
        title: listing.title,
        price: listing.price,
        currency: listing.currency_code,
        url: listing.url,
      };
    });

     res.render('index', { listings });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
