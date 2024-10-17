import React from 'react'
import '../App.css'

const Navbar = () => {
  return (
    <nav className='nav'>
      <div className="logo">Quiz App</div>
      <ul className='ul'>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
