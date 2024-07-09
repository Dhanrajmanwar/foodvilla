/* eslint-disable no-unused-vars */
import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'







const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae temporibus ut consequuntur odit sit quam ratione voluptas quas voluptatem enim!</p>
                    <div className="footer-social-icon">
                        
                        
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>

                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>

                </div>
                <div className="footer-content-right">
                    <h2>CONTACT - US</h2>
                    <ul>
                        
                        <li> <a href="tel:8180919119">+91 8180919119</a></li>
                        <li > <a href="mailto:dhanrajmanwar0358@gmail.com">dhanrajmanwar0358@gmail.com</a></li>
                    </ul>

                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2024 @ FoodVilla.com - All Rights Reserved.</p>

        </div>
    )
}

export default Footer
