/**
 * ClientRoutes.js
 * @description :: CRUD API routes for Client
 */

const express = require('express');
const router = express.Router();
const ClientController = require('../../../controller/client/v1/ClientController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/client/api/v1/client/create').post(ClientController.addClient);
router.route('/client/api/v1/client/addBulk').post(ClientController.bulkInsertClient);
router.route('/client/api/v1/client/update/:id').put(ClientController.updateClient);    
router.route('/client/api/v1/client/partial-update/:id').put(ClientController.partialUpdateClient);
router.route('/client/api/v1/client/updateBulk').put(ClientController.bulkUpdateClient);

module.exports = router;
