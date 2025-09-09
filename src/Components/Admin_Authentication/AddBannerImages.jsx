import { PhotoIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  adminAddBanner,
  deleteBannerImages,
  GetBanner,
} from "../../redux/Slice/bannerSlice/bannerSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Share/Loading";

const AddBannerImages = () => {
  const [files, setFiles] = useState([]);
  const [isloadingId, setIsLoadingId] = useState("");
  const [isloading,setIsLoading]=useState(false)

  const dispatch = useDispatch();
  const { GetBannerImages, loading } = useSelector((state) => state.banner);

  

  useEffect(() => {
    dispatch(GetBanner());
  }, [dispatch]);

  /// Handle file selection
  const handleimgupload = (e) => {
    const newfiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newfiles]);
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

  const addproduct = async(e) => {
   
    e.preventDefault();

    if (files.length === 0) {
      toast.error("Please upload at least one image");
    } else {
      const config = {
        "Content-Type": "multipart/form-data",
      };

      try {
         setIsLoading(true)
       const res=await dispatch(adminAddBanner({ files, config }))
       if (res.payload) {
            dispatch(GetBanner());
            setFiles([]);
            toast.success("Banner uploaded successfully");
           
          }

      } catch (error) {
         toast.error(error.message);
      }finally{
         setIsLoading(false)
      }

      
      
    }
  };

  /* Delete Banner Images */
  const handleDelteBannerImages = async (url, id) => {
     setIsLoadingId(url);
    const data = {
      bannerId: id,
      imageUrl: url,
    };

    try {
     
      const res = await dispatch(deleteBannerImages(data));
       await dispatch(GetBanner())
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingId(null);
    }
    
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
      <p className="text-2xl mb-4">Upload Banner Images</p>

      <div className="flex flex-wrap gap-6">
        {GetBannerImages?.flatMap((img) =>
          img.images.map((el, index) => (
            <React.Fragment key={`${img._id}-${index}`}>
              {isloadingId === el ? (
                <Loading />
              ) : (
                <div className="flex relative">
                  <img className=" w-40 h-30 rounded-xl" src={el} />
                  <div
                    onClick={() => {
                      handleDelteBannerImages(el, img._id);
                    }}
                    className="bg-black flex justify-center items-center rounded-2xl w-4 h-4  p-3 absolute -right-3 -top-3 cursor-pointer"
                  >
                    <span className="">❌</span>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))
        )}
      </div>

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
      <div className="my-6 w-full">
        <button
            disabled={isloading}
            onClick={addproduct}
            type="submit"
            className={`flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${!files.length?'bg-gray-400':"bg-black"}`}
          >
           {isloading?<Loading/>: "Submit"}
          </button>
      </div>
    </div>
  );
};

export default AddBannerImages;
