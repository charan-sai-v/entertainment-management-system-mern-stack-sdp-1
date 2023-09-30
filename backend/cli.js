#!/usr/bin/env node

const yargs = require('yargs')
const mongoose = require('mongoose')
const options = yargs
    .usage("Usage: -e <email> -p <password>")
    .options("e", { alias: "email", describe: "Your email", type: "string", demandOption: true })
    .options("p", { alias: "password", describe: "Your password", type: "string", demandOption: true })
    .argv


mongoose.connect('mongodb://localhost:27017/ems', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to the Database successfully");
        mongoose.connection.db.collection('admins', function (err, collection) {
            collection.insertOne({ email: options.email, password: options.password }, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
            });
        }
        );

    }
    ).catch(err => {
        console.log("Error connecting to the database");
    });





