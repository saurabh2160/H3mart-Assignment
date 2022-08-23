const express = require('express')
const route = require('./route/route')
require("dotenv").config()
const multer = require('multer')
const app = express();

app.use(express.json());
app.use(multer().any())


app.use('/', route);

app.listen(process.env.PORT || 3000, () => {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
})