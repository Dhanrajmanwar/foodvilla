/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const Verify = () => {

    const [searchParamas,setSearchParams] = useSearchParams()
    const success = searchParamas.get("success")
    const orderId = searchParamas.get("orderId")

    // console.log(success,orderId);

    const {url} = useContext(StoreContext)
    const navigate = useNavigate()

    const verifyPayment = async () =>{
        const response = await axios.post(url+"/api/order/verify",{success,orderId})
        if (response.data.success) {
            navigate("/myorders")
        }
        else{
            navigate("/")
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[])

    



  return (
    <div className='verify'>
        <div className="loading">

        </div>
      
    </div>
  )
}

export default Verify

