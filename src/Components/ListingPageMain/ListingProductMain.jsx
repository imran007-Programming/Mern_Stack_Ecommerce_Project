import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts } from "../../redux/Slice/ProductSlice/ProductSlice";
import { adminGetBrand } from "../../redux/Slice/brandSlice/brandSlice";
import { adminGetCategory } from "../../redux/Slice/categorySlice/categorySlice";
import CategorySidebar from "../Share/CategorySidebar/CategorySidebar";
import Products from "../Allproduct/Products";
import Skeleton from "../Skeleton/Skeleton";
import ReactLoading from "react-loading";
import Pagination from "../Share/Pagination";

const ListingProductMain = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [value1, setValue1] = useState("");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [params] = useSearchParams();
  const categoryid = params.get("categoryId");
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { GetallBrand } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(adminGetBrand());
  }, [dispatch]);

  const { CategoryData } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(adminGetCategory());
  }, [dispatch]);

  const {
    filterproducts: { products, pagination },

    loading,
  } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      const data = {
        selectedCategory: categoryid ? categoryid : "all",
        price: value1,
        size: size,
        brand: brand.toLowerCase(),
        sortBy: selectedOption?.value,
        limit: selectedOption?.value ? selectedOption.value : 1,
        page: currentPage,
      };

      await dispatch(filterProducts(data));
      setIsFetching(false);
    };
    fetchData();
  }, [categoryid, value1, size, selectedOption, brand, dispatch, currentPage]);

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
  if (loading) {
    <Skeleton />;
  }

  return (
    <div className="pt-1 container mx-auto sm:px-10 px-2">
      <div className="hidden md:block mt-10"></div>

      <div className="w-full flex justify-center sm:mt-16 mt-0 px-4">
        {/* Sort By Dropdown - Left side */}
        <div className="w-64  sm:flex hidden justify-center items-center gap-x-2 ml-auto ">
          <span>Short By</span>
          <Select
            placeholder="Sort by"
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            isSearchable={false}
            className="w-auto  z-20 "
          />
        </div>

        {/* Items Show Dropdown - Right side */}
        <div className="sm:flex hidden items-center justify-center gap-x-5 w-64 ml-auto">
          <span>Show:</span>
          <Select
            placeholder="Items show"
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options2}
            isSearchable={false}
            className="w-auto"
          />
        </div>
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
        <div className="col-span-3 ">
          <div className="md:hidden">
            <h1 className="text-[gray] my-4">
              We found <span className="text-[green]">{products?.length}</span>{" "}
              items for you!!
            </h1>
          </div>
          <div className="productRow flex">
            <div className="grid sm:grid-cols-4 grid-cols-2 gap-6 md:gap-5 mt-5">
              {isFetching
                ? Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton key={index} />
                  ))
                : products?.map((i, index) => (
                    <Products key={index} data={i} tag={i.type} />
                  ))}
            </div>
          </div>
          <div className="ml-auto  w-fit">
            <Pagination
              pageCount={pagination?.totalPages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingProductMain;
