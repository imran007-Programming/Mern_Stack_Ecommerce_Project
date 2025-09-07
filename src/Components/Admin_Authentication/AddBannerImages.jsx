import { PhotoIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { adminAddBanner } from "../../redux/Slice/bannerSlice/bannerSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Share/Loading";

const AddBannerImages = () => {
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.banner);

  /// Handle file selection
  const handleimgupload = (e) => {
    const newfiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newfiles]); // allow multiple adds
  };

  /// Handle drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  /// Remove single image
  const removeImage = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const addproduct = (e) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("Please upload at least one image");
    } else {
      const config = {
        "Content-Type": "multipart/form-data",
      };

      dispatch(adminAddBanner({ files, config }))
        .then((res) => {
          if (res.payload) {
            setFiles([]);
            toast.success("Banner uploaded successfully");
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
      <p className="text-2xl mb-4">Upload Banner Images</p>

      {/* Upload Box */}
      <div
        className="mt-2 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 w-full cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="text-center w-full">
          {files.length === 0 ? (
            <>
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 hover:text-gray-700"
                >
                  <span>Upload a file</span>
                  <input
                    required
                    onChange={handleimgupload}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    multiple
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </>
          ) : (
            // Preview Images with remove button
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="relative w-24 h-24 group border rounded-md overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-black text-white text-xs rounded-full p-1 opacity-70 hover:opacity-100"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submit button */}
      <div className="mt-6 w-full">
        {loading ? (
          <Loading />
        ) : (
          <button
            onClick={addproduct}
            type="submit"
            className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default AddBannerImages;
