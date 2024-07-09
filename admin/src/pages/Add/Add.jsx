/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({ url }) => {

  // const url = 'http://localhost:4000';

  const [image, setImage] = useState(false)

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Masala Dosa"
  });

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }



  const onSubmitHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)
    const response = await axios.post(`${url}/api/food/add`, formData)
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Masala Dosa"
      })
      setImage(false)
      toast.success(response.data.message)
    }
    else {
      toast.error(response.data.message)
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload">
          <p>Upload image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Food name' id="" />

        </div>
        <div className="add-product-desc flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write description for your food'></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-categoty flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category" >
              <option value="Masala Dosa">Masala Dosa</option>
              <option value="Paneer Masala">Paneer Masala</option>
              <option value="Matar Paneer">Matar Paneer</option>
              <option value="Chicken Curry">Chicken Curry</option>
              <option value="Chicken Biryani">Chicken Biryani</option>
              <option value="Egg Biryani">Egg Biryani</option>
              <option value="Aloo Matar">Aloo Matar</option>
              <option value="Rajma Masala">Rajma Masala</option>
              <option value="Chicken Noodles">Chicken Noodles</option>
              <option value="Idli">Idli</option>
              <option value="Burger">Burger</option>
              <option value="Pizza">Pizza</option>
              <option value="Ice Cream">Ice Cream</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='Rs. 100' />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add</button>

      </form>

    </div>
  )
}

export default Add