// name: Raymond Baird
// id: 1215758778
// date created: 10/16/2022
// description: project to utilize api and access MongoDB

const express = require('express');
const ledgerController = require('../controllers/ledgerController');
const userHandler = require('../controllers/userController');
const router = express.Router();

router
  .route('/ledger')
  .get(userHandler.loginRequired, ledgerController.getAllLedgers)
  .post(userHandler.loginRequired, ledgerController.createLedger);

router
  .route('/ledger:id')
  .get(userHandler.loginRequired, ledgerController.getLedger)
  .patch(userHandler.loginRequired, ledgerController.updateLedger)
  .delete(userHandler.loginRequired, ledgerController.deleteLedger);

module.exports = router;
