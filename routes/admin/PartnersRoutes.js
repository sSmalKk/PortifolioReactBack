/**
 * PartnersRoutes.js
 * @description :: CRUD API routes for Partners
 */

const express = require('express');
const router = express.Router();
const PartnersController = require('../../controller/admin/PartnersController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/partners/create').post(auth(PLATFORM.ADMIN),checkRolePermission,PartnersController.addPartners);
router.route('/admin/partners/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,PartnersController.bulkInsertPartners);
router.route('/admin/partners/list').post(auth(PLATFORM.ADMIN),checkRolePermission,PartnersController.findAllPartners);
router.route('/admin/partners/count').post(auth(PLATFORM.ADMIN),checkRolePermission,PartnersController.getPartnersCount);
router.route('/admin/partners/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,PartnersController.getPartners);
router.route('/admin/partners/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PartnersController.updatePartners);    
router.route('/admin/partners/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PartnersController.partialUpdatePartners);
router.route('/admin/partners/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,PartnersController.bulkUpdatePartners);
router.route('/admin/partners/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PartnersController.softDeletePartners);
router.route('/admin/partners/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,PartnersController.softDeleteManyPartners);
router.route('/admin/partners/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,PartnersController.deletePartners);
router.route('/admin/partners/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,PartnersController.deleteManyPartners);

module.exports = router;
