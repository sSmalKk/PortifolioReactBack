/**
 * PortifolioRoutes.js
 * @description :: CRUD API routes for Portifolio
 */

const express = require('express');
const router = express.Router();
const PortifolioController = require('../../controller/admin/PortifolioController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/portifolio/create').post(auth(PLATFORM.ADMIN),checkRolePermission,PortifolioController.addPortifolio);
router.route('/admin/portifolio/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,PortifolioController.bulkInsertPortifolio);
router.route('/admin/portifolio/list').post(auth(PLATFORM.ADMIN),checkRolePermission,PortifolioController.findAllPortifolio);
router.route('/admin/portifolio/count').post(auth(PLATFORM.ADMIN),checkRolePermission,PortifolioController.getPortifolioCount);
router.route('/admin/portifolio/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,PortifolioController.getPortifolio);
router.route('/admin/portifolio/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PortifolioController.updatePortifolio);    
router.route('/admin/portifolio/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PortifolioController.partialUpdatePortifolio);
router.route('/admin/portifolio/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,PortifolioController.bulkUpdatePortifolio);
router.route('/admin/portifolio/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PortifolioController.softDeletePortifolio);
router.route('/admin/portifolio/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,PortifolioController.softDeleteManyPortifolio);
router.route('/admin/portifolio/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,PortifolioController.deletePortifolio);
router.route('/admin/portifolio/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,PortifolioController.deleteManyPortifolio);

module.exports = router;
