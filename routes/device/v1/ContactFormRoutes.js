/**
 * ContactFormRoutes.js
 * @description :: CRUD API routes for ContactForm
 */

const express = require('express');
const router = express.Router();
const ContactFormController = require('../../../controller/device/v1/ContactFormController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/device/api/v1/contactform/create').post(ContactFormController.addContactForm);
router.route('/device/api/v1/contactform/addBulk').post(ContactFormController.bulkInsertContactForm);
router.route('/device/api/v1/contactform/update/:id').put(ContactFormController.updateContactForm);    
router.route('/device/api/v1/contactform/partial-update/:id').put(ContactFormController.partialUpdateContactForm);
router.route('/device/api/v1/contactform/updateBulk').put(ContactFormController.bulkUpdateContactForm);

module.exports = router;
