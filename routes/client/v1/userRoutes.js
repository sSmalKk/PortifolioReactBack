/**
 * userRoutes.js
 * @description :: CRUD API routes for user
 */

const express = require('express');
const router = express.Router();
const userController = require('../../../controller/client/v1/userController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/client/api/v1/user/me').get(auth(PLATFORM.CLIENT),userController.getLoggedInUserInfo);
router.route('/client/api/v1/user/create').post(userController.addUser);
router.route('/client/api/v1/user/addBulk').post(userController.bulkInsertUser);
router.route('/client/api/v1/user/list').post(userController.findAllUser);
router.route('/client/api/v1/user/count').post(userController.getUserCount);
router.route('/client/api/v1/user/:id').get(userController.getUser);
router.route('/client/api/v1/user/update/:id').put(userController.updateUser);    
router.route('/client/api/v1/user/partial-update/:id').put(userController.partialUpdateUser);
router.route('/client/api/v1/user/updateBulk').put(userController.bulkUpdateUser);
router.route('/client/api/v1/user/change-password').put(auth(PLATFORM.CLIENT),userController.changePassword);
router.route('/client/api/v1/user/update-profile').put(auth(PLATFORM.CLIENT),userController.updateProfile);

module.exports = router;
