const Product = require('../models/productModel');
const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');

//create product -- ADmin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});

//get all products

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);



    let products = await apiFeature.query;

    res.status(200).json(
        {
            success: true,
            products,
            productsCount,
        }
    );
});

// get single product  [get product information]

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }


    res.status(200).json({
        success: true,
        product,

    });

});


// CREATE NEW REVIEW OR UPDATE THE REVIEW



exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())

    if (isReviewed) {

        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.comment = comment;
                rev.rating = rating;
            }
        })
    }
    else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    let avg = 0;


    product.reviews.forEach(rev => {
        avg += rev.rating
    })



    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true
    });
});

// GET ALL REVIEWS OF A PRODUCT

exports.getProductReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new ErrorHander("Product not found", 404));

    }
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
});

