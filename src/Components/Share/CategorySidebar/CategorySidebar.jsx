import React, { useEffect, useRef, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { CiFilter } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import "./CategorySidebar.scss";
import { resetfilterProducts } from "../../../redux/Slice/ProductSlice/ProductSlice";
import { adminGetCategory } from "../../../redux/Slice/categorySlice/categorySlice";

const CategorySidebar = (props) => {
  const [value, setValue] = useState([6, 3000]);
  const [brand, setBrand] = useState([]);
  const [params] = useSearchParams();
  const categoryid = params.get("categoryId");
  const filterRef = useRef();
  const [filteropen, setFilterOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [sizes, setSizes] = useState([]);
  const { CategoryData } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [isResetEnabled, setIsResetEnabled] = useState(false);

  useEffect(() => {
    if (
      selectedBrand ||
      selectedSize ||
      (value[0] !== 6 && value[1] !== 3000)
    ) {
      setIsResetEnabled(true);
    } else {
      setIsResetEnabled(false);
    }
  }, [selectedBrand, selectedSize, value]);

  useEffect(() => {
    dispatch(adminGetCategory());
  }, [dispatch]);

  useEffect(() => {
    if (CategoryData.length > 0) {
      if (categoryid) {
        // ✅ Category-wise filter
        const filtercategory = CategoryData.find(
          (cat) => cat._id === categoryid
        );

        const uniqueBrandArray = filtercategory?.brands?.filter(
          (brand, index, self) => self.findIndex((b) => b === brand) === index
        );
        setBrand(uniqueBrandArray || []);

        setSizes(
          filtercategory?.products?.reduce((acc, curr) => {
            curr.sizes.forEach((size) => {
              if (!acc.includes(size)) acc.push(size);
            });
            return acc;
          }, []) || []
        );
      } else {
        // ✅ All Products page → collect from ALL categories
        const allBrands = CategoryData.flatMap((cat) => cat.brands || []);
        const uniqueBrands = [...new Set(allBrands)];
        setBrand(uniqueBrands);

        const allSizes = CategoryData.flatMap((cat) =>
          cat.products?.flatMap((p) => p.sizes || [])
        );
        const uniqueSizes = [...new Set(allSizes)];
        setSizes(uniqueSizes);
      }
    }
  }, [categoryid, CategoryData]);

  useEffect(() => {
    props.filterByPrice(value[0], value[1]);
  }, [value]);

  const filterByBrand = (keyword) => {
    props.filterByBrand(keyword);
    setSelectedBrand(keyword);
  };

  const filterBySize = (keyword) => {
    props.filterBySize(keyword);
    setSelectedSize(keyword);
  };

  const handlereset = () => {
    const data = { categoryId: categoryid };
    setFilterOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(resetfilterProducts(data)).then(() => {
      setSelectedBrand("");
      setSelectedSize("");
      setValue([6, 3000]);
      props.filterByPrice(6, 3000);
      props.filterByBrand("");
      props.filterBySize("");
    });
  };

  //// close filter menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!filterRef?.current?.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handler, true);
    return () => {
      document.removeEventListener("mousedown", handler, true);
    };
  }, []);

  return (
    <>
      {/* Sidebar for large screens */}
      <div className="container mx-auto px-6 hidden md:block">
        {/* Filter by category */}
        <div className="bg-white shadow-md rounded-xl p-4 mb-6">
          <h3 className="text-xl font-semibold mb-3">Filter By Categories</h3>
          <div className="space-y-2">
            {props?.CategoryData?.map((el) => (
              <Link key={el._id} to={`/allproducts?categoryId=${el._id}`}>
                <div className="flex items-center justify-between hover:bg-gray-100 px-2 py-1 rounded-md">
                  <h2 className="text-gray-700">{el.categoryName}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Filter by Price */}
        <div className="bg-white shadow-md rounded-xl p-4 mb-6">
          <h3 className="text-xl font-semibold mb-3">Filter By Price</h3>
          <RangeSlider
            value={value}
            onInput={setValue}
            min={6}
            max={3000}
            step={10}
            className="custom-slider w-full "
          />
          <div className="flex justify-between mt-2 text-gray-700">
            <span>
              <strong>From:</strong> ${value[0]}
            </span>
            <span>
              <strong>To:</strong> ${value[1]}
            </span>
          </div>
        </div>

        {/* Filter by Brand */}
        <div className="bg-white shadow-md rounded-xl p-4 mb-6">
          <h3 className="text-xl font-semibold mb-3">Filter By Brands</h3>
          <RadioGroup
            value={selectedBrand}
            onChange={(e) => filterByBrand(e.target.value)}
          >
            {brand?.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item}
                control={<Radio />}
                label={item}
              />
            ))}
          </RadioGroup>
        </div>

        {/* Filter by Sizes */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-xl font-semibold mb-3">Filter By Sizes</h3>
          <RadioGroup
            value={selectedSize}
            onChange={(e) => filterBySize(e.target.value)}
          >
            {sizes?.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item}
                control={<Radio />}
                label={item}
              />
            ))}
          </RadioGroup>
          <button
            onClick={handlereset}
            disabled={!isResetEnabled}
            className={`mt-3 w-full px-4 py-2 border rounded-md transition 
              ${
                isResetEnabled
                  ? "text-white bg-black hover:bg-gray-800"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
          >
            Reset All Filters
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden block ">
        <div className="flex items-center justify-between mt-6 px-4 ">
          <Select
            className="w-48 z-20!"
            placeholder="Sort by"
            defaultValue={props.selectedOption}
            onChange={props.setSelectedOption}
            options={props.options}
            isSearchable={false}
          />
          <div
            onClick={() => setFilterOpen(!filteropen)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <CiFilter size={24} />
            <span className="text-gray-700 font-medium">Filters</span>
          </div>
        </div>

        {/* Drawer + Overlay (always mounted) */}
        <div
          className={`fixed inset-0 z-50 ${
            filteropen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-700 ${
              filteropen ? "opacity-50" : "opacity-0"
            }`}
            onClick={() => setFilterOpen(false)}
          />

          {/* Drawer */}
          <div
            ref={filterRef}
            className={`absolute right-0 top-0 h-full w-3/4 max-w-sm bg-white shadow-xl overflow-y-auto transform-gpu will-change-transform
                transition-transform duration-700 ease-in-out
                ${filteropen ? "translate-x-0" : "translate-x-full"}`}
          >
            {/* Header */}
            <div className=" sticky top-0 bg-white z-10 flex justify-between items-center border-b p-4">
              <h1 className="text-lg font-semibold">Filters</h1>
              <RxCross1
                className="cursor-pointer"
                size={22}
                onClick={() => setFilterOpen(false)}
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="space-y-2 mb-6">
                {props?.CategoryData?.map((el) => (
                  <Link key={el._id} to={`/allproducts?categoryId=${el._id}`}>
                    <div className="flex items-center justify-between hover:bg-gray-100 px-2 py-1 rounded-md">
                      <h2 className="text-gray-700">{el.categoryName}</h2>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Price */}
              <div className="bg-white shadow-md rounded-xl p-4 mb-6">
                <h3 className="text-xl font-semibold mb-3">Filter By Price</h3>
                <RangeSlider
            value={value}
            onInput={setValue}
            min={6}
            max={3000}
            step={10}
            className="custom-slider w-full "
          />
                <div className="flex justify-between mt-2 text-gray-700">
                  <span>
                    <strong>From:</strong> ${value[0]}
                  </span>
                  <span>
                    <strong>To:</strong> ${value[1]}
                  </span>
                </div>
              </div>

              {/* Brand */}
              <div className="bg-white shadow-md rounded-xl p-4 mb-6">
                <h3 className="text-xl font-semibold mb-3">Filter By Brands</h3>
                <RadioGroup
                  value={selectedBrand}
                  onChange={(e) => filterByBrand(e.target.value)}
                >
                  {brand?.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item}
                      control={<Radio />}
                      label={item}
                    />
                  ))}
                </RadioGroup>
              </div>

              {/* Sizes */}
              <div className="bg-white shadow-md rounded-xl p-4">
                <h3 className="text-xl font-semibold mb-3">Filter By Sizes</h3>
                <RadioGroup
                  value={selectedSize}
                  onChange={(e) => filterBySize(e.target.value)}
                >
                  {sizes?.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item}
                      control={<Radio />}
                      label={item}
                    />
                  ))}
                </RadioGroup>
                <button
                  onClick={handlereset}
                  disabled={!isResetEnabled}
                  className={`mt-3 w-full px-4 py-2 border rounded-md transition
            ${
              isResetEnabled
                ? "text-white bg-black hover:bg-gray-800"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySidebar;
