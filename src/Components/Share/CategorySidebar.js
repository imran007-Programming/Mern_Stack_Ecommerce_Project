import React, { useEffect, useRef, useState } from "react";
import "./CategorySidebar.scss";
import { data } from "../../product";
import Slider from "@mui/material/Slider";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import { Button, FormGroup } from "@mui/material";
import { CiFilter } from "react-icons/ci";
import { Link, useParams, useSearchParams } from "react-router-dom";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FaFilter } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import {
  adminGetBrand,
  filterProducts,
  resetfilterProducts,
} from "../../redux/Slice/ProductSlice/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { adminGetCategory } from "../../redux/Slice/categorySlice/categorySlice";
import Select from "react-select";


const CategorySidebar = (props) => {
  const [value, setValue] = useState([6, 3000]);
  const [brand, setBrand] = useState([]);
  const [params, setParams] = useSearchParams();
  const categoryid = params.get("categoryId");
  const filterRef = useRef();
  const [filteropen, setFilterOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [sizes, setSizes] = useState([]);
  const { filterproducts, loading } = useSelector(state => state.products);
  const [isResetEnabled, setIsResetEnabled] = useState(false);
 


  useEffect(() => {
    if (selectedBrand || selectedSize || (value[0] !== 6 && value[1] !== 3000)) {
      setIsResetEnabled(true);
    } else {
      setIsResetEnabled(false);
    }
  }, [selectedBrand, selectedSize, value]);







  function valuetext(value) {
    return value;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  ///Get category from database//
  const dispatch = useDispatch();
  const { CategoryData } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(adminGetCategory());
  }, [dispatch]);

  useEffect(() => {
    if (CategoryData.length > 0 && categoryid) {
      const filtercategory = CategoryData.find(
        (category) => category._id === categoryid
      );
      const uniqueBrandArray = filtercategory?.brands?.filter(
        (brand, index, self) => self.findIndex((b) => b === brand) === index
      );
      setBrand(uniqueBrandArray);
      setSizes(
        filtercategory?.products?.reduce((acc, curr) => {
        
          curr.sizes.forEach((size) => {
            if (!acc.includes(size)) {
              acc.push(size);
            }
          });
          return acc;
        }, [])
      );
    } else {
      setBrand([]);
      setSizes([]);
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
    const data = {
      categoryId: categoryid,
    };
    setFilterOpen(!filteropen)
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

  ////click outside to close filter menu//
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
      <div className="hidden md:block">
        {/* filter for large device */}
        {/* Filter by category */}
        <div className="sidebarCard">
          <h3 className="text-2xl font-[600]">Filter By Categories</h3>
          <div className="h_line"></div>
          <div className="cat-list">
            <div className="all-cat flex flex-col">
              {props?.CategoryData?.length !== 0 &&
                props?.CategoryData?.map((el, index) => {
                  return (
                    <Link to={`/products-filter?categoryId=${el._id}`}>
                      <div className="flex items-center">
                        <h2>{el.categoryName} </h2>
                        {/* <span className="ml-auto">{alldata.length}</span> */}
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
        {/* Filter by Price */}
        <div className="sidebarCard mt-6">
          <h3 className="text-2xl font-[600]">Filter By Price</h3>
          <hr />

          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={6} // Set the minimum value
            max={3000}
            color="black"
          />

          <div className="range flex justify-between items-center ">
            <p>
              <strong className="text-[black]">from:</strong>${value[0]}
            </p>
            <p>
              {" "}
              <strong className="text-[black]">to:</strong>${value[1]}
            </p>
          </div>
          {/* Filter by brand */}
          <div className="filters">
            <h5 className="text-2xl font-[600]">Filters by Brands</h5>

            <div className="filter_color">
              <div className="flex items-center">
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={selectedBrand}
                  onChange={(e) => filterByBrand(e.target.value)}
                  name="radio-buttons-group"
                >
                  {brand?.length !== 0 &&
                    brand?.map((item, index) => {
                      return (
                        <FormControlLabel
                          key={index}
                          value={item}
                          control={<Radio />}
                          label={item}
                        />
                      );
                    })}
                </RadioGroup>
              </div>
            </div>

            {/* filter by size */}

            <div>
              <h5 className="text-2xl font-[600]">Filters by Sizes</h5>
              <div className="filter_Size">
                <div className="flex items-center">
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={selectedSize}
                    onChange={(e) => filterBySize(e.target.value)}
                  >
                    {sizes.length !== 0 &&
                      sizes.map((item, index) => {
                        return (
                          <FormControlLabel
                            value={item}
                            key={index}
                            control={<Radio />}
                            label={item}
                          />
                        );
                      })}
                  </RadioGroup>
                </div>
                <button onClick={handlereset}  
                disabled={!isResetEnabled} className="btn btn-outline rounded-none">
                  Reset All FIlter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter for small device*/}
      </div>

      <div>
        <div className="md:hidden block">
          <div className="flex items-center justify-items-end mt-7 cursor-pointer">
            {/* Place Select on the left side */}
            <div className="">
              <Select
                className="w-64 mr-auto "
                placeholder={`sort by`}
                defaultValue={props.selectedOption}
                onChange={props.setSelectedOption}
                options={props.options}
                isSearchable={false}
              />
            </div>

            {/* Place Filter icon on the right side */}
            <div
              onClick={() => setFilterOpen(!filteropen)}
              className="flex items-center justify-between "
            >
              <CiFilter className="" size={30} />
              <span>Filters</span>
            </div>
          </div>

          <div
            className={`top-0 right-0 fixed z-50  ${
              filteropen ? "bg-[rgba(0,0,0,.8)] w-full h-screen" : null
            }`}
          >
            <div
              className={`${
                filteropen ? " translate-x-0" : " translate-x-full"
              } fixed -right-2 w-3/4 bg-white z-50 h-screen shadow-lg  duration-1000 ease-out`}
            >
              <div className="md:hidden block">
                {filteropen ? (
                  <div className="">
                    <div className="filter fixed top-0 left-0 w-full  h-screen ">
                      <div
                        ref={filterRef}
                        className={`filter1 overflow-y-auto z-2 fixed left-auto  top-0 h-[100%] right-0 w-[400px] max-w-[420px] bg-white shadow-xl`}
                      >
                        <div className="w-full flex justify-between border-b-2 border-dark-500 p-3 items-center mt-6">
                          <h1 className="text-xl text-center">Filters</h1>
                          <RxCross1
                            className="cursor-pointer"
                            onClick={() => setFilterOpen(!filteropen)}
                            size={23}
                          />
                        </div>
                        <div>
                          {/* filter by category */}
                          <div className="sidebarCard">
                            <h3 className="text-2xl font-[600]">
                              Filter By Categories
                            </h3>
                            <div className="h_line"></div>
                            <div className="cat-list">
                              <div className="all-cat flex flex-col">
                                {props.CategoryData.length !== 0 &&
                                  props.CategoryData.map((el, index) => {
                                    return (
                                      <Link
                                        onClick={() => setFilterOpen(false)}
                                        to={`/products-filter?categoryId=${el._id}`}
                                      >
                                        <div className="flex items-center">
                                          <h2>{el.categoryName} </h2>
                                          {/* <span className="ml-auto">{alldata.length}</span> */}
                                        </div>
                                      </Link>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                          {/* Filter by Price */}
                          <div className="sidebarCard mt-6">
                            <h3 className="text-2xl font-[600]">
                              Filter By Price
                            </h3>
                            <hr />

                            <RangeSlider
                              value={value}
                              onInput={setValue}
                              min={0}
                              max={3000}
                              step={1}
                              className="my-3 bg-[black]"
                              id="Rangeslider"
                            />

                            <div className="range flex justify-between items-center ">
                              <p>
                                <strong className="text-[black]">from:</strong>$
                                {value[0]}
                              </p>
                              <p>
                                {" "}
                                <strong className="text-[black]">from:</strong>$
                                {value[1]}
                              </p>
                            </div>
                            {/* Filter by brand */}
                            <div className="filters">
                              <h5 className="text-2xl font-[600]">
                                Filters by Brands
                              </h5>

                              <div className="filter_color">
                                <div className="flex items-center">
                                  <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    value={selectedBrand}
                                    onChange={(e) =>
                                      filterByBrand(e.target.value)
                                    }
                                    name="radio-buttons-group"
                                  >
                                    {brand?.length !== 0 &&
                                      brand?.map((item, index) => {
                                        return (
                                          <FormControlLabel
                                            key={index}
                                            value={item}
                                            control={<Radio />}
                                            label={item}
                                            onClick={()=>setFilterOpen(!filteropen)}
                                          />
                                        );
                                      })}
                                  </RadioGroup>
                                </div>
                              </div>

                              {/* filter by size */}

                              <div>
                                <h5 className="text-2xl font-[600]">
                                  Filters by Sizes
                                </h5>
                                <div className="filter_Size">
                                  <div className="flex items-center">
                                    <RadioGroup
                                      aria-labelledby="demo-radio-buttons-group-label"
                                      name="radio-buttons-group"
                                      value={selectedSize}
                                     
                                      onChange={(e) =>
                                        filterBySize(e.target.value)
                                      }
                                    >
                                      {sizes.length !== 0 &&
                                        sizes.map((item, index) => {
                                          return (
                                            <FormControlLabel
                                              value={item}
                                              key={index}
                                              control={<Radio />}
                                              label={item}
                                              onClick={()=>setFilterOpen(!filteropen)}
                                            />
                                          );
                                        })}
                                    </RadioGroup>
                                  </div>

                                  <button
                                    onClick={handlereset}
                                    className="btn btn-outline rounded-none"
                                    disabled={!isResetEnabled}
                                  >
                                    Reset All FIlter
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySidebar;
