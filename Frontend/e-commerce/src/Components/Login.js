import React,{useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function Login(props) {

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

    const loginHandle=async()=>{
        let result=await fetch("http://localhost:5000/login",{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result=await result.json();
        console.log(result)
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate('/')
        }else{
            alert("Please enter a correct details")
        }
    
    
    }

  return (
    <div className='login'>
       <input type="text" className='inputBox'  value={email} placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" className='inputBox'  value={password} placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}/>
        <button type='button' onClick={loginHandle} className='appButton'>Login</button>
    </div>
  )
}
export default Login