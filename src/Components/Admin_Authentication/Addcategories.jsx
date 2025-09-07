import { PhotoIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { adminAddCategory } from "../../redux/Slice/categorySlice/categorySlice";
import Loading from "../Share/Loading";

const Addcategories = () => {
  const { loading } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [inputvalue, setInputvalue] = useState({
    categoryName: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputvalue({ ...inputvalue, [name]: value });
  };

  const handleimgupload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleDragOver = (e) => e.preventDefault();

  const removeImage = () => setFile(null);

  const addcategory = (e) => {
    e.preventDefault();
    const { categoryName, description } = inputvalue;

    if (!categoryName) {
      toast.error("Please enter a Category name");
    } else if (!description) {
      toast.error("Please enter a Description");
    } else if (!file) {
      toast.error("Please upload a Category image");
    } else {
      const formdata = new FormData();
      formdata.append("categoryName", categoryName);
      formdata.append("description", description);
      formdata.append("file", file);

      const config = { "Content-Type": "multipart/form-data" };
      dispatch(adminAddCategory({ formdata, config }))
        .then((res) => {
          if (res.payload) {
            setInputvalue({ categoryName: "", description: "" });
            setFile(null);
            toast.success("Category added successfully");
          }
        })
        .catch(() => {});
    }
  };

  return (
    <div className=" overflow-auto">
      <div className="flex min-h-full flex-1 flex-col justify-center ">
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Category
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
          <form className="space-y-6">
            {/* Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Name */}
              <div>
                <label
                  htmlFor="categoryName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category Name
                </label>
                <input
                  value={inputvalue.categoryName}
                  onChange={handleChange}
                  name="categoryName"
                  type="text"
                  autoComplete="off"
                  required
                  className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 
                             shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                             focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <textarea
                  value={inputvalue.description}
                  onChange={handleChange}
                  id="description"
                  name="description"
                  rows={1}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 
                             shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                             focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Upload Image - full width */}
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Upload photo
              </label>
              <div
                className="mt-2 flex justify-center items-center rounded-lg border border-dashed 
                           border-gray-900/25 px-6 py-10 cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {!file ? (
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-black 
                                   focus-within:outline-none focus-within:ring-2 focus-within:ring-black 
                                   focus-within:ring-offset-2 hover:text-gray-700"
                      >
                        <span>Upload a file</span>
                        <input
                          onChange={handleimgupload}
                          id="file-upload"
                          name="catimage"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                ) : (
                  <div className="relative w-40 h-40 border rounded-md overflow-hidden">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-1 right-1 bg-black text-white text-xs rounded-full p-1 opacity-70 hover:opacity-100"
                    >
                      ❌
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit button */}
            {loading ? (
              <Loading />
            ) : (
              <button
                onClick={addcategory}
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 
                           text-sm font-semibold leading-6 text-white shadow-sm 
                           hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 
                           focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                ADD CATEGORY
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addcategories;
