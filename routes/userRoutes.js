// name: Raymond Baird
// id: 1215758778
// date created: 10/16/2022
// description: project to utilize api and access MongoDB

'use strict';

const express = require('express');
const userController = require('../controllers/userController');


const router = express.Router();

router
    .route('/signup')
    .post(userController.register);

router
    .route('/login')
    .post(userController.sign_in);

router
    .route('/users')
    .get(userController.getUserList)
    
module.exports = router;
