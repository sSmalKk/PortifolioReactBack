/**
 * ContactFormRoutes.js
 * @description :: CRUD API routes for ContactForm
 */

const express = require('express');
const router = express.Router();
const ContactFormController = require('../../controller/admin/ContactFormController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/contactform/create').post(auth(PLATFORM.ADMIN),checkRolePermission,ContactFormController.addContactForm);
router.route('/admin/contactform/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,ContactFormController.bulkInsertContactForm);
router.route('/admin/contactform/list').post(auth(PLATFORM.ADMIN),checkRolePermission,ContactFormController.findAllContactForm);
router.route('/admin/contactform/count').post(auth(PLATFORM.ADMIN),checkRolePermission,ContactFormController.getContactFormCount);
router.route('/admin/contactform/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,ContactFormController.getContactForm);
router.route('/admin/contactform/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ContactFormController.updateContactForm);    
router.route('/admin/contactform/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ContactFormController.partialUpdateContactForm);
router.route('/admin/contactform/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,ContactFormController.bulkUpdateContactForm);
router.route('/admin/contactform/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ContactFormController.softDeleteContactForm);
router.route('/admin/contactform/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,ContactFormController.softDeleteManyContactForm);
router.route('/admin/contactform/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,ContactFormController.deleteContactForm);
router.route('/admin/contactform/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,ContactFormController.deleteManyContactForm);

module.exports = router;
