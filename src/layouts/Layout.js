import React from 'react'

import Footer from './Footer/Footer'
import Navbar2 from './HeADER/Navbar2'
import Header2 from './HeADER/Header2'
import Breadcrumb from '../Components/Share/Breadcrumb'





const Layout = ({children}) => {
  return (
    <div>
    <div className='mb-40'>
    <Navbar2/>
  
    </div>
    
    {children}
   
    <Footer/>
    </div>
  )
}

export default Layout