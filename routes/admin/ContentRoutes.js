/**
 * ContentRoutes.js
 * @description :: CRUD API routes for Content
 */

const express = require('express');
const router = express.Router();
const ContentController = require('../../controller/admin/ContentController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/content/create').post(auth(PLATFORM.ADMIN),checkRolePermission,ContentController.addContent);
router.route('/admin/content/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,ContentController.bulkInsertContent);
router.route('/admin/content/list').post(auth(PLATFORM.ADMIN),checkRolePermission,ContentController.findAllContent);
router.route('/admin/content/count').post(auth(PLATFORM.ADMIN),checkRolePermission,ContentController.getContentCount);
router.route('/admin/content/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,ContentController.getContent);
router.route('/admin/content/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ContentController.updateContent);    
router.route('/admin/content/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ContentController.partialUpdateContent);
router.route('/admin/content/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,ContentController.bulkUpdateContent);
router.route('/admin/content/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ContentController.softDeleteContent);
router.route('/admin/content/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,ContentController.softDeleteManyContent);
router.route('/admin/content/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,ContentController.deleteContent);
router.route('/admin/content/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,ContentController.deleteManyContent);

module.exports = router;
