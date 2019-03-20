const express = require('express');
const cors = require('cors');
let session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials:true
  }))


app.use(session({
    secret: 'super secret key',
    resave: false,
    saveUninitialized: false
}));

require('./config/mongoose.js');
require('./config/routes.js')(app);



app.listen(9000, ( ) => console.log('Sever running on port 9000'));