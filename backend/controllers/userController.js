const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");




// REGISTER A USER

exports.registerUser = catchAsyncErrors(async (req, res, next) => {



    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,

    });


    sendToken(user, 201, res);
});

// LOG IN A USER

exports.loginUser = catchAsyncErrors(async (req, res, next) => {


    const { email, password } = req.body;
    // CHECKING IF USER HAS GIVEN EMAIL AND PASSWORD BOTH

    if (!email || !password) {
        return next(new ErrorHander("Please enter Email & Password", 400));
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid email or password", 401));
    }


    sendToken(user, 200, res);

});


//LOGOUT USER

exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out Successfully"
    });
});

// FORGOT PASSWORD

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHander("user not found", 404));
    }

    // GET RESET PASSWORD TOKEN
    const resetToken = user.getPasswordResetToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email
     then, please ignore it`;

    try {

        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,

        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });


    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHander(error.message, 500));

    }
});



// GET USER DETAILS

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

// UPDATE USER PASSWORD

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {


    const user = await User.findById(req.user.id).select("+password");


    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);



    if (!isPasswordMatched) {
        return next(new ErrorHander("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHander("password does not match", 400));
    }


    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

