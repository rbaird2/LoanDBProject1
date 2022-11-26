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
