const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/db');
const cors = require('cors');
const jwt = require('./helpers/jwt');
const app = express();

const parrots = require('./routes/parrots');
const users = require('./routes/users');
const admin = require('./routes/admin');

const PORT = process.env.PORT || 8000;

// use JWT auth to secure the api
app.use(jwt());

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static('public'));


// routes

app.use('/api/v1/parrots', parrots);
app.use('/api/v1/users', users)
app.use('/api/v1/users/:id', users);
app.use('/admin', admin);

// ready to server

app.listen(PORT, () => {
  console.log('Server is ready');
  // connect to Mongo DB
  mongoose.connect(
    config.url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
      console.log('MongoDB is connected')
    }
  );
})


