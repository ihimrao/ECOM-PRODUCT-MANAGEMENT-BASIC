const express = require('express');
const router = express.Router();
const Product = require('../model/product.model');
const authenticateToken = require('../middleware/auth');

router.get('/add-data', async (req, res) => {
  try {
    const dummyData = [
        {
            "name": "Airbag Product 1",
            "description": "Description for Airbag Product 1",
            "price": 19.99,
            "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "category": "Airbag"
        },
        {
            "name": "Plastic Bag Product 1",
            "description": "Description for Plastic Bag Product 1",
            "price": 24.99,
            "image": "https://images.pexels.com/photos/1234535/pexels-photo-1234535.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "category": "Plastic Bag"
        },
        {
            "name": "Airbag Product 2",
            "description": "Description for Airbag Product 2",
            "price": 14.99,
            "image": "https://images.pexels.com/photos/952688/pexels-photo-952688.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "category": "Airbag"
        },
        {
            "name": "Plastic Bag Product 2",
            "description": "Description for Plastic Bag Product 2",
            "price": 29.99,
            "image": "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600",
            "category": "Plastic Bag"
        },
        {
            "name": "Airbag Product 3",
            "description": "Description for Airbag Product 3",
            "price": 39.99,
            "image": "https://images.pexels.com/photos/931321/pexels-photo-931321.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "category": "Airbag"
        },
        {
            "name": "Plastic Bag Product 3",
            "description": "Description for Plastic Bag Product 3",
            "price": 49.99,
            "image": "https://images.pexels.com/photos/1239422/pexels-photo-1239422.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "category": "Plastic Bag"
        },
        {
            "name": "Airbag Product 4",
            "description": "Description for Airbag Product 4",
            "price": 22.99,
            "image": "https://images.pexels.com/photos/1115806/pexels-photo-1115806.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "category": "Airbag"
        },
        {
            "name": "Plastic Bag Product 4",
            "description": "Description for Plastic Bag Product 4",
            "price": 32.99,
            "image": "https://images.pexels.com/photos/1082324/pexels-photo-1082324.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "category": "Plastic Bag"
        },
        {
            "name": "Airbag Product 5",
            "description": "Description for Airbag Product 5",
            "price": 18.99,
            "image": "https://images.pexels.com/photos/868097/pexels-photo-868097.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "category": "Airbag"
        },
        {
            "name": "Plastic Bag Product 5",
            "description": "Description for Plastic Bag Product 5",
            "price": 27.99,
            "image": "https://images.pexels.com/photos/1370703/pexels-photo-1370703.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "category": "Plastic Bag"
        },
        {
            "name": "Airbag Product 6",
            "description": "Description for Airbag Product 6",
            "price": 23.99,
            "image": "https://images.pexels.com/photos/1308747/pexels-photo-1308747.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "category": "Airbag"
        },
        {
            "name": "Plastic Bag Product 6",
            "description": "Description for Plastic Bag Product 6",
            "price": 17.99,
            "image": "https://images.pexels.com/photos/709749/pexels-photo-709749.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "category": "Plastic Bag"
        }
    ];


    const insertedProducts = await Product.insertMany(dummyData);

    res.json({ message: 'Dummy data added successfully', data: insertedProducts });
  } catch (error) {
    console.error('Error seeding dummy data:', error);
    res.status(500).json({ message: 'Error seeding dummy data' });
  }
});



module.exports = router;
