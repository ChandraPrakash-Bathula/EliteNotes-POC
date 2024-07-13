import React from 'react'
import image from '../utils/Logo.png';
const Header = () => {
  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10'>
        <img src={image} alt='logo' className='w-32 h-20' />
    </div>
  )
}

export default Header