import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Select from "react-select";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCrossCircled } from "react-icons/rx";
import toast from "react-hot-toast";
import { adminGetCategory } from "../../redux/Slice/categorySlice/categorySlice";
import { adminGetBrand } from "../../redux/Slice/brandSlice/brandSlice";
import { adminUpdateproduct, deleteImages, getSingleProduct } from "../../redux/Slice/ProductSlice/ProductSlice";
import Loading from "../Share/Loading";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { CategoryData } = useSelector((state) => state.category);
  const { GetallBrand } = useSelector((state) => state.brand);
  const { productDetails, loading } = useSelector((state) => state.products);

  const [categoryState, setCategoryState] = useState([]);
  const [brandState, setBrandState] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [brand, setbrand] = useState("");
  const [type, setType] = useState([]);
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  const [inputvalue, setInputvalue] = useState({
    productName: "",
    price: "",
    discount: "",
    quantity: "",
    description: "",
  });

  // Options
  const sizes = ["S", "M", "L", "XL", "XXL", "40", "41", "42", "43", "44", "45"];
  const colors = ["red", "green", "black", "yellow", "white", "pink", "blue"];
  const typeoption = [
    { value: "hot", label: "Hot" },
    { value: "new", label: "New" },
    { value: "sale", label: "Sale" },
    { value: "cool", label: "Cool" },
  ];
  const sizeOptionsCoverted = sizes.map((s) => ({ value: s, label: s }));
  const colorOptionsCoverted = colors.map((c) => ({ value: c, label: c }));

  const [sizeOption, setSizeOption] = useState([]);
  const [colorOption, setColorOption] = useState([]);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputvalue({ ...inputvalue, [name]: value });
  };

  // Category & Brand
  const handlesetCategory = (e) => setCategoryId(e.value);
  const handlesetBrand = (e) => setbrand(e.label);

  // Image upload
  const handleimgupload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDragOver = (e) => e.preventDefault();

  // Remove images
  const handleRemoveImage = (imageUrl, productId) => {
    dispatch(deleteImages({ imageUrl, productId }));
    setImages(images.filter((image) => image !== imageUrl));
    toast.success("Image deleted successfully");
  };

  // Submit
  const addproduct = (e) => {
    e.preventDefault();
    if (!categoryId) return toast.error("Please select a category");

    const config = { "Content-Type": "multipart/form-data" };
    dispatch(
      adminUpdateproduct({
        ...inputvalue,
        files,
        colors: colorOption.map((c) => c.value),
        sizes: sizeOption.map((s) => s.value),
        type: type.value ? type.value : productDetails.type,
        brand: brand ? brand : productDetails.brand,
        categoryId,
        config,
        id,
      })
    );
  };

  // Fetch categories & brands
  useEffect(() => {
    dispatch(adminGetCategory());
    dispatch(adminGetBrand());
  }, [dispatch]);

  useEffect(() => {
    setCategoryState(CategoryData.map((c) => ({ value: c._id, label: c.categoryName })));
  }, [CategoryData]);

  useEffect(() => {
    setBrandState(GetallBrand.map((b) => ({ value: b._id, label: b.name })));
  }, [GetallBrand]);

  // Get product details
  useEffect(() => {
    dispatch(getSingleProduct({ productid: id }));
  }, [id]);

  useEffect(() => {
    if (productDetails) {
      setInputvalue({
        productName: productDetails.productName || "",
        price: productDetails.price || "",
        discount: productDetails.discount || "",
        quantity: productDetails.quantity || "",
        description: productDetails.description || "",
      });
      setImages(productDetails.images || []);
    }
  }, [productDetails]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-center text-2xl font-bold mb-6">Update Product</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={addproduct}>
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-900">Product Name</label>
          <input
            onChange={handleChange}
            value={inputvalue.productName}
            name="productName"
            type="text"
            required
            className="mt-2 block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-900">Category</label>
          <Select onChange={handlesetCategory} placeholder="Select category" options={categoryState} />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-900">Brand</label>
          <Select onChange={handlesetBrand} placeholder="Select brand" options={brandState} />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-900">Type</label>
          <Select value={type} onChange={setType} options={typeoption} />
        </div>

        {/* Discount */}
        <div>
          <label className="block text-sm font-medium text-gray-900">Discount</label>
          <input
            onChange={handleChange}
            value={inputvalue.discount}
            name="discount"
            type="number"
            className="mt-2 block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-900">Price</label>
          <input
            onChange={handleChange}
            value={inputvalue.price}
            name="price"
            type="number"
            className="mt-2 block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-900">Quantity</label>
          <input
            onChange={handleChange}
            value={inputvalue.quantity}
            name="quantity"
            type="number"
            className="mt-2 block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm"
          />
        </div>

        {/* Sizes */}
        <div>
          <label className="block text-sm font-medium text-gray-900">Sizes</label>
          <Select isMulti options={sizeOptionsCoverted} onChange={setSizeOption} />
        </div>

        {/* Colors */}
        <div>
          <label className="block text-sm font-medium text-gray-900">Colors</label>
          <Select isMulti options={colorOptionsCoverted} onChange={setColorOption} />
        </div>

        {/* Description (Full width) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-900">Description</label>
          <textarea
            onChange={handleChange}
            value={inputvalue.description}
            name="description"
            rows={3}
            className="mt-2 block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm"
          />
        </div>

        {/* Existing Images */}
        <div className="md:col-span-2">
          <p className="mb-2 font-medium">Existing Images</p>
          <div className="flex flex-wrap gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt="" className="w-24 h-24 object-cover border rounded" />
                <RxCrossCircled
                  onClick={() => handleRemoveImage(image, productDetails._id)}
                  className="absolute -top-2 -right-2 text-red-600 cursor-pointer"
                  size={20}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Drag & Drop Upload */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="md:col-span-2 border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer"
        >
          <PhotoIcon className="h-12 w-12 text-gray-400" />
          <p className="text-gray-600 text-sm mt-2">Drag & drop images here or click to upload</p>
          <input type="file" multiple className="hidden" id="file-upload" onChange={handleimgupload} />
          <label htmlFor="file-upload" className="mt-2 px-4 py-2 bg-black text-white rounded cursor-pointer">
            Browse Files
          </label>

          {/* Preview newly added images */}
        {/* Preview newly added images */}
<div className="flex flex-wrap gap-4 mt-4">
  {files.map((file, index) => (
    <div key={index} className="relative">
      <img
        src={URL.createObjectURL(file)}
        alt="preview"
        className="w-24 h-24 object-cover border rounded"
      />
      <RxCrossCircled
        onClick={() => setFiles(files.filter((_, i) => i !== index))}
        className="absolute -top-2 -right-2 text-red-600 cursor-pointer"
        size={20}
      />
    </div>
  ))}
</div>

        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          {loading ? (
            <Loading />
          ) : (
            <button type="submit" className="w-full py-3 rounded-md bg-black text-white font-semibold hover:bg-gray-800">
              Update Product
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
