// name: Raymond Baird
// id: 1215758778
// date created: 10/16/2022
// description: project to utilize api and access MongoDB

'use strict';

const express = require('express');
const customerController = require('../controllers/customerController');
const authController = require('../controllers/userController');

const router = express.Router();

router
  .route('/customer/list')
  .get(authController.loginRequired, customerController.getAllCustomers)
  .post(authController.loginRequired, customerController.createCustomer);

router
  .route('/customer:id')
  .get(authController.loginRequired, customerController.getCustomer)
  .patch(authController.loginRequired, customerController.updateCustomer)
  .delete(authController.loginRequired, customerController.deleteCustomer);

  

module.exports = router;
