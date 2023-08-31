const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

// routes
const adminRoutes = require('./routes/adminRoutes')

app.use('/admin', adminRoutes)


require('dotenv').config()

const port = process.env.PORT
const dbUrl = process.env.DB_URL





app.get('/', (req, res)=>{
    res.send("Hello World!")
})


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/ems', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the MongoDB database');
});


app.listen(port, ()=>{
    console.log("Server is running on port 8080")
})

