import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  adminGetProducts,
  adminProductDelete,
} from "../../redux/Slice/ProductSlice/ProductSlice";
import { adminGetCategory } from "../../redux/Slice/categorySlice/categorySlice";
import Loading from "../Share/Loading";
import Pagination from "../Share/Pagination";

const Adminproducts = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const { AllProducts, loading } = useSelector((state) => state.products);
  const { CategoryData } = useSelector((state) => state.category);

  const productApi = () => {
    const data = { page };
    dispatch(adminGetProducts(data))
      .then((res) => {
        if (res.payload.Pagination) {
          setPageCount(res.payload.Pagination.pageCount);
        }
      })
      .catch((error) => console.log(error));
  };

  const nextPage = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };

  const prevPage = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    });
  };

  useEffect(() => {
    dispatch(adminGetCategory());
    productApi();
  }, [dispatch, page]);

  const getCategoryNameById = (categoryId) => {
    const category = CategoryData.find(
      (category) => category._id === categoryId
    );
    return category ? category.categoryName : "Category Not Found";
  };

  const handledelete = (url) => {
    const data = { url };
    dispatch(adminProductDelete(data))
      .then(() => dispatch(adminGetProducts({ page })))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <section>
        {loading ? (
          <Loading margin={"mt-7"} />
        ) : (
          <div className="w-auto overflow-auto h-[600px]">
            <p className="text-center text-2xl mb-4">
              Total products: [{AllProducts?.products?.length}]
            </p>
            <div className="">
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2">Image</th>
                    <th className="p-2">Product Name</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Total Qty</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Category</th>
                    <th className="p-2">Sizes</th>
                    <th className="p-2">Colors</th>
                    <th className="p-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {AllProducts?.products?.length !== 0 &&
                    AllProducts?.products?.map((el, index) => (
                      <tr key={index} className="">
                        <td className="p-2">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img src={el.images[0]} alt={el.productName} />
                          </div>
                        </td>
                        <td className="p-2">{el.productName.slice(0, 20)}</td>
                        <td className="p-2">
                          {el.quantity <= 0 ? (
                            <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-red-100 text-red-800">
                              Out of stock
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              In stock
                            </span>
                          )}
                        </td>
                        <td className="p-2">{el.quantity}</td>
                        <td className="p-2">${el.price}</td>
                        <td className="p-2">
                          {getCategoryNameById(el.categoryid)}
                        </td>
                        <td className="p-2">
                          {el.sizes.length === 0 ? (
                            <p>-</p>
                          ) : (
                            el.sizes.map((size, idx) => (
                              <span
                                key={idx}
                                className="inline-block px-2 py-1 mr-1 mb-1 text-xs bg-gray-100 rounded"
                              >
                                {size}
                              </span>
                            ))
                          )}
                        </td>
                        <td className="p-2">
                          {el.colors.map((color, idx) => (
                            <span
                              key={idx}
                              style={{ background: color }}
                              className="inline-block w-4 h-4 rounded-full border mr-1"
                            ></span>
                          ))}
                        </td>
                        {/* Action button with hover dropdown */}
                        <td className="p-2 text-right">
                          <div className="relative group inline-block">
                            <button className="p-2 rounded-full hover:bg-gray-100">
                              <HiOutlineDotsVertical
                                size={22}
                                className="text-gray-600"
                              />
                            </button>

                            <div
                              className="absolute right-0 w-44 bg-white border rounded-md shadow-lg 
                 opacity-0 group-hover:opacity-100 
                 pointer-events-none group-hover:pointer-events-auto 
                 transition duration-200"
                            >
                              <ul className="text-sm">
                                {/* Edit */}
                                <li>
                                  <Link
                                    to={`/adminaccount/updateproduct/${el._id}`}
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                  >
                                    <span>✏️</span>
                                    <span>Edit Product</span>
                                  </Link>
                                </li>

                                {/* Delete */}
                                <li>
                                  <button
                                    onClick={() => handledelete(el._id)}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                                  >
                                    <span>🗑️</span>
                                    <span>Delete Product</span>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      <Pagination
        setPage={setPage}
        prevPage={prevPage}
        nextPage={nextPage}
        page={page}
        pageCount={pageCount}
      />
    </>
  );
};

export default Adminproducts;
