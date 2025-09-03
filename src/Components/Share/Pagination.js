import React from 'react'

const Pagination = ({ pageCount, page,setPage, nextPage, prevPage }) => {
    
    return (
        <div className="join flex flex-row items-center justify-center">
            {
                pageCount > 0 ? <>
                    <button onClick={() => prevPage()} className="join-item btn btn-outline">Previous</button>
                    <div className="join">
                    {
                        Array(pageCount).fill(null).map((el, index) => {
                           
                            return (
                               
                                    <button onClick={()=>setPage(index+1)} className={`${page === index + 1 ? "btn-primary" : ""} join-item btn btn-md `}>{index + 1}</button>

                             
                            )
                        })
                    }
                       </div>

                    <button onClick={() => nextPage()} className="join-item btn btn-outline">Next</button>
                </> : ""
            }
        </div>
    )
}

export default Pagination



