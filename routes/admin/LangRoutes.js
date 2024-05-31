/**
 * LangRoutes.js
 * @description :: CRUD API routes for Lang
 */

const express = require('express');
const router = express.Router();
const LangController = require('../../controller/admin/LangController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/lang/create').post(auth(PLATFORM.ADMIN),checkRolePermission,LangController.addLang);
router.route('/admin/lang/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,LangController.bulkInsertLang);
router.route('/admin/lang/list').post(auth(PLATFORM.ADMIN),checkRolePermission,LangController.findAllLang);
router.route('/admin/lang/count').post(auth(PLATFORM.ADMIN),checkRolePermission,LangController.getLangCount);
router.route('/admin/lang/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,LangController.getLang);
router.route('/admin/lang/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,LangController.updateLang);    
router.route('/admin/lang/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,LangController.partialUpdateLang);
router.route('/admin/lang/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,LangController.bulkUpdateLang);
router.route('/admin/lang/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,LangController.softDeleteLang);
router.route('/admin/lang/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,LangController.softDeleteManyLang);
router.route('/admin/lang/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,LangController.deleteLang);
router.route('/admin/lang/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,LangController.deleteManyLang);

module.exports = router;
