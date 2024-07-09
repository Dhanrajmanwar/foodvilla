/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrash } from '@fortawesome/fontawesome-free-solid'

const MyOrders = () => {

    const [data, setData] = useState([])
    const { url, token } = useContext(StoreContext)

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
        setData(response.data.data)
        // console.log(response.data.data);
    }

    const removeOrder = async (orderId) => {
        const response = await axios.post(`${url}/api/order/removeOrder`, { id: orderId })
        console.log(response);
        await fetchOrders()
        // if(response.data.success){
        //   toast.success(response.data.message)
        // }
        // else{
        //   toast.error("Error")
        // }
    
      }

    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token])


    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " X " + item.quantity
                                }
                                else {
                                    return item.name + " X " + item.quantity + " ,"

                                }

                            })}</p>
                            <p>Rs. {order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span><b> {order.status}</b></p>
                            <button className='removeOrder' onClick={()=> removeOrder(order._id)}><FontAwesomeIcon icon={faTrash} /></button>
                            <button onClick={fetchOrders}>Track Order</button>

                        </div>
                    )

                })}
            </div>

        </div>
    )
}

export default MyOrders
