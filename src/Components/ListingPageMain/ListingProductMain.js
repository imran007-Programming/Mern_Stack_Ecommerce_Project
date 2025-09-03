import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts } from "../../redux/Slice/ProductSlice/ProductSlice";
import { adminGetBrand } from "../../redux/Slice/brandSlice/brandSlice";
import { adminGetCategory } from "../../redux/Slice/categorySlice/categorySlice";
import CategorySidebar from "../Share/CategorySidebar";
import Products from "../Allproduct/Products";
import Skeleton from "../Skeleton/Skeleton";

const ListingProductMain = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [value1, setValue1] = useState("");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [params] = useSearchParams();
  const categoryid = params.get('categoryId');
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(true);

  const { GetallBrand } = useSelector((state) => state.brand);
  useEffect(() => {
    dispatch(adminGetBrand());
  }, [dispatch]);

  const { CategoryData } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(adminGetCategory());
  }, [dispatch]);

  const { filterproducts: { products }, loading } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      const data = {
        selectedCategory: categoryid,
        price: value1,
        size: size,
        brand: brand.toLowerCase(),
        sortBy: selectedOption?.value,
        limit: selectedOption?.value
      };
      await dispatch(filterProducts(data));
      setIsFetching(false);
    };
    fetchData();
  }, [categoryid, value1, size, selectedOption, brand, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [categoryid, size, selectedOption, brand]);

  useEffect(() => {
    setBrand("");
  }, [categoryid]);

  const filterByPrice = (min, max) => {
    let result = `${min}-${max}`;
    setValue1(result);
  };

  const filterByBrand = (keyword) => {
    setBrand(keyword);
  };

  const filterBySize = (keyword) => {
   
    setSize(keyword);
  };

  const options = [
    { value: "newest", label: "newest" },
    { value: "oldest", label: "oldest" },
    { value: "priceHighToLow", label: "price high to low" },
    { value: "priceLowToHigh", label: "price low to high" },
  ];

  const options2 = [
    { value: "2", label: "items show 2" },
    { value: "10", label: "items show 10" },
    { value: "15", label: "items show 15" },
    { value: "20", label: "items show 20" },
  ];

  return (
    <div className="container-fluide">
      <div className="hidden md:flex items-center justify-between my-6">
        <Select
          className="ml-auto w-64 mx-4 md:z-20 sm:z-10 lg:z-20"
          placeholder={`sort by`}
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
          isSearchable={false}
        />
        <Select
          className="w-64 md:z-20 sm:z-10 lg:z-20"
          placeholder={`items show 50`}
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          isSearchable={false}
          options={options2}
        />
      </div>
      <div className=" hidden md:block my-0">
        <h1 className="text-[gray] text-center mr-auto">
          We found<span className="text-[green]">{products?.length}</span> items for you!!
        </h1>
      </div>
      <div className="grid md:grid-cols-4 md:gap-5 lg:gap-4">
        <div className="sidebar-wraper md:col-span-1">
          <CategorySidebar
            CategoryData={CategoryData}
            GetallBrand={GetallBrand}
            currentCatData={products}
            options={options}
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            filterByPrice={filterByPrice}
            filterByBrand={filterByBrand}
            filterBySize={filterBySize}
          />
        </div>
        <div className="col-span-3">
          <div className="md:hidden">
            <h1 className="text-[gray] my-4">
              We found<span className="text-[green]">{products?.length}</span> items for you!!
            </h1>
          </div>
          <div className="productRow">
            <div className="item grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-5 mt-5">
              {isFetching ? (
                Array.from({ length: 10 }).map((_, index) => (
                  <Skeleton key={index} />
                ))
              ) : (
                products?.map((i, index) => (
                  <Products
                    key={index}
                    data={i}
                    tag={i.type}
                    height={"290px"}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingProductMain;
