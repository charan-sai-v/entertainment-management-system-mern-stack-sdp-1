const express = require('express')
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()


// app.use(bodyParser.json())
app.use(express.json())
// public folder
app.use('/uploads', express.static('uploads'))
app.use(cors())


// routes
const adminRoutes = require('./routes/adminRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const organizerRoutes = require('./routes/organizerRoutes')
const userRoutes = require('./routes/userRoutes')

app.use('/admin', adminRoutes)
app.use('/employee', employeeRoutes)
app.use('/organizer', organizerRoutes)
app.use('/user', userRoutes)

// dotenv
require('dotenv').config()

// environment variables
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
    console.log("Server is running on port " + port)
})


// print date and time in india time zone
const date = new Date()
const options = {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
};
const formatter = new Intl.DateTimeFormat([], options);
console.log(formatter.format(date));

