const express = require('express');
const { getAllProducts, createProduct, getProductDetails, createProductReview, getProductReview, deleteProductReview } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();
router.route('/products').get(getAllProducts);
router.route('/admin/products/new').post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router.route('/products/:id').get(getProductDetails);
router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(getProductReview);


module.exports = router;