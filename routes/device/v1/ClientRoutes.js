/**
 * ClientRoutes.js
 * @description :: CRUD API routes for Client
 */

const express = require('express');
const router = express.Router();
const ClientController = require('../../../controller/device/v1/ClientController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/client/create').post(ClientController.addClient);
router.route('/device/api/v1/client/addBulk').post(ClientController.bulkInsertClient);
router.route('/device/api/v1/client/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ClientController.updateClient);    
router.route('/device/api/v1/client/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ClientController.partialUpdateClient);
router.route('/device/api/v1/client/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,ClientController.bulkUpdateClient);

module.exports = router;
