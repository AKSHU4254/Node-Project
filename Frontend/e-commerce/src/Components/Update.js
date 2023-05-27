import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

 function Update(props) {

    const[name,setName]=useState("")
    const[price,setPrice]=useState("")
    const[category,setCategory]=useState("")
    const[Company,setCompany]=useState("")
    const params=useParams()
    const navigate=useNavigate()

    
    useEffect(()=>{
      getProductsDetails()
    },[])

    const getProductsDetails=async()=>{
      console.log(params);
      let result=await fetch(`http://localhost:5000/product/${params.id}`)
      result=await result.json();
      setName(result.name)
      setPrice(result.price)
      setCategory(result.category)
      setCompany(result.Company)
    }

    const UpdateProduct=async()=>{
      console.log(name,price,category,Company)
      let result=await fetch(`http://localhost:5000/product/${params.id}`,{
        method:'put',
        body:JSON.stringify({name,price,category,Company}),
        headers:
        {
          'Content-Type':'application/json'
        }
      })
      result=await result.json();
      console.log(result);
      navigate('/')
    }
  return (
    <div className='nav-add'>
           <input type="text" className='inputBox' value={name} placeholder='Enter Your name' onChange={(e)=>setName(e.target.value)}/>
          
           <input type="text" className='inputBox' value={price} placeholder='Enter Your price' onChange={(e)=>setPrice(e.target.value)}/>
           
           <input type="text" className='inputBox' value={category} placeholder='Enter Your category' onChange={(e)=>setCategory(e.target.value)}/>
           
           <input type="text" className='inputBox' value={Company} placeholder='Enter Your company' onChange={(e)=>setCompany(e.target.value)}/>
           
           <button type='button' className='appButton' onClick={UpdateProduct} >Add Product</button> 
    </div>
  )
}
export default Update;