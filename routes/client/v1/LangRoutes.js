/**
 * LangRoutes.js
 * @description :: CRUD API routes for Lang
 */

const express = require('express');
const router = express.Router();
const LangController = require('../../../controller/client/v1/LangController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/client/api/v1/lang/list').post(LangController.findAllLang);
router.route('/client/api/v1/lang/count').post(LangController.getLangCount);
router.route('/client/api/v1/lang/:id').get(LangController.getLang);

module.exports = router;
