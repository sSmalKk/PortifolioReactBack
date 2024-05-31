/**
 * departmentsRoutes.js
 * @description :: CRUD API routes for departments
 */

const express = require('express');
const router = express.Router();
const departmentsController = require('../../../controller/client/v1/departmentsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/departments/create').post(auth(PLATFORM.CLIENT),checkRolePermission,departmentsController.addDepartments);
router.route('/client/api/v1/departments/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,departmentsController.bulkInsertDepartments);
router.route('/client/api/v1/departments/list').post(auth(PLATFORM.CLIENT),checkRolePermission,departmentsController.findAllDepartments);
router.route('/client/api/v1/departments/count').post(auth(PLATFORM.CLIENT),checkRolePermission,departmentsController.getDepartmentsCount);
router.route('/client/api/v1/departments/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,departmentsController.getDepartments);
router.route('/client/api/v1/departments/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,departmentsController.updateDepartments);    
router.route('/client/api/v1/departments/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,departmentsController.partialUpdateDepartments);
router.route('/client/api/v1/departments/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,departmentsController.bulkUpdateDepartments);
router.route('/client/api/v1/departments/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,departmentsController.softDeleteDepartments);
router.route('/client/api/v1/departments/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,departmentsController.softDeleteManyDepartments);
router.route('/client/api/v1/departments/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,departmentsController.deleteDepartments);
router.route('/client/api/v1/departments/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,departmentsController.deleteManyDepartments);

module.exports = router;
