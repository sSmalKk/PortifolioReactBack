/**
 * Chat_messageRoutes.js
 * @description :: CRUD API routes for Chat_message
 */

const express = require('express');
const router = express.Router();
const Chat_messageController = require('../../../controller/device/v1/Chat_messageController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/device/api/v1/chat_message/create').post(Chat_messageController.addChat_message);
router.route('/device/api/v1/chat_message/addBulk').post(Chat_messageController.bulkInsertChat_message);
router.route('/device/api/v1/chat_message/list').post(Chat_messageController.findAllChat_message);
router.route('/device/api/v1/chat_message/count').post(Chat_messageController.getChat_messageCount);
router.route('/device/api/v1/chat_message/:id').get(Chat_messageController.getChat_message);
router.route('/device/api/v1/chat_message/update/:id').put(Chat_messageController.updateChat_message);    
router.route('/device/api/v1/chat_message/partial-update/:id').put(Chat_messageController.partialUpdateChat_message);
router.route('/device/api/v1/chat_message/updateBulk').put(Chat_messageController.bulkUpdateChat_message);

module.exports = router;
