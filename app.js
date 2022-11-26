// name: Raymond Baird
// id: 1215758778
// date created: 10/16/2022
// description: project to utilize api and access MongoDB

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const pug = require('pug');
const bodyParser = require('body-parser')

const mongoose = require("mongoose");
const fs = require("fs");

const loanController = require('./routes/loanRoutes');
const customerController = require('./routes/customerRoutes');
const ledgerController = require('./routes/ledgerRoutes');
const viewController = require('./routes/viewRoutes');
const userController = require('./routes/userRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



// Body parser, reading data from body into req.body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES

app.use('/', viewController, userController);
app.use('/loans', userController, loanController);
app.use('/customers', userController, customerController);
app.use('/ledgers', userController, ledgerController);
app.use('/users', userController);


const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', async function (){
    const collection = connection.db.collection("users");
    collection.find({}).toArray(function (err, data){
        result = JSON.stringify(data);
        fs.writeFileSync('dev-data/data/users.json', result)
    
    });
});

connection.once('open', async function (){
  const collection = connection.db.collection("loans");
  collection.find({}).toArray(function (err, data){
      result = JSON.stringify(data);
      fs.writeFileSync('dev-data/data/loans.json', result)
  
  });
});

connection.once('open', async function (){
  const collection = connection.db.collection("customers");
  collection.find({}).toArray(function (err, data){
      result = JSON.stringify(data);
      fs.writeFileSync('dev-data/data/customers.json', result)
  
  });
});



module.exports = app;
