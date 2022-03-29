import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='navBar'> 
    <Link className='navBar-content' to="/utbildningar" >Utbildningar</Link> | 
    <Link className='navBar-content' to="/Kurser" >Kurser</Link> |
    <Link className='navBar-content' to="/personal" >Personal</Link> |
    <Link className='navBar-content' to="/ansoka" >Ansöka</Link> 
  </nav>
 
)
  
}

export default Navbar;