import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavOpenContex } from '../../Contexapi/NavopenContex';

const Dropdown = ({ dropdown, pdData, setDropDown, categoryRef }) => {
    const { setNavOpen } = useContext(NavOpenContex);
    const navigate = useNavigate()

    const submitHandaler = (i) => {

        navigate(`/products-filter?categoryId=${i._id}`);
        setDropDown(false)

    }


    return (
        <div className="relative ">
            <div ref={categoryRef} className={`rounded-lg overflow-y-auto pb-4 h-[500px] w-full bg-[#fff] absolute z-40 rounded-b-md shadow-sm `}>
                {
                    pdData && pdData.map((i, index) => {

                        return (
                            <>
                                <div

                                    key={index}
                                    className='flex justify-center items-center p-3'
                                    onClick={()=>{
                                        submitHandaler(i);
                                        setNavOpen(false)
                                    }}

                                >

                                    <img className='w-[55px] h-[55px] object-contain  select-none' src={i.catimage} alt="" />

                                    <h3 className='m-3 cursor-pointer select-none'>{i.categoryName}</h3>

                                </div>
                                <hr /></>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Dropdown