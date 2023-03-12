import React from 'react'
import img from '../assets/avatar.png'
import { useDispatch, useSelector } from "react-redux"
import { logout } from '../state/slices/UserSlice'
import UserInfo from '../components/UserInfo'
import UserQues from '../components/UserQues'

const Profile = () => {
    const dispatch = useDispatch()
    const profile = useSelector((state) => state.user.profile)

    return (
        <div className="mt-3">
            <div className="row">
                <div className="col-lg-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img alt="user dp" className="card-img-top" src={img} />
                                <div className="mt-3">
                                    <p className="text-secondary mb-1">{profile.username}</p>
                                    <button onClick={() => dispatch(logout())} className="btn btn-outline-danger">Logout</button>
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