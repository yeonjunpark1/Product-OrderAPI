const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const orderController = require('../controllers/orders');

router.get('/', checkAuth, orderController.orders_get_all);

router.post('/', checkAuth, orderController.create_order);

router.get('/:orderId', orderController.order_get_info);

router.patch('/:orderId', checkAuth, (req, res, next) => {
  res.status(200).json({
    message: 'Updated Product!',
  });
});

router.delete('/:orderId', checkAuth, orderController.removeOrder);

module.exports = router;
