/**
 * ServiceRoutes.js
 * @description :: CRUD API routes for Service
 */

const express = require('express');
const router = express.Router();
const ServiceController = require('../../controller/admin/ServiceController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/service/create').post(auth(PLATFORM.ADMIN),checkRolePermission,ServiceController.addService);
router.route('/admin/service/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,ServiceController.bulkInsertService);
router.route('/admin/service/list').post(auth(PLATFORM.ADMIN),checkRolePermission,ServiceController.findAllService);
router.route('/admin/service/count').post(auth(PLATFORM.ADMIN),checkRolePermission,ServiceController.getServiceCount);
router.route('/admin/service/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,ServiceController.getService);
router.route('/admin/service/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ServiceController.updateService);    
router.route('/admin/service/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ServiceController.partialUpdateService);
router.route('/admin/service/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,ServiceController.bulkUpdateService);
router.route('/admin/service/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ServiceController.softDeleteService);
router.route('/admin/service/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,ServiceController.softDeleteManyService);
router.route('/admin/service/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,ServiceController.deleteService);
router.route('/admin/service/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,ServiceController.deleteManyService);

module.exports = router;
