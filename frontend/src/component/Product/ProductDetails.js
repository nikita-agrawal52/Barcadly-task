import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import "./ProductDetails.css";
import { clearErrors, getProductDetails } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert'
import ReviewCard from './ReviewCard.js'
import ReactStars from 'react-rating-stars-component';
import Loader from './../layout/Loader/Loader';
import Metadata from '../layout/Metadata.js';
import { addItemsToCart } from "../../actions/cartActions.js";



const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { product, loading, error } = useSelector((state) => state.productDetails);
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, alert, error]);

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25,

    }
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => {
        if (product.stock <= quantity) { return; };
        const qty = quantity + 1;
        setQuantity(qty);
    };
    const decreaseQuantity = () => {
        if (1 >= quantity) { return; };
        const qty = quantity - 1;
        setQuantity(qty);
    }
    const addToCartHandler = () => {
        const itemId = window.location.pathname.split('/').pop();
        dispatch(addItemsToCart(itemId, quantity));
        alert.success("Item Added to cart");
    }




    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <Metadata title={`${product.name} -- ECOMMERCE`} />
                    <div className='ProductDetails'>
                        <div className='CarouselImageContainer'>
                            <Carousel>
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img
                                            className='CarouselImage'
                                            key={item.url}
                                            src={item.url}
                                            alt={`${i} slide`}
                                        />
                                    ))}
                            </Carousel>
                        </div>
                        <div className='details-block-container'>
                            <div className='details-block-1'>
                                <h2>{product.name}</h2>
                                <p>Product #{product._id}</p>
                            </div>
                            <div className='details-block-2'>
                                <ReactStars {...options} /><span> ({product.numOfReviews} Reviews) </span>
                            </div>
                            <div className='details-block-3'>
                                <h1>{`₹ ${product.price}`}</h1>
                                <div className='details-block-3-1'>
                                    <div className='details-block-3-1-1'>
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly value={quantity} type='number' />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button onClick={addToCartHandler}>Add to Cart</button>
                                </div>
                                <p>
                                    Status:
                                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                        {product.stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>
                            <div className='details-block-4'>
                                Description : <p>{product.description}</p>
                            </div>
                            <button className='submitReview'>Submit Review</button>
                        </div>
                    </div>
                    <h3 className='reviewsHeading'>Reviews</h3>
                    {product.reviews && product.reviews[0] ? (
                        <div className='reviews'>
                            {product.reviews &&
                                product.reviews.map((review) => <ReviewCard review={review} />)}
                        </div>
                    ) : (
                        <p className='noReview'>No reviews yet.</p>
                    )}

                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails
