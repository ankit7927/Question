import React, { useState } from 'react'
import img from '../assets/avatar.png'
import { useDispatch, useSelector } from "react-redux"
import { logout } from '../state/slices/UserSlice'
import UserInfo from '../components/UserInfo'
import UserQues from '../components/UserQues'
import Caxios from '../extras/Caxios'
import ErrorModel from '../components/ErrorModal'

const Profile = () => {
    const dispatch = useDispatch()
    const profile = useSelector((state) => state.user.profile)
    const [reqINT, setreqINT] = useState({
        loading: false,
        success: false,
        error: null
    })

    const logoutBtn = () => {
        setreqINT({
            loading: true,
            success: false,
            error: null
        })
        Caxios(null).post("/auth/logout")
            .then(res => {
                dispatch(logout())
                setreqINT({
                    loading: false,
                    success: true,
                    error: null
                })
            }).catch(err => {
                
                setreqINT({
                    loading: false,
                    success: false,
                    error: err.response.data.message
                })
            })
    }

    return (
        <div className="py-4">
            <ErrorModel errorMessage={reqINT.error} />
            <div className="row">
                <div className="col-lg-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img alt="user dp" className="card-img-top" src={img} />
                                <div className="mt-3">
                                    <p className="text-secondary mb-1">{profile.username}</p>
                                    {
                                        reqINT.loading
                                            ? <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            : <button onClick={logoutBtn} className="btn btn-outline-danger">Logout</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card mb-4">
                        <UserInfo />
                    </div>
                    <div className="card mb-4">
                        <UserQues />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile