import React, { Fragment } from 'react';
import "./Cart.css";
import CartItemsCard from "./CartItemsCard.js";

import { useSelector, useDispatch } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from './../../actions/cartActions';
import { Link } from 'react-router-dom';


const Cart = ({ isAuthenticated }) => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newqty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newqty))
    }
    const decreaseQuantity = (id, quantity) => {
        const newqty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newqty))
    }

    const handleRemoveItem = (productId) => {
        dispatch(removeItemsFromCart(productId));
    }
    // const checkoutHandler = () => {

    //     if (isAuthenticated) {
    //         history.push("/shipping");
    //     } else {
    //         history.push("/login?redirect=shipping");
    //     }
    // };
    return (
        <Fragment>
            <div className='cartPage'>
                <div className='cartHeader'>
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                </div>
                {cartItems && cartItems.map((item) => (
                    <div className='cartContainer' key={item.product}>
                        <CartItemsCard item={item} deleteCartItem={() => handleRemoveItem(item.product)} />
                        <div className='cartInput'>
                            <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                            <input readOnly value={item.quantity} type='number' />
                            <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                        </div>
                        <p className='cartSubtotal'>{`₹${item.price * item.quantity
                            }`}</p>
                    </div>
                ))}


                <div className='cartGrossProfit'>
                    <div></div>
                    <div className='cartGrossProfitBox'>
                        <p>Gross Total</p>
                        <p>{`₹${cartItems.reduce(
                            (acc, item) => acc + item.quantity * item.price, 0
                        )}`}</p>
                    </div>
                    <div></div>
                    <div className='checkOutBtnBox'>
                        {/* Use Link component for navigation */}
                        {isAuthenticated ? (
                            <Link to="/shipping" className='checkOutBtn'>Check Out</Link>
                        ) : (
                            <Link to="/login?redirect=shipping" className='checkOutBtn'>Check Out</Link>
                        )}

                        {/* <button className='checkOutBtn' onClick={checkoutHandler}>Check Out</button> */}

                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default Cart
