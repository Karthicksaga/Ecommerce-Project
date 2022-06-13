//eccommerse database design reference : https://fabric.inc/blog/ecommerce-database-design-example/

const path = require('path');
const express = require('express');
require('./util/database');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/categoryRouter');
const productsRoutes = require('./routes/productRouter');
const cartRoutes = require('./routes/cartRouter');

const environmentConstant = require('./util/environment');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

//middle ware 
app.use(allowCrossDomain);

// app.use((req, res, next) => {
//   User.findById('5baa2528563f16379fc8a610')
//     .then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/api/users', userRoutes);

app.use('/api/category', categoryRoutes);

app.use('/product', productsRoutes);

app.use('/cart', cartRoutes)
//app.use('/admin', adminRoutes);


app.listen(environmentConstant.PORT, ()=>{
  console.log(`Server is running on port ${environmentConstant.PORT}`);
})

