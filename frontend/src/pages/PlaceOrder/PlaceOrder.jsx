/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const { getTotal, token, food_list, cartItems, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault()
    let orderItems = []
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item
        itemInfo['quantity'] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotal()+40,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if (response.data.success) {
      const {session_url}= response.data
      window.location.replace(session_url)
    }
    else{
      alert("Error")
    }
  }

  const navigate = useNavigate()

  useEffect(()=>{
    if (!token) {
      navigate('/cart')
    }
    else if (getTotal()===0){
      navigate('/cart')


    }

  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} value={data.firstName} name='firstName' type="text" placeholder='First name' />
          <input required onChange={onChangeHandler} value={data.lastName} name='lastName' type="text" placeholder='Last name' />
        </div>
        <input required onChange={onChangeHandler} value={data.email} name='email' type="email" placeholder='Email' />
        <input required onChange={onChangeHandler} value={data.street} name='street' type="text" placeholder='Street/Area/Road/Landmark' />
        <div className="multi-fields">
          <input required onChange={onChangeHandler} value={data.city} name='city' type="text" placeholder='City' />
          <input required onChange={onChangeHandler} value={data.state} name='state' type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} value={data.pincode} name='pincode' type="text" placeholder='Pincode' />
        </div>
        <input required onChange={onChangeHandler} value={data.phone} name='phone' type="text " placeholder='Phone' />

      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs. {getTotal()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>Rs. {getTotal() === 0 ? 0 : 40}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>Rs. {getTotal() === 0 ? 0 : getTotal() + 40}</p>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>


      </div>


    </form>
  )
}

export default PlaceOrder
