/**
 * PartnersRoutes.js
 * @description :: CRUD API routes for Partners
 */

const express = require('express');
const router = express.Router();
const PartnersController = require('../../../controller/device/v1/PartnersController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/device/api/v1/partners/list').post(PartnersController.findAllPartners);
router.route('/device/api/v1/partners/count').post(PartnersController.getPartnersCount);
router.route('/device/api/v1/partners/:id').get(PartnersController.getPartners);

module.exports = router;
