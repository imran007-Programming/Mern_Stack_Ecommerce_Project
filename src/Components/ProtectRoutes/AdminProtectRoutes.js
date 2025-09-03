import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminProtectedRoutes = ({ Components }) => {
    const navigate = useNavigate();
    const checkAdminValidity = () => {
        let login = localStorage.getItem("admintoken")
        if (!login) {
            navigate("/admin/login")
        }
    }

    useEffect(() => {
        checkAdminValidity()
    }, [])

    return (
        <div>
            <Components />
        </div>
    )
}

export default AdminProtectedRoutes