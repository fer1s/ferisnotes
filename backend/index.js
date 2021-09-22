require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')   

const databaseController = require('./database');
const PORT = process.env.PORT || 80;

const apiRoute = require('./routes/api.js');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.options('*', cors())

app.use('/', express.static('./public'));
app.use('/api', apiRoute);

app.listen(PORT, () => {
    databaseController.connect(process.env.MongoURL);
    console.log(`Backend started at port ${PORT}`)
})