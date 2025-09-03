import React, { useEffect, useState } from "react";
import "./Allproduct.scss";
import Products from "./Products";


import { useDispatch, useSelector } from "react-redux";
import { adminGetProducts } from "../../redux/Slice/ProductSlice/ProductSlice";

import Loading from "../Share/Loading";
import Skeleton from "../Skeleton/Skeleton";
const Allproduct = () => {

  const dispatch = useDispatch()
  const { AllProducts: { products }, loading, error } = useSelector((state) => state.products)

  


  const { getCartProduct } = useSelector((state) => state.cart)
  const [skeletonLoading, setSkeletonLoading] = useState(true)
  const productApi = () => {
    const data = {
      selectedCategory: "all"
    }
    dispatch(adminGetProducts(data))
  }






  useEffect(() => {
    productApi()
  }, [])



  useEffect(() => {

    setSkeletonLoading(true);
    // Simulate loading delay
    const timer = setTimeout(() => {
      setSkeletonLoading(false);
    }, 2000); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);




  return (
    <div className="all-products">
      <h1 className=" text-3xl ml-2 mb-4 text-center ">
        Recommended For You
      </h1>

      <div className="container-fluide">


        <div className="productRow ">

          {
            <div className="item grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 sm:gap-y-10 sm:gap-x-2 md:gap-2 lg:gap-8">


              {
                products && products.map((i, index) => {
                  return (


                loading ? 

                      <Skeleton />
                   :

                      <Products

                        key={index}
                        data={i}
                      />

                  )
                })
              }

            </div>
          }





        </div>

      </div>

    </div>
  );
};

export default Allproduct;
