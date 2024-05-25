/**
 * PortifolioRoutes.js
 * @description :: CRUD API routes for Portifolio
 */

const express = require('express');
const router = express.Router();
const PortifolioController = require('../../../controller/device/v1/PortifolioController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/device/api/v1/portifolio/list').post(PortifolioController.findAllPortifolio);
router.route('/device/api/v1/portifolio/count').post(PortifolioController.getPortifolioCount);
router.route('/device/api/v1/portifolio/:id').get(PortifolioController.getPortifolio);

module.exports = router;
