/**
 * index.js
 * @description :: index route file of admin platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/admin/auth',require('./auth'));
router.use(require('./enterpriseRoutes'));
router.use(require('./departmentsRoutes'));
router.use(require('./BlogRoutes'));
router.use(require('./ClientRoutes'));
router.use(require('./ContentRoutes'));
router.use(require('./ContactFormRoutes'));
router.use(require('./ServiceRoutes'));
router.use(require('./ChatRoutes'));
router.use(require('./Chat_messageRoutes'));
router.use(require('./PortifolioRoutes'));
router.use(require('./userRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./projectRouteRoutes'));
router.use(require('./routeRoleRoutes'));
router.use(require('./userRoleRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
