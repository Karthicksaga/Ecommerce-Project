const mongoose = require('mongoose')

const db = 'e-commerce';
const connectionURL = `mongodb+srv://karthicktj:NbaU9DJ6E0mtBlBL@cluster0.gdjet.mongodb.net/${db}?retryWrites=true&w=majority`

mongoose.connect(connectionURL, 
    {
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    }
    ).then(console.log(`Connected to ${db} db Successfully..`))
    .catch(error => console.log(error));