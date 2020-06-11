const express = require('express');
const router = express.Router();

const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const productcontroller = require('../controllers/products');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, //5MB
  },
  fileFilter: fileFilter,
});

router.get('/', productcontroller.get_all_products);

router.post(
  '/',
  checkAuth,
  upload.single('productImage'),
  productcontroller.create_product
);

router.get('/:productId', checkAuth, productcontroller.get_product_info);

router.patch('/:productId', checkAuth, productcontroller.update_product);

router.delete('/:productId', checkAuth, productcontroller.remove_product);

module.exports = router;
