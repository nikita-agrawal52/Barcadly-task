import './App.css';
import Header from './component/layout/Header.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import webFont from 'webfontloader';
import React from 'react';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';
import LoginSignup from './component/User/LoginSignup.js';
import Cart from './component/Cart/Cart.js';
import store from './store.js';
import { loadUser } from './actions/userActions';




function App() {
  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/product/:id" Component={ProductDetails} />
        <Route exact path="/products" Component={Products} />
        <Route path="/products/:keyword" Component={Products} />
        <Route exact path="/login" Component={LoginSignup} />
        <Route exact path="/cart" Component={Cart} />

      </Routes>


    </Router>
  );
}

export default App;
