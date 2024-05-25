/**
 * ChatRoutes.js
 * @description :: CRUD API routes for Chat
 */

const express = require('express');
const router = express.Router();
const ChatController = require('../../../controller/client/v1/ChatController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/client/api/v1/chat/create').post(ChatController.addChat);
router.route('/client/api/v1/chat/addBulk').post(ChatController.bulkInsertChat);
router.route('/client/api/v1/chat/list').post(ChatController.findAllChat);
router.route('/client/api/v1/chat/count').post(ChatController.getChatCount);
router.route('/client/api/v1/chat/:id').get(ChatController.getChat);
router.route('/client/api/v1/chat/update/:id').put(ChatController.updateChat);    
router.route('/client/api/v1/chat/partial-update/:id').put(ChatController.partialUpdateChat);
router.route('/client/api/v1/chat/updateBulk').put(ChatController.bulkUpdateChat);

module.exports = router;
