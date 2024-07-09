/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'


const Login = ({setShowLogin}) => {

    const {url,setToken } = useContext(StoreContext)



    const [currState,setCurrState] = useState("Login")
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event) =>{
        const name = event.target.name
        const value = event.target.value
        setData(data=>({...data,[name]:value}))

    }

    const onLogin = async (event) =>{
        event.preventDefault()
        let newUrl = url
        if (currState==="Login") {
            newUrl += "/api/user/login"
            
        }
        else{
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl,data)

        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }
        else{
            alert(response.data.message)
        }


    }
   
  return (
    <div className='login'>
        <form onSubmit={onLogin} className="login-container">
            <div className="login-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-input">
                {currState ==="Login"?<></>:<input onChange={onChangeHandler} value={data.name} name='name' type="text " placeholder='Enter your name'  required/>}
                
                <input  onChange={onChangeHandler} value={data.email} name='email' type="email " placeholder='Enter your email'  required/>
                <input onChange={onChangeHandler} value={data.password} name='password' type="password " placeholder='password'  required/>
            </div>
            <button type='submit'>{currState==="Sign up"?"Create account":'Login'}</button>
            <div className="login-condition">
                <input type="checkbox" required />
                <p>I agree, The terms and condition</p>
            </div>
            {currState==="Login"
            ? <p>Create new account? <span onClick ={()=>setCurrState("Sign up")}>Click here</span></p>
            : <p>Already have an account? <span onClick ={()=>setCurrState("Login")}>Login here</span></p>}
            
           
        </form>
        
      
    </div>
  )
}

export default Login
