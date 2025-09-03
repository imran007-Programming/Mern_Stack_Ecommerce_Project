import { PhotoIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

import toast from 'react-hot-toast'
import { adminAddBanner } from '../../redux/Slice/bannerSlice/bannerSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Share/Loading'

const AddBannerImages = () => {

    const [files, setFiles] = useState([])
    const dispatch = useDispatch()

    const { loading, error } = useSelector((state) => state.banner)



    ///get image file////
    const handleimgupload = (e) => {

        const newfiles = Array.from(e.target.files)

        setFiles(newfiles)

    }


    const addproduct = (e) => {
        e.preventDefault();

        if (files == "") {
            toast.error("enter product images")
        }
        else {

            const config = {
                "Content-Type": "multipart/form-data"
            }
            dispatch(adminAddBanner({

                files,
                config
            })).then((res) => {
                if (res.payload) {
                    ///reset from data
                    setFiles("")
                    // window.location.reload()
                }
            }).catch((error) => {
                toast.error(error.message)
            })


        }




    };


    return (
        <div className=' flex flex-row items-center justify-center '>
            <div ><div className="col-span-full">
              <p className='text-2xl'>Upload Banner Images</p>
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

                {/* submit button */}
                {
                    loading ? <Loading /> : <div>
                        <button
                            onClick={addproduct}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Submit
                        </button>
                    </div>
                }

            </div>
        </div>
    )
}

export default AddBannerImages