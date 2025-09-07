import React, { useEffect, useState } from "react";
import "./Allproduct.scss";
import Products from "./Products";

import { useDispatch, useSelector } from "react-redux";
import { adminGetProducts } from "../../redux/Slice/ProductSlice/ProductSlice";

import Loading from "../Share/Loading";
import Skeleton from "../Skeleton/Skeleton";
const Allproduct = () => {
  const dispatch = useDispatch();
  const {
    AllProducts: { products },
    loading,
    error,
  } = useSelector((state) => state.products);

  const { getCartProduct } = useSelector((state) => state.cart);
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const productApi = () => {
    const data = {
      selectedCategory: "all",
    };
    dispatch(adminGetProducts(data));
  };

  useEffect(() => {
    productApi();
  }, []);

  useEffect(() => {
    setSkeletonLoading(true);
    // Simulate loading delay
    const timer = setTimeout(() => {
      setSkeletonLoading(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="all-products  ">
      <h1 className="text-2xl text-start mb-9 ml-2 ">Recommended For You</h1>

      <div className="">
        {
          <div className="grid sm:grid-cols-5  grid-cols-2 gap-2">
            {products &&
              products.map((i, index) => {
                return loading ? (
                  <Skeleton key={index} />
                ) : (
                  <Products key={index} data={i} />
                );
              })}
          </div>
        }
      </div>
    </div>
  );
};

export default Allproduct;
