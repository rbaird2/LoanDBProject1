const express = require('express');
const viewController = require('../controllers/viewController');
const userHandler = require('../controllers/userController');
// const loginController = require('../public/js/login')


const router = express.Router();

router.get('/', viewController.getLandingPAge);
router.get('/login', viewController.getLoginForm);
router.get('/signup', viewController.getSignInForm);
router.get('/loginUser', viewController.getLoginUser);
router.get('/loans', viewController.getLoanList);
router.get('/customers', viewController.getCustomerList);
router.post('/login', userHandler.sign_in)
router.get('/users', viewController.getUserList);




module.exports = router;
