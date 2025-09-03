import React from 'react'

const Homecontact = () => {
  return (
    <div className='Home-contact'>
        <div className="map my-5">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.1776899496763!2d90.8316509755574!3d22.94368221926701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3754c18ca81cdb71%3A0x62c9206c514d22fb!2sDaraz%20Lakshmipur%20hub!5e0!3m2!1sen!2sbd!4v1702191485781!5m2!1sen!2sbd" width="100%" height="450" style={{"border":0}} allowFullScreen="" loading="lazy" ></iframe>
        </div>
        <form action="">
        <div className="my-5 w-11/12 mx-auto form grid grid-cols-1 md:grid-cols-2 gap-7">
            <div className="form-text">
              <h5 className='text-[black] text-[50px] font-[600]'>Contact US</h5>
              <p className= 'py-2 text-[black] text-[15px]'>As you might expect of a company that began as a high-end interiors contractor,we pay  strict attention. </p>
              <h1 className='text-[black] text-[30px] font-[500]'>Usa</h1>
              <p className='py-2 text-[black] text-[15px] font-[500]' >195E parker square Dr,Parker Co 801 <br />
              +343543030521
              </p>
              <h2 className='text-[black] text-[30px] font-[500] my-1' >Bangladesh</h2>
              <p className='text-[black] text-[15px] font-[500]' >gulshan Avenue.Street No.52.park avenue</p>
              +88023242353255
            </div>

            <div className="form-details">
             <input className='w-[100%] md:w-[40%] md:h-[17%] outline-none border border-black p-3' placeholder='Name' type="text" />
             <input className='w-[100%]   md:w-[40%] md:h-[17%] outline-none border border-black mt-6 p-5 md:ml-7' placeholder='Email' type="email" />
            <div className="flex flex-col">
            <textarea className='w-[100%] md:w-[80%] md:h-[60%] resize-none outline-none border border-black p-5 mt-7' placeholder='Message..' id="w3review" name="w3review" rows="7" cols="52"/>
             <button className='md:w-[27%] mt-4 p-3 bg-[black] text-[white]'>Send Message</button>
            </div>
            </div>
           
        </div>

        </form>


    </div>
  )
}

export default Homecontact