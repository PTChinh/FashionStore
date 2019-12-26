const express = require('express');
const multer = require('multer');

const controller = require('../controllers/admin.controller');
const adminMiddleware = require('../middleware/admin.middleware');

const upload = multer({dest: './public/images/products/'});

const router = express.Router();

router.get('/', (req, res) => {
   res.redirect('admin/login');
});
router.get('/login', controller.login);
router.post('/login', controller.postLogin);
router.get('/dashboard', adminMiddleware.requireAuthAdmin, controller.dashBoard);
router.get('/staff', adminMiddleware.requireAuthAdmin, controller.staff);
router.get('/user', adminMiddleware.requireAuthAdmin, controller.user);
router.get('/invoice', adminMiddleware.requireAuthAdmin, controller.invoice);
router.get('/product', adminMiddleware.requireAuthAdmin, controller.product);
router.get('/report', adminMiddleware.requireAuthAdmin, controller.report);
router.put('/staff/signup', adminMiddleware.requireAuthAdmin, controller.createStaff);
router.put('/user/signup', adminMiddleware.requireAuthAdmin, controller.createUser);
router.put('/staff/update', adminMiddleware.requireAuthAdmin, controller.updateStaff);
router.put('/user/update', adminMiddleware.requireAuthAdmin, controller.updateUser);
router.get('/staff/logout', adminMiddleware.requireAuthAdmin, controller.staffLogout);
router.put('/staff/changepassword', adminMiddleware.requireAuthAdmin, controller.staffChangePassword);
router.put('/invoice/confirm', adminMiddleware.requireAuthAdmin, controller.confirmInvoice);
router.get('/invoice/detail', adminMiddleware.requireAuthAdmin, controller.detailInvoice);
router.get('/product/detail', adminMiddleware.requireAuthAdmin, controller.detailProduct);
router.put('/product/remove', adminMiddleware.requireAuthAdmin, controller.removeProduct);
router.put('/product/detail/remove', adminMiddleware.requireAuthAdmin, controller.removeProductDetail);
router.put('/product/detail/update', adminMiddleware.requireAuthAdmin, controller.updateProduct);
router.put('/product/detail/updatedetail', adminMiddleware.requireAuthAdmin, controller.updateProductDetail);
router.post('/product/detail/create', upload.single('avatar'), controller.createProduct);
router.post('/product/detail/createdetail', upload.single('avatardetail'), controller.createProductDetail);

module.exports = router;