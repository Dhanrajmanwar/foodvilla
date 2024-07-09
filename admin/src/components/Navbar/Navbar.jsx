/* eslint-disable no-unused-vars */
import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
        <p className='logo'><img  src={assets.logo} alt="" /><span>Admin Panel</span></p>
        {/* <img className='profile' src={assets.profile_image} alt="" /> */}
      
    </div>
  )
}

export default Navbar
