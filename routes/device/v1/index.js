/**
 * index.js
 * @description :: index route file of device platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/device/auth',require('./auth'));
router.use(require('./ClientRoutes'));
router.use(require('./ContentRoutes'));
router.use(require('./PartnersRoutes'));
router.use(require('./ContactFormRoutes'));
router.use(require('./ServiceRoutes'));
router.use(require('./ChatRoutes'));
router.use(require('./Chat_messageRoutes'));
router.use(require('./PortifolioRoutes'));
router.use(require('./userRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
