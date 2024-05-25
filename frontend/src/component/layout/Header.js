// import React from 'react'

// import "./Header.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'

// const Header = () => {
//     return (
//         <div>
//             <nav>

//                 <h3 className='logo'>Barcadly</h3>
//                 <ul className='nav-list'>

//                     <li><a href="/" className='nav-list-item active'>Home</a></li>
//                     <li><a href="/about" className='nav-list-item'>Product</a></li>
//                     <li><a href="/contact" className='nav-list-item'>Login</a></li>
//                     <li><a href="/services" className='nav-list-item'>
//                         <FontAwesomeIcon icon={faCartShopping} />
//                     </a></li>

//                     <li><a href='/me' className='nav-list-item'>
//                         <FontAwesomeIcon icon={faUser} />
//                     </a></li>

//                 </ul>
//             </nav>
//         </div>
//     )
// }

// export default Header


import React from 'react'
import { MenuData } from './MenuData';
import "./Header.css";
import { useState } from "react";


const Header = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);


    return (
        <nav className='NavbarItems'>
            <h1 className='logo'>Ecommerce</h1>
            <div className='menu-icons'>
                <button className='menu-icon-btn' onClick={() => {
                    setIsNavExpanded(!isNavExpanded)
                }}><i className={isNavExpanded ? "fas fa-times" : "fas fa-bars"}></i></button>

            </div>
            <ul className={isNavExpanded ? "nav-menu" : "nav-menu active"}>
                {MenuData.map((item, index) => {
                    return (
                        <li key={index}><a href={item.url} className={item.cName}><i className={item.icon}></i>{item.title}</a></li>

                    )
                })}

            </ul>
        </nav>
    )
}

export default Header

