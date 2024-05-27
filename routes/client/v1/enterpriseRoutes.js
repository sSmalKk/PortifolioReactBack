/**
 * enterpriseRoutes.js
 * @description :: CRUD API routes for enterprise
 */

const express = require('express');
const router = express.Router();
const enterpriseController = require('../../../controller/client/v1/enterpriseController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/enterprise/create').post(auth(PLATFORM.CLIENT),checkRolePermission,enterpriseController.addEnterprise);
router.route('/client/api/v1/enterprise/list').post(auth(PLATFORM.CLIENT),checkRolePermission,enterpriseController.findAllEnterprise);
router.route('/client/api/v1/enterprise/count').post(auth(PLATFORM.CLIENT),checkRolePermission,enterpriseController.getEnterpriseCount);
router.route('/client/api/v1/enterprise/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,enterpriseController.getEnterprise);
router.route('/client/api/v1/enterprise/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,enterpriseController.updateEnterprise);    
router.route('/client/api/v1/enterprise/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,enterpriseController.partialUpdateEnterprise);
router.route('/client/api/v1/enterprise/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,enterpriseController.softDeleteEnterprise);
router.route('/client/api/v1/enterprise/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,enterpriseController.softDeleteManyEnterprise);
router.route('/client/api/v1/enterprise/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,enterpriseController.bulkInsertEnterprise);
router.route('/client/api/v1/enterprise/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,enterpriseController.bulkUpdateEnterprise);
router.route('/client/api/v1/enterprise/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,enterpriseController.deleteEnterprise);
router.route('/client/api/v1/enterprise/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,enterpriseController.deleteManyEnterprise);

module.exports = router;
