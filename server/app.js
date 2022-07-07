//eccommerse database design reference : https://fabric.inc/blog/ecommerce-database-design-example/

const path = require('path');
const express = require('express');
require('./util/database');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//cors is nothing but the cross origin Resource sharing
const cors = require('cors');
const app = express();
//https://stackoverflow.com/questions/5284340/what-is-node-js-connect-express-and-middleware?rq=1

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');


const categoryRoutes = require('./routes/categoryRouter');
const productsRoutes = require('./routes/productRouter');
const cartRoutes = require('./routes/cartRouter');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRouter');

const environmentConstant = require('./util/environment');
const { constants } = require('perf_hooks');

app.use(bodyParser.json());
//https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/
// app.use(cors({
//   origin : '*'
// }))
app.use(cors());
console.log("hi")
app.use(express.static(path.join(__dirname, 'public')));

allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

//middle ware 

// this will enable t access the request from every where from the origin.
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

app.use('/cart', cartRoutes);

app.use('/order', orderRoutes);
//app.use('/admin', adminRoutes);


app.listen(environmentConstant.PORT, ()=>{
  console.log(`Server is running on port ${environmentConstant.PORT}`);
})

