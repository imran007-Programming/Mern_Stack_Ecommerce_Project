import React, {  useContext, useEffect, useState } from 'react'
import { NavLink, Link, useParams } from 'react-router-dom'
import Breadcrumbs from '../../Components/ListingPageMain/Breadcrumbs'
import { data } from "../../product"
import './Navbar.scss'
import { useDispatch, useSelector } from 'react-redux'
import { adminGetCategory } from '../../redux/Slice/categorySlice/categorySlice'
import { NavOpenContex } from '../../Contexapi/NavopenContex'

const Navbar = () => {

  const {  setNavOpen } = useContext(NavOpenContex);
  const { CategoryData } = useSelector((state) => state.category);
  const dispatch =useDispatch()
 
  useEffect(() => {
    dispatch(adminGetCategory());
  }, []);





  

  const navdata=[
    {name:"Home",href:"/"},
    
  ]





  return (
    <div className='md:flex block   md:items-center md:justify-center mt-4'>
      <div className='flex flex-col md:flex-row'>
       {
        navdata&&navdata.map((i,index)=>{
          return(
            <Link
          
            onClick={()=>setNavOpen(false)}
             key={i.name}
            className="uppercase pb-[20px] md:mt-0 mt-3  font-[500] px-6 cursor-pointer  md:text-[#5F5F5F]"
            
            to={i.href}>
            {i.name}
          </Link>
          )
        })
       }
       
      </div>

      {
        CategoryData && CategoryData.slice(0,2).map((i, index) => {
          return (
            <div  key={index} className='flex'>
              <Link
                onClick={()=>setNavOpen(false)}
                className='text-[#5F5F5F] uppercase  md:text-[#5F5F5F   pb-[20px]   font-[500] px-6 cursor-pointer'
                to={`/products-filter?categoryId=${i._id}`}>
                {i.categoryName}
              </Link>
            </div>
          )
        })
      }

    </div>
  )
}

export default Navbar