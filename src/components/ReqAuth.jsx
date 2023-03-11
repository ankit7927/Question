import React from 'react'
import { useSelector } from "react-redux"
import { useLocation, Navigate, Outlet } from 'react-router-dom'

const ReqAuth = () => {
    const loggedIn = useSelector((state) => state.user.loggedIn)
    const location = useLocation()
    return (
        loggedIn
            ? <Outlet />
            : <Navigate to="/signin" state={{ from: location }} replace />
    )
}

export default ReqAuth

