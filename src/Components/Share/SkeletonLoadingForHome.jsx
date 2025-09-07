import React from 'react'

const SkeletonLoadingForHome = () => {
    return (
        <div className='item grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 sm:gap-y-10 sm:gap-x-2 md:gap-2 lg:gap-8'>


            {
                [...Array(12)].map((_, index) => {


                    return (<div className="flex flex-col gap-4 w-52">
                         <div className="skeleton h-40 lg:w-full rounded-none"></div>
                <div className="skeleton h-4 w-full rounded-none"></div>
                <div className="skeleton h-4 lg:w-full sm:72 rounded-none"></div>
                <div className="skeleton h-4 w-50 rounded-none"></div>
                <div className="skeleton h-4 w-full rounded-none"></div>
                    </div>)
                })

            }

        </div>
    )
}

export default SkeletonLoadingForHome