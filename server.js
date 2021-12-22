dotenv = require("dotenv").config(); //load all the EV from the .env
const subscribersRouter = require('./routes/subscribers.js');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json()); //JSON parse middleware
app.use('/api/subscribers', subscribersRouter); //subscribers middleware


mongoose.connect(process.env.MONGOLINK)
    .then(() => console.log("successfully connected to Mongoose"))
    .catch(err => console.error(err.message));

app.get('/', (req, res) => {

});

app.listen(process.env.PORT, () => console.log(`Listenning on port ${process.env.PORT}`));