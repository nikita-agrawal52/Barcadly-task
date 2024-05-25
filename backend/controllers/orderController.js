const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// CREATE NEW ORDER

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,

    });
    res.status(201).json({
        success: true,
        order
    })

});

// GET SINGLE ORDER 

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHander("Order not found with this order id", 404));
    }

    res.status(200).json({
        success: true,
        order
    })
});


// GET LOGGED IN USER ORDER

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });



    res.status(200).json({
        success: true,
        orders,
    })
});

// GET ALL ORDERS --ADMIN

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    })
});

// UPDATE ORDER STATUS --ADMIN

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHander("Order not found with this order id", 404));
    }

    if (order.orderStatus === "Deleivered") {
        return next(new ErrorHander("You have already deleivered this order", 400));
    }
    order.orderItems.forEach(async (order) => {
        await updateStock(order.product, order.quantity);
    });

    order.orderStatus = req.body.status;

    if (req.body.status === "Deleivered") {
        order.deleiveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false })



    res.status(200).json({
        success: true,

    })
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
};

// DELETE ORDER --ADMIN

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHander("Order not found with this order id", 404));
    }
    await order.deleteOne();


    res.status(200).json({
        success: true,


    })
});