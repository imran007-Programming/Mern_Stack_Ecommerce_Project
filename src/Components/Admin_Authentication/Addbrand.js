import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import Select from 'react-select';
import { Link } from 'react-router-dom'
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { adminAddBrand } from '../../redux/Slice/brandSlice/brandSlice';
import Loading from '../Share/Loading';

const Addbrand = () => {
    const { loading, error } = useSelector((state) => state.brand)
    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState({
        brandName: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    }

    const addBrand = (e) => {
        e.preventDefault();
        const { brandName } = inputValue;

        if (brandName === "") {
            toast.error("please enter a brandName");
        } else {
            const formData = new FormData();
            formData.append("name", brandName);

            dispatch(adminAddBrand(formData)).then((res) => {
                if (res.payload) {
                    setInputValue({
                        ...inputValue,
                        brandName: "",
                    });
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    return (
        <div>
            <div className='h-[650px] overflow-auto'>
                <div className="overflow-x-hidden">
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 ">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Add Brand
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" action="#" method="POST">
                                <div>
                                    <label
                                        htmlFor="brandName"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Brand Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={inputValue.brandName}
                                            onChange={handleChange}
                                            name="brandName"
                                            type="text"
                                            autoComplete="text"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                {loading ? <Loading /> : (
                                    <div>
                                        <button
                                            onClick={addBrand}
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Add brand
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Addbrand
