import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";

import Select from "react-select";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCrossCircled } from "react-icons/rx";

import toast from "react-hot-toast";
import { adminGetCategory } from "../../redux/Slice/categorySlice/categorySlice";
import { adminGetBrand } from "../../redux/Slice/brandSlice/brandSlice";
import { adminAddproduct, adminDeleteimages, adminGetProducts, adminUpdateproduct, deleteImages, getSingleProduct } from "../../redux/Slice/ProductSlice/ProductSlice";
import Loading from "../Share/Loading";

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const [categoryState, setCategoryState] = useState([]);
    const [brandState, setBrandState] = useState([]);
    const [files, setFiles] = useState([])
    const [type, setType] = useState([]);
    const [categoryId, setCategoryId] = useState("")
    const [brand, setbrand] = useState("")
    const { id } = useParams()
    const [images, setImages] = useState([])





    ///Sizes selection//
    const sizes = ["S", "M", "L", "XL", "XXL", "3XL", "40", "41", "42", "43", "44", "45", "8GB", "16GB", "256GB", "512GB", "27inche"]
    const [sizeOption, setSizeOption] = useState([])

    const handleSizeChange = (sizes) => {
        setSizeOption(sizes)
    }

    ///converted sizes///
    const sizeOptionsCoverted = sizes.map((size => {
        return {
            value: size,
            label: size
        }
    }))


    ///Sizes selection//
    const colors = ["red", "green", "black", "yellow", "white", "pink", "bottle green", "blue", "orange"]

    const [colorOption, setColorOption] = useState([])

    const handleColorChange = (colors) => {
        setColorOption(colors)
    }

    ///converted sizes///
    const colorOptionsCoverted = colors.map((color => {
        return {
            value: color,
            label: color
        }
    }))

    // Type option//
    const typeoption = [
        { value: "hot", label: "hot" },
        { value: "new", label: "new" },
        { value: "sale", label: "sale" },
        { value: "cool", label: "cool" },
    ];



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

    }, []);

    ///fetch all brands from database///
    const { loading, error } = useSelector((state) => state.products)
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

    ////Get specefic product by id////
    const { productDetails } = useSelector((state) => state.products)


    const [inputvalue, setInputvalue] = useState({
        productName: productDetails?.productName,
        price: productDetails?.price,
        discount: productDetails?.discount,
        quantity: productDetails?.quantity,
        description: productDetails?.description,
        brand,
        colors,
        sizes,

        type: productDetails?.type,


    });
    ///get input value//
    const handleChange = (e) => {
        const { name, value } = e.target;

        setInputvalue({ ...inputvalue, [name]: value });

    };

    ///get image file////
    const handleimgupload = (e) => {

        const newfiles = Array.from(e.target.files)

        setFiles(newfiles)

    }


    const handlesetCategory = (e) => {
        const { value } = e
        setCategoryId(value)

    }

    const handlesetBrand = (e) => {
        const { label } = e
        setbrand(label)

    }



    useEffect(() => {
        const data = {
            productid: id
        }
        dispatch(getSingleProduct(data))
    }, [id])



    useEffect(() => {
        if (productDetails) {
            setInputvalue({
                productName: productDetails.productName || "",
                price: productDetails.price || "",
                discount: productDetails.discount || "",
                quantity: productDetails.quantity || "",
                description: productDetails.description || "",
                brand: productDetails.brand || "",
                colors: productDetails.colors || [],
                sizes: productDetails.sizes || [],
                files: productDetails.files || [],
                type: productDetails.type || "",

            });
        }
    }, [productDetails]);



    const addproduct = (e) => {
        e.preventDefault();
        if (categoryId == "") {
            toast.error("enter product Category")
        }
        else {
            const config = {
                "Content-Type": "multipart/form-data"
            }
            dispatch(adminUpdateproduct({
                ...inputvalue,
                files,
                colors: colorOption?.map((color) => color.value),
                sizes: sizeOption?.map((size) => size.value),
                type: type.value ? type.value : productDetails.type,
                brand: brand ? brand : productDetails.brand,
                categoryId,
                config,
                id
            }))

        }








    };

    useEffect(() => {
        if (productDetails) {
            setImages(productDetails.images || []);
        }
    }, [productDetails]);





    const handleRemoveImage = (imageUrl, productId) => {
        const data = {
            imageUrl,
            productId
        }

        dispatch(deleteImages(data))

        // Update local state to reflect removed image
        setImages(images.filter(image => image !== imageUrl));
        toast.success("Image deleted successfully");
    };






    return (
        <div className="h-[650px] overflow-auto">
            <div className="overflow-x-hidden">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 ">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        {/* <img
              className="mx-auto h-[95px] w-auto"
              src={logo}
             
            /> */}
                        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Update Product
                        </h2>
                    </div>

                    <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST">
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="productName"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Product Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        value={inputvalue?.productName}
                                        name="productName"
                                        type="text"
                                        autoComplete="text"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {/* category */}
                            <div>
                                <label
                                    htmlFor=""
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Category
                                </label>
                                <div className="mt-2">
                                    <Select

                                        onChange={handlesetCategory}
                                        isSearchable={false}
                                        placeholder="Select a category"
                                        options={categoryState}
                                    />
                                </div>
                            </div>

                            {/* brand */}
                            <div>
                                <label
                                    htmlFor=""
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Brand
                                </label>
                                <div className="mt-2">
                                    <Select

                                        onChange={handlesetBrand}
                                        isSearchable={false}
                                        placeholder="---Select a Brand---"
                                        options={brandState}
                                    />
                                </div>
                            </div>











                            {/* Type */}
                            <div>
                                <label
                                    htmlFor="Type"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Type
                                </label>
                                <div className="mt-2">
                                    <Select

                                        value={type}
                                        onChange={setType}
                                        options={typeoption}
                                        isSearchable={false}
                                    />
                                </div>
                            </div>
                            {/* Color */}
                            <div>
                                <label
                                    htmlFor="Type"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Color
                                </label>
                                <div className="mt-2">
                                    <Select
                                        isMulti={true}
                                        isClearable={true}
                                        onChange={(item) => handleColorChange(item)}
                                        options={colorOptionsCoverted}
                                        isSearchable={false}
                                    />
                                </div>
                            </div>

                            {/* Sizes select */}
                            <div>
                                <label
                                    htmlFor="Type"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Sizes
                                </label>
                                <div className="mt-2">
                                    <Select
                                        isMulti={true}
                                        isClearable={true}
                                        placeholder="---Pls select sizes---"
                                        options={sizeOptionsCoverted}
                                        closeMenuOnSelect={false}
                                        isSearchable={false}
                                        onChange={(item) => handleSizeChange(item)}
                                    />
                                </div>
                            </div>

                            {/* discount */}
                            <div>
                                <label
                                    htmlFor="discount"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Discount
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        value={inputvalue?.discount}
                                        id="discount"
                                        name="discount"
                                        type="number"
                                        autoComplete="number"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            {/*  price*/}
                            <div>
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Price
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        value={inputvalue?.price}
                                        id="price"
                                        name="price"
                                        type="number"
                                        autoComplete="number"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>


                            </div>
                            {/* upload  photo */}

                            <div className="col-span-full">
                                <p className="mb-3">Edit images:</p>
                                <div className="flex items-center gap-3">

                                    {images?.map((image, index) => {
                                        return (

                                            <div key={index} className="flex flex-col items-center gap-2 relative mb-3 ">
                                                <img className="w-24 border-solid border-2 border-gray-950 " src={(image)} alt="" />
                                                <RxCrossCircled onClick={() => handleRemoveImage(image, productDetails._id)} className="absolute -top-3 left-10 text-red-950   cursor-pointer" size={20} />

                                            </div>

                                        )
                                    })}
                                </div>
                                <label
                                    // htmlFor="file-upload"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Upload Images
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <UserCircleIcon
                                        className="h-12 w-12 text-gray-300"
                                        aria-hidden="true"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        type="button"

                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                                    >
                                        Upload
                                    </label>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="cover-photo"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Upload photo
                                </label>

                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon
                                            className="mx-auto h-12 w-12 text-gray-300"
                                            aria-hidden="true"
                                        />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    required
                                                    onChange={handleimgupload}
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    multiple="multiple"
                                                    className="sr-only"
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* quantity */}
                            <div>
                                <label
                                    htmlFor="quantity"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Quantity
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        value={inputvalue?.quantity}
                                        id="quantity"
                                        name="quantity"
                                        type="number"
                                        autoComplete="number"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {/* description */}
                            <div className="col-span-full">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        onChange={handleChange}
                                        value={inputvalue?.description}
                                        id="description"
                                        name="description"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={""}
                                    />
                                </div>

                            </div>

                            {/* submit button */}
                            {
                                loading ? <Loading /> : <div>
                                    <button
                                        onClick={addproduct}
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Update Product
                                    </button>
                                </div>
                            }

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
