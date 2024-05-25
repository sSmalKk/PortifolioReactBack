/**
 * ClientRoutes.js
 * @description :: CRUD API routes for Client
 */

const express = require('express');
const router = express.Router();
const ClientController = require('../../controller/admin/ClientController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/client/create').post(auth(PLATFORM.ADMIN),checkRolePermission,ClientController.addClient);
router.route('/admin/client/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,ClientController.bulkInsertClient);
router.route('/admin/client/list').post(auth(PLATFORM.ADMIN),checkRolePermission,ClientController.findAllClient);
router.route('/admin/client/count').post(auth(PLATFORM.ADMIN),checkRolePermission,ClientController.getClientCount);
router.route('/admin/client/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,ClientController.getClient);
router.route('/admin/client/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ClientController.updateClient);    
router.route('/admin/client/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ClientController.partialUpdateClient);
router.route('/admin/client/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,ClientController.bulkUpdateClient);
router.route('/admin/client/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ClientController.softDeleteClient);
router.route('/admin/client/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,ClientController.softDeleteManyClient);
router.route('/admin/client/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,ClientController.deleteClient);
router.route('/admin/client/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,ClientController.deleteManyClient);

module.exports = router;
