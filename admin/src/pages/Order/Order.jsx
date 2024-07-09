/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import './Order.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrash } from '@fortawesome/fontawesome-free-solid'

const Order = ({ url }) => {
  // let url = "http://localhost:4000"
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list")
    if (response.data.success) {
      setOrders(response.data.data);
      // console.log(response.data.data);
    }
    else {
      toast.error("Error")

    }

  }

  const statusHandler = async (event, orderId) => {
    // console.log(event,orderId);
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders()

    }


  }

  const removeOrderData = async (orderId) => {
    const response = await axios.post(`${url}/api/order/removeOrderData`, { id: orderId })
    console.log(response);
    await fetchAllOrders()
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }

  }



  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + " , "


                  }

                })}
              </p>
              <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + " , "}</p>
                <p>{order.address.city + " , " + order.address.state + ", " + order.address.pincode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>Rs. {order.amount}</p>
            <div className="delete-order">
              <button className='removeOrder' onClick={()=>removeOrderData(order._id)}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Proccessing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Deliverd">Deliverd</option>
            </select>

            
          </div>
        ))}
      </div>

    </div>
  )
}

export default Order
