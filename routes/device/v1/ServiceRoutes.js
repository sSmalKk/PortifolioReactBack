/**
 * ServiceRoutes.js
 * @description :: CRUD API routes for Service
 */

const express = require('express');
const router = express.Router();
const ServiceController = require('../../../controller/device/v1/ServiceController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/device/api/v1/service/create').post(ServiceController.addService);
router.route('/device/api/v1/service/addBulk').post(ServiceController.bulkInsertService);
router.route('/device/api/v1/service/list').post(ServiceController.findAllService);
router.route('/device/api/v1/service/count').post(ServiceController.getServiceCount);
router.route('/device/api/v1/service/:id').get(ServiceController.getService);
router.route('/device/api/v1/service/update/:id').put(ServiceController.updateService);    
router.route('/device/api/v1/service/partial-update/:id').put(ServiceController.partialUpdateService);
router.route('/device/api/v1/service/updateBulk').put(ServiceController.bulkUpdateService);

module.exports = router;
