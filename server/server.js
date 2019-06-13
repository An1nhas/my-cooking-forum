const express = require('express');
const cors = require('cors');
let session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


app.use(cors({
    origin: ["https://cooking-forum.herokuapp.com","http://localhost:3000"],
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
    credentials:true
  }))


app.use(session({
    secret: 'super secret key',
    resave: false,
    saveUninitialized: false
}));

require('./config/mongoose.js');
require('./config/routes.js')(app);



app.listen(process.env.PORT || 9000, () => {
    console.log("server listening");
});
