import React, { Fragment, useEffect, useState } from 'react'
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';

import { Typography } from '@mui/material';
import { Slider } from '@mui/material';
import { useAlert } from 'react-alert';
import Metadata from '../layout/Metadata';

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Smartphones"
];

const Products = ({ match }) => {
    const { keyword } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [price, setPrice] = useState([0, 250000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const { products, loading, error } = useSelector(state => state.products);
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, price, category, ratings));
    }, [dispatch, keyword, price, category, ratings, alert, error]);
    return (<Fragment>
        {loading ? <Loader /> :
            <Fragment>
                <Metadata title="Products -- Ecommerce" />
                <h2 className='productsHeading'>Products</h2>
                <div className='products'>
                    {products &&
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                </div>
                <div className='filterBox'>
                    <Typography>Price</Typography>
                    <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={250000}
                    />
                    <Typography>Categories</Typography>
                    <ul className='categoryBox'>
                        {categories.map((category) => (
                            <li
                                className='categoryLink'
                                key={category}
                                onClick={() => setCategory(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                    <fieldset>
                        <Typography component="legend">Ratings Above</Typography>
                        <Slider
                            value={ratings}
                            onChange={(e, newRating) => {
                                setRatings(newRating);
                            }}
                            aria-labelledby="continuous-slider"
                            min={0}
                            max={5}
                            valueLabelDisplay="auto"
                        />
                    </fieldset>
                </div>
            </Fragment>}

    </Fragment>)


}

export default Products
