/**
 * PortifolioRoutes.js
 * @description :: CRUD API routes for Portifolio
 */

const express = require('express');
const router = express.Router();
const PortifolioController = require('../../../controller/client/v1/PortifolioController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/client/api/v1/portifolio/list').post(PortifolioController.findAllPortifolio);
router.route('/client/api/v1/portifolio/count').post(PortifolioController.getPortifolioCount);
router.route('/client/api/v1/portifolio/:id').get(PortifolioController.getPortifolio);

module.exports = router;
