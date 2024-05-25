/**
 * ContentRoutes.js
 * @description :: CRUD API routes for Content
 */

const express = require('express');
const router = express.Router();
const ContentController = require('../../../controller/device/v1/ContentController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/device/api/v1/content/list').post(ContentController.findAllContent);
router.route('/device/api/v1/content/count').post(ContentController.getContentCount);
router.route('/device/api/v1/content/:id').get(ContentController.getContent);

module.exports = router;
