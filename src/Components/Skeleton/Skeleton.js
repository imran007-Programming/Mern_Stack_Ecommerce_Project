import React from "react";
import { useSelector } from "react-redux";

const Skeleton = () => {
    const { AllProducts: { products }, loading, error } = useSelector((state) => state.products)



    return (
        <div className="flex items-center justify-center">

            <div className="flex flex-col gap-2 w-full">
                <div className="skeleton h-40 lg:w-full rounded-none"></div>
                <div className="skeleton h-4 w-full rounded-none"></div>
                <div className="skeleton h-4 lg:w-full sm:72 rounded-none"></div>
                <div className="skeleton h-4 w-50 rounded-none"></div>
                <div className="skeleton h-4 w-full rounded-none"></div>
            </div>
        </div>
    );
};

export default Skeleton;


