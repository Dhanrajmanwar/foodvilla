/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Et esse optio soluta veritatis quod accusantium iste quae nam, a nisi. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt itaque odit sint nam voluptatem placeat magni fugit magnam in blanditiis!</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>

                    </div> 
                )
            })}
        </div>
        <hr />
      
    </div>
  )
}

export default ExploreMenu

