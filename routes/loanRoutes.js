'use strict';

const express = require('express');
const userHandler = require('../controllers/userController');
const loanController = require('../controllers/loanController');

const router = express.Router();

    router
    .route('/loans')
    .get(userHandler.loginRequired, loanController.getAllLoans)
    .post(userHandler.loginRequired, loanController.createLoan);
  
router
    .route('/loan:id')
    .get(userHandler.loginRequired, loanController.getLoan)
    .patch(userHandler.loginRequired, loanController.updateLoan)
    .delete(userHandler.loginRequired, loanController.deleteLoan);

module.exports = router;