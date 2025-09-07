import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Breadcrumbs = () => {
    const data=sessionStorage.getItem("title")
    (data)
    const location = useLocation()
    let currentLink = ''
    const crumbs = location.pathname.split('/').filter(crumb => crumb !== "").map(crumb => {
        currentLink += `/${crumb}`
       
        return (
            <ul className='mx-1'>
                <li>
                    <Link to={currentLink}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                     {crumb}
                    </Link>
                </li>


            </ul>
        )
    })
    


    return (
        <div className="text-sm flex items-center breadcrumbs container-fluide">
            {crumbs}
        </div>
    )
}

export default Breadcrumbs