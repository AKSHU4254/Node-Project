import React, { useState , useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

function Register(props) {

    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("")
    const navigate=useNavigate()

    useEffect(()=>{
      const auth=localStorage.getItem('user');

      if(auth)
      {
        navigate('/')
      }
      },[])

    const collectData= async ()=>{
        console.log(name,email,password);
        let result=await fetch("http://localhost:5000/register",{
        method:'post',
        body:JSON.stringify({name,email,password}),
        headers:{
            'Content-Type':'application/json'
        }
        });
        result=await result.json();
        console.log(result);
        localStorage.setItem("user",JSON.stringify(result.user));
        localStorage.setItem("token",JSON.stringify(result.auth));
        navigate('/')
      }

  return (
    <div className='register'>
        <h1>Register</h1>
        <input className='inputBox' type="text" value={name} placeholder='Enter Name'
        onChange={(e)=>setName(e.target.value)}/>
        <input className='inputBox' type="text" value={email} placeholder='Enter Email'
        onChange={(e)=>setEmail(e.target.value)}/>
        <input className='inputBox' type="password" value={password} placeholder='Enter Password'
        onChange={(e)=>setPassword(e.target.value)}/>
        <button className='appButton' type='button' onClick={collectData}>Sign-up</button>
    </div>
  )
}

export default Register