import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Select from "react-select";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { adminGetCategory } from "../../redux/Slice/categorySlice/categorySlice";
import { adminGetBrand } from "../../redux/Slice/brandSlice/brandSlice";
import { adminAddproduct } from "../../redux/Slice/ProductSlice/ProductSlice";
import Loading from "../Share/Loading";

const Addproducts = () => {
  const dispatch = useDispatch();
  const [categoryState, setCategoryState] = useState([]);
  const [brandState, setBrandState] = useState([]);

  const [files, setFiles] = useState([]);
  const [type, setType] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [brand, setbrand] = useState("");

  const [inputvalue, setInputvalue] = useState({
    productName: "",
    price: "",
    discount: "",
    quantity: "",
    description: "",
    brand: "",
    colors: "",
    sizes: "",
    files: "",
    type: "",
  });
  console.log(inputvalue);

  ///Sizes selection//
  const sizes = [
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "3XL",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "8GB",
    "16GB",
    "256GB",
    "512GB",
    "27inche",
  ];
  const [sizeOption, setSizeOption] = useState([]);

  const handleSizeChange = (sizes) => {
    setSizeOption(sizes);
  };

  ///converted sizes///
  const sizeOptionsCoverted = sizes.map((size) => {
    return {
      value: size,
      label: size,
    };
  });

  ///Sizes selection//
  const colors = [
    "red",
    "green",
    "black",
    "yellow",
    "white",
    "pink",
    "bottle green",
    "blue",
    "orange",
  ];

  const [colorOption, setColorOption] = useState([]);

  const handleColorChange = (colors) => {
    setColorOption(colors);
  };

  ///converted sizes///
  const colorOptionsCoverted = colors.map((color) => {
    return {
      value: color,
      label: color,
    };
  });

  ///fetch all category from database//
  const { CategoryData } = useSelector((state) => state.category);
  useEffect(() => {
    let array = [];
    for (let i = 0; i < CategoryData.length; i++) {
      let newcatarry = {
        value: CategoryData[i]._id,
        label: CategoryData[i].categoryName,
      };
      array.push(newcatarry);
    }
    setCategoryState(array);
  }, [CategoryData]);

  useEffect(() => {
    dispatch(adminGetCategory());
  }, [dispatch]);

  ///fetch all brands from database///
  const { loading, error } = useSelector((state) => state.products);
  const { GetallBrand } = useSelector((state) => state.brand);
  useEffect(() => {
    let array = [];
    for (let i = 0; i < GetallBrand.length; i++) {
      let newbrandarry = {
        value: GetallBrand[i]._id,
        label: GetallBrand[i].name,
      };
      array.push(newbrandarry);
    }
    setBrandState(array);
  }, [GetallBrand]);

  useEffect(() => {
    dispatch(adminGetBrand());
  }, [dispatch]);

  // Type option//
  const typeoption = [
    { value: "hot", label: "hot" },
    { value: "new", label: "new" },
    { value: "sale", label: "sale" },
    { value: "cool", label: "cool" },
  ];

  ///get input value//
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputvalue({ ...inputvalue, [name]: value });
  };

  ///get image file////
  const handleimgupload = (e) => {
    const newfiles = Array.from(e.target.files);

    setFiles(newfiles);
  };

  const handlesetCategory = (e) => {
    const { value } = e;
    setCategoryId(value);
  };

  const handlesetBrand = (e) => {
    const { label } = e;
    setbrand(label);
  };

  const addproduct = (e) => {
    e.preventDefault();
    const { productName, price, discount, quantity, description } = inputvalue;

    if (productName === "") {
      toast.error("enter a ProductName");
    } else if (categoryId === "") {
      toast.error("enter product Category");
    } else if (type === "") {
      toast.error("enter product type");
    } else if (colors === "") {
      toast.error("enter product color");
    }
    // else if (sizeOption == "") {
    //   toast.error("enter product sizes")
    // }
    else if (brand === "") {
      toast.error("enter product brand");
    } else if (colorOption == "") {
      toast.error("enter product brand");
    } else if (discount === "") {
      toast.error("enter product discount");
    } else if (price === "") {
      toast.error("enter product price");
    } else if (files === "") {
      toast.error("enter product images");
    } else if (quantity === "") {
      toast.error("enter product quantity");
    } else if (description === "") {
      toast.error("enter product description");
    } else {
      const config = {
        "Content-Type": "multipart/form-data",
      };
      dispatch(
        adminAddproduct({
          ...inputvalue,
          files,
          colors: colorOption?.map((color) => color.value),
          sizes: sizeOption?.map((size) => size.value),
          type: type.value,
          brand,
          categoryId,
          config,
        })
      )
        .then((res) => {
          if (res.payload) {
            ///reset from data
            // setInputvalue({
            //   productName: "",
            //   price: "",
            //   discount: "",
            //   quantity: "",
            //   description: "",
            //   brand: "",
            //   colors: "",
            //   sizes: "",
            //   files: "",
            //   type: "",
            // });
            setCategoryId("");
            // window.location.reload()
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  return (
    <div className="min-h-screen overflow-auto">
      <div className="overflow-x-hidden">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
              className="mx-auto h-[95px] w-auto"
              src={logo}
             
            /> */}
            <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Add Products
            </h2>
          </div>

          <div className="mx-5">
            <form className="grid grid-cols-2 gap-6" action="#" method="POST">
              {/* Product Name */}
              <div className="col-span-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Product Name
                </label>
                <input
                  onChange={handleChange}
                  value={inputvalue.productName}
                  name="productName"
                  type="text"
                  required
                  className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              {/* Category */}
              <div className="col-span-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Category
                </label>
                <Select
                  onChange={handlesetCategory}
                  placeholder="Select a category"
                  options={categoryState}
                  className="mt-2"
                />
              </div>

              {/* Brand */}
              <div className="col-span-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Brand
                </label>
                <Select
                  onChange={handlesetBrand}
                  placeholder="Select a brand"
                  options={brandState}
                  className="mt-2"
                />
              </div>

              {/* Type */}
              <div className="col-span-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Type
                </label>
                <Select
                  value={type}
                  onChange={setType}
                  options={typeoption}
                  className="mt-2"
                />
              </div>

              {/* Colors */}
              <div className="col-span-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Colors
                </label>
                <Select
                  isMulti
                  onChange={handleColorChange}
                  options={colorOptionsCoverted}
                  className="mt-2"
                />
              </div>

              {/* Sizes */}
              <div className="col-span-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Sizes
                </label>
                <Select
                  isMulti
                  options={sizeOptionsCoverted}
                  closeMenuOnSelect={false}
                  onChange={handleSizeChange}
                  className="mt-2"
                />
              </div>

              {/* Discount */}
              <div className="col-span-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Discount
                </label>
                <input
                  onChange={handleChange}
                  value={inputvalue.discount}
                  name="discount"
                  type="number"
                  className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              {/* Price */}
              <div className="col-span-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Price
                </label>
                <input
                  onChange={handleChange}
                  value={inputvalue.price}
                  name="price"
                  type="number"
                  className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              {/* Quantity */}
              <div className="col-span-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Quantity
                </label>
                <input
                  onChange={handleChange}
                  value={inputvalue.quantity}
                  name="quantity"
                  type="number"
                  className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              {/* Upload Images */}
              <div className="col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Upload Images
                </label>
                <input
                  onChange={handleimgupload}
                  type="file"
                  multiple
                  className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm sm:text-sm"
                />
              </div>

              {/* Description (make it full width row) */}
              <div className="col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <textarea
                  onChange={handleChange}
                  value={inputvalue.description}
                  name="description"
                  rows={3}
                  className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm sm:text-sm"
                />
              </div>

              {/* Submit Button (center full row) */}
              <div className="col-span-2">
                <button
                  onClick={addproduct}
                  type="submit"
                  className=" rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addproducts;
