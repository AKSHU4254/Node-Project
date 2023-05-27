import React, { useState } from 'react'

 function Addproduct(props) {

    const[name,setName]=useState("")
    const[price,setPrice]=useState("")
    const[category,setCategory]=useState("")
    const[Company,setCompany]=useState("")
    const [error,setError]=useState("")

    const Addproduct=async()=>{
      console.log(!name);

      if(!name || !price || !category || !Company){
        setError(true)
         return false;
          }
      

      console.log(name,price,category,Company);
      const userID=JSON.parse(localStorage.getItem('user'))._id;
      let result= await fetch("http://localhost:5000/add-product",{
        method:'post',
        body:JSON.stringify({name,price,category,Company,userID}),
        headers:{
          'Content-Type':'application/json'
        }
      });
      result=await result.json()
      console.log(result)
    }


  return (
    <div className='nav-add'>
           <input type="text" className='inputBox' value={name} placeholder='Enter Your name' onChange={(e)=>setName(e.target.value)}/>
           {error && !name && <span className='invalid-input'>Enter valid name</span>}
           <input type="text" className='inputBox' value={price} placeholder='Enter Your price' onChange={(e)=>setPrice(e.target.value)}/>
           {error && !price && <span className='invalid-input'>Enter valid Price</span>}
           <input type="text" className='inputBox' value={category} placeholder='Enter Your category' onChange={(e)=>setCategory(e.target.value)}/>
           {error && !category && <span className='invalid-input'>Enter valid category</span>}
           <input type="text" className='inputBox' value={Company} placeholder='Enter Your company' onChange={(e)=>setCompany(e.target.value)}/>
           {error && !Company && <span className='invalid-input'>Enter valid company</span>}
           <button type='button' className='appButton' onClick={Addproduct} >Add Product</button> 
    </div>
  )
}
export default Addproduct;