import React, { useState } from 'react'
import { data } from "../../product"
import Products from '../Allproduct/Products';
import CategorySidebar from '../Share/CategorySidebar';
import Select from 'react-select';

const ListingAllProduct = () => {
  const [alldata, setAlldata] = useState([])
  let newArray = []
  const filterByPrice = (min, max) => {

    data?.length !== 0 &&
      data.map((el, index) => {
        if (el) {

          const price = el.price


          if (min <= price && max >= price) {
            newArray.push(el)
          }






        }
      })
    const list = newArray.filter((el, index) => newArray.indexOf(el) === index)
    setAlldata(list)
  }


  const filterByBrand = (keyword) => {
    
    if (keyword) {
      data?.length !== 0 &&
        data.map((el) => {
          if (el) {
            const brand = el.brand
            if (brand === keyword) {
              newArray.push(el);
            }
            else {
              return message
            }
          }
        });
    }

    const list = newArray.filter((el, index) => newArray.indexOf(el) === index);
    setAlldata(list);
  };


  //  Filter by Rating///
  let message = "no Products found"
  const filterByRating = (keyword) => {
    if (keyword) {
      data?.length !== 0 &&
        data.map((el) => {
          if (el) {
            const rating = el.rating.rate
            if (rating === keyword) {
              newArray.push(el);
            }
            else {
              return message
            }
          }
        });
    }

    const list = newArray.filter((el, index) => newArray.indexOf(el) === index);
    setAlldata(list);
  };






  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: 'newest', label: 'newest' },
    { value: 'oldest', label: 'oldest' },
    { value: 'price hight to low', label: 'price high to low' },
    { value: 'price low to hight', label: 'price low to high' },

  ];
  const options2 = [
    { value: "5", label: 'items show 5' },
    { value: 'oldest', label: 'items show 10' },
    { value: 'price hight to low', label: 'items show 15' },
    { value: 'price low to hight', label: 'items show 20' },

  ];
  return (
    <div>
      <div className='container-fluide '>

        <div className=' flex  mb-6 w-[100%] '>

          <Select
            className=' ml-auto mx-4'
            placeholder={`sort by`}
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />


          <Select
            className=''
            placeholder={`items show 50`}
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options2}
          />


        </div>
        <div className="grid md:grid-cols-5 grid-cols-1 gap-4">

          <div className='sidebar-wraper'>
            <div className='side-bar'>
            <CategorySidebar 
            
            selectedOption={selectedOption} 
            setSelectedOption={setSelectedOption}
           currentCatData={alldata} 
           filterByPrice={filterByPrice} 
           filterByBrand={filterByBrand} 
           filterByRating={filterByRating}
                />


            </div>

          </div>

          <div className='col-span-4 '>

            <div className="productRow ">
              <div className="item grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-2 z-[-100]">

                {
                  alldata?.length !== 0 && alldata.map((i, index) => {
                    return (
                      <Products key={index} data={i} tag={i.type} height={"340px"} />
                    )
                  })
                }

              </div>


            </div>

          </div>



        </div>


      </div>

    </div>
  )
}

export default ListingAllProduct