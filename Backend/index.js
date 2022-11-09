require("dotenv").config()
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const users = require("./models/userSchema")
const cors = require('cors')
const port = process.env.PORT || 8003;
const path = require('path')
require("./db/conn");
const router = require("./routes/router");

app.use(cors());
app.use(express.json());
app.use(router);
app.listen(port,()=>{
    console.log(`server running at port number ${port}`)
})
