/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets.js'
import {Link, useNavigate} from  "react-router-dom";
import { StoreContext } from '../../context/StoreContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faArrowCircleRight,  faShoppingBag, faShoppingBasket, faUser } from '@fortawesome/fontawesome-free-solid'

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("Home")
     
    const {getTotal,token,setToken} = useContext(StoreContext)
    const navigate = useNavigate()

    const logout = () => {
      localStorage.removeItem("token")
      setToken("")
      navigate("/")
    }

  return (
    <div className='navbar bg'>
        <Link to='/'><img src={assets.logo} alt="" className='logo'/></Link>
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}>Menu</a>
            <a href='#footer' onClick={()=>setMenu("Contact-us")} className={menu==="Contact-us"?"active":""}>Contact us</a>
        </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
           <Link to='/cart' className='cart-icon'> <FontAwesomeIcon icon={faShoppingBasket} /></Link>
            <div className={getTotal()===0?"":"dot"}></div>

        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>:<div className='navbar-profile'>
        <span className='profile-icon'><FontAwesomeIcon icon={faUser} /></span>
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate('/myorders')}><FontAwesomeIcon icon={faShoppingBag} /><p>Order</p></li>
            <hr />
            <li onClick={logout}><FontAwesomeIcon icon={faArrowCircleRight} /><p>Logout</p></li>
          </ul>
          </div>}
        
      </div>
    </div>
  )
}

export default Navbar

