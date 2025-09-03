import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import Select from 'react-select';
import { Link } from 'react-router-dom'
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { adminAddCategory } from '../../redux/Slice/categorySlice/categorySlice';
import Loading from '../Share/Loading';


const Addcategories = () => {
  const { loading, error } = useSelector((state) => state.category)

  const dispatch = useDispatch()
  const [file, setFile] = useState("")
  const [inputvalue, setInputvalue] = useState({
    categoryName: "",
    description: "",

  })


  const handleChange = (e) => {
    const { name, value } = e.target



    setInputvalue({ ...inputvalue, [name]: value })
   
  }



  const handleimgupload = (e) => {
    setFile(e.target.files[0]);
   
  }



  const addcategory = (e) => {
    e.preventDefault()

    const { categoryName, description } = inputvalue

    if (categoryName == "") {
      toast.error("please enter a Categoryname")
    } else if (description == "") {
      toast.error("please enter a Description")
    }
    else if (file == "") {
      toast.error("please upload a Category image")
    }



    else {
      const formdata = new FormData()
      formdata.append("categoryName", categoryName)
      formdata.append("description", description)
      formdata.append("file", file)

      const config = {
        "Content-Type": "multipart/form-data"
      }
      const datasend = {
        formdata,
        config
      }

      dispatch(adminAddCategory(datasend)).then((res) => {
        if (res.payload) {
          setInputvalue({
            ...inputvalue,
            categoryName: "",
            description: "",

          })
          setFile("")
        }
      }).catch((error) => {
       
      })



    }
  }






  return (
    <div> <div className='h-[650px] overflow-auto'>
      <div className="overflow-x-hidden" >

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
            className="mx-auto h-[95px] w-auto"
            src={logo}
           
          /> */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Add Category
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              {/* Name */}
              <div>
                <label
                  htmlFor="categoryName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Categories Name
                </label>
                <div className="mt-2">
                  <input
                    value={inputvalue.categoryName}
                    onChange={handleChange}
                    name="categoryName"
                    type="text"
                    autoComplete="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>


              {/* upload  photo */}


              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                  Upload photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input onChange={handleimgupload} id="file-upload" name="catimage" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>



              {/* description */}
              <div className="col-span-full">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    value={inputvalue.description}
                    onChange={handleChange}
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about Product.</p>
              </div>


              {/* submit button */}
              {
              loading? <Loading/>: <div>
                  <button
                    onClick={addcategory}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    ADD CATEGORY
                  </button>
                </div>
              }



            </form>


          </div>
        </div>

      </div>
    </div></div>
  )
}

export default Addcategories