const express = require('express');
const { registerUser,
    loginUser,
    logout,
    forgotPassword,

    getUserDetails,
    updatePassword,

} = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

module.exports = router;