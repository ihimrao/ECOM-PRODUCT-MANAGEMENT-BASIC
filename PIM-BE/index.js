const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('./DB/dbConnect');
const Product = require('./model/product.model');
const UserModel = require('./model/userModel');
const productRoutes = require('./route/productRout')
require('dotenv').config()
const secretKey = 'here-secret';
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, async (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const userF = await UserModel.findOne({ email:user });
    console.log(userF)
    if (!userF) {
      return res.sendStatus(403);
    
    }
    req.user = user;
    next();
  });
};


app.use('/products', productRoutes);

app.get('/get-products', authenticateToken, async (req, res) => {
    const data = await Product.find();
    res.json({ data });
  });
 app.get('/get-product/:productId', authenticateToken, async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await Product.findById(productId);
  if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ data: product });
    } catch (error) {
      console.error('Error getting product:', error);
      res.status(500).json({ message: 'Error getting product' });
    }
  });
  app.post('/create-product',authenticateToken, async (req, res) => {
    try {
      const productData = req.body;
      const newProduct = new Product(productData);
      await newProduct.save();
  
      res.status(201).json({ data: newProduct });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Error creating product' });
    }
  });
  app.put('/edit-product/:productId',authenticateToken, async (req, res) => {
    try {
      const productId = req.params.productId;
      const updatedProductData = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });
      console.log(productId, updatedProduct)
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json({ data: updatedProduct });
    } catch (error) {
      console.error('Error editing product:', error);
      res.status(500).json({ message: 'Error editing product' });
    }
  });
  app.delete('/delete-product/:productId', authenticateToken, async (req, res) => {
    try {
      const productId = req.params.productId;
      const deletedProduct = await Product.findByIdAndDelete(productId);
  if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Error deleting product' });
    }
  });

  
app.post('/loginUser', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await UserModel.findOne({ email });
  if(!user) {
    res.sendStatus(403); 
  }
  if (user.email === email && user.password === password) {
    const user = { email: email };
    const token = jwt.sign(user.email, secretKey);
    res.json({ token: token });
  }else{
    res.sendStatus(403); 
  }
});

app.post('/registerUser', async (req, res) => {
  const userData = req.body;
  const User = new UserModel(userData);
  await User.save();
  res.status(201).json({ data: User });
});


app.listen(7000, () => {
  console.log('Server is running on port 7000');
});
