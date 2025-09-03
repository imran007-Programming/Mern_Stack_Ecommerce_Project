import React, { useEffect, useState } from 'react'
import { data } from "../../product"
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { adminGetProducts, adminProductDelete } from '../../redux/Slice/ProductSlice/ProductSlice';
import { adminGetCategory } from '../../redux/Slice/categorySlice/categorySlice';
import Loading from '../Share/Loading';
import { Link } from 'react-router-dom';
import Pagination from '../Share/Pagination';

const Adminproducts = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const { AllProducts, loading } = useSelector((state) => state.products)


  const productApi = () => {
    const data = {
      page
    }

    dispatch(adminGetProducts(data)).then((res) => {
      if (res.payload.Pagination) {

        setPageCount(res.payload.Pagination.pageCount)
      }
    }).catch((error) => {
      
    })
  }


  ///handle next page//

  const nextPage = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1
    })
  }
  ///handle prev page//

  const prevPage = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1
    })
  }


  const { CategoryData } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(adminGetCategory());
    productApi()
  }, [dispatch, page]);




  // Function to get category name by category ID
  const getCategoryNameById = (categoryId) => {
    const category = CategoryData.find((category) => category._id === categoryId);

    return category ? category.categoryName : 'Category Not Found';
  };

  ////Delete PRoduct///
  const handledelete = (url) => {
    const data = {
      url
    }
    dispatch(adminProductDelete(data)).then(() => 
    dispatch(adminGetProducts({ page }))
    
    
  
  )
  
      .catch((error) => console.log(error));
  }






  return (
    <>

      <section>
        {loading ? (
          <Loading margin={"mt-7"} />) : <div className=' w-auto overflow-auto h-[600px] '>
          <p className='text-center text-2xl'>Total products:[{AllProducts?.products?.length}] </p>
          <div className="overflow-x-auto ">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    Image
                  </th>
                  <th>Product Name</th>
                  <th>status</th>
                  <th>TotalQty</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>sizes</th>
                  <th>Colors</th>
                  <th>Action</th>

                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {
                  AllProducts?.products?.length !== 0 &&
                  AllProducts?.products?.map((el, index) => {

                    return (<tr>
                      <td>
                        <div className="avatar">
                          <div className="rounded-full w-12 h-12">
                            <img src={el.images[0]} alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                      </td>
                      <td>
                        {el.productName.slice(0, 20)}
                      </td>
                      <td>
                        {
                          el.
                            quantity <= 0 ? <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>Out of stock</span> : <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>In stock</span>
                        }
                      </td>
                      <td>
                        {el.quantity}
                        <br />

                      </td>
                      <td>
                        {el.price}
                        <br />

                      </td>
                      <td>{getCategoryNameById(el.categoryid)}</td>
                      <td>
                        {
                          el.sizes.length === 0 ? <p>null</p> : el?.sizes?.map(size => {
                            return (
                              <span className="badge badge-ghost badge-sm">{size}</span>
                            )
                          })}

                      </td>
                      <td>
                        {el?.colors?.map((color) => {

                          return (


                            <span style={{
                              background: `${color}`
                            }} className="badge badge-ghost badge-sm " >

                            </span>

                          )
                        })}
                      </td>

                      <th className="dropdown dropdown-end">
                        <HiOutlineDotsVertical tabIndex={0} className="cursor-pointer" size={25} />

                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                          <Link to={`/adminaccount/updateproduct/${el._id}`}><button className='btn btn-xs btn-primary w-full '>Edit Product</button>
                          </Link>
                          <button className='btn bg-[crimson] hover:bg-[crimson] btn-xs mt-1 w-full text-white' onClick={() => handledelete(el._id)}>Delete Product</button>
                        </ul>

                      </th>
                    </tr>)
                  })
                }

              </tbody>


            </table>


          </div>

        </div>
        }
       
      </section>
      <Pagination setPage={setPage} prevPage={prevPage} nextPage={nextPage} page={page} pageCount={pageCount} />

    </>

  )
}

export default Adminproducts