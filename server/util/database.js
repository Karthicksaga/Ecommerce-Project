const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://karthicktj:NbaU9DJ6E0mtBlBL@cluster0.gdjet.mongodb.net/?retryWrites=true&w=majority'
  )
    .then(client => {
      
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw error;
    });
};

const getDb = () => {
  if (_db) {
    console.log(_db);
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
