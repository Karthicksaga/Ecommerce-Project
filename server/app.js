const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user')

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

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
//app.use('/admin', adminRoutes);


app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000, ()=>{
    console.log("Server Listening on Port number " + 3000);
  });
});
