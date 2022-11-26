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
