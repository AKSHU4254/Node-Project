import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Nav(props) {
    const auth=localStorage.getItem('user')
    const navigate=useNavigate()
    const logout=()=>{
      localStorage.clear();
      navigate('/signup')
    }

  return (
    <div>
      {auth?
        <ul className='nav-ul'>
            <li><Link to="/">Product</Link></li>
            <li><Link to="/add">AddProduct</Link></li>
            <li><Link to="/update">UpdateProduct</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to='/signup' onClick={logout}>Logout({JSON.parse(auth).name})</Link></li>
            </ul>
            :<ul className='nav-ul nav-name'>
            <li><Link to="/signup">SignUp</Link></li>
            <li><Link to ="/login">Login</Link></li>
            </ul>
            }
    </div>
  );
}

export default Nav