import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProtectedRoutes = ({ Components }) => {
    const navigate = useNavigate();
    const checkUserValidity = () => {
        let login = localStorage.getItem("usertoken")
        if (!login) {
            navigate("/login")
        }
    }

    useEffect(() => {
        checkUserValidity()
    }, [])

    return (
        <div>
            <Components />
        </div>
    )
}

export default UserProtectedRoutes