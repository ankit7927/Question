import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { setProfile, setToken, setLoggedin } from '../state/slices/UserSlice'
import cAxios from '../extras/Caxios'

const Signin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [message, setmessage] = useState({})
    const [loading, setloading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setloading(true)
        cAxios(null).post("/user/signin",
            {
                "email": email,
                "password": password
            })
            .then(res => {
                const p = {
                    name: res.data.name,
                    email: res.data.email,
                    userID: res.data._id
                }
                dispatch(setProfile(p))
                dispatch(setLoggedin(true))
                dispatch(setToken(res.data.token))
                setloading(false)
                navigate("/", {state:{from:location}, replace:true})
            }).catch(err => {
                console.log(err);
                setloading(false)
                setmessage({ "content": err.response.data, "type": "alert-danger" })
            })
    }
    return (
        <div>
            <div className="container h-100 mt-3">
                <div className="row justify-content-sm-center h-100">
                    <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                        <div className="card shadow-lg">
                            <div className="card-body p-5">
                                {
                                    message.content
                                        ? <div className={`alert ${message.type}`} role="alert">
                                            {message.content}
                                        </div>
                                        : <></>
                                }
                                <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                                <form autoComplete="off" onSubmit={handleSubmit}>

                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" htmlFor="email">Email</label>
                                        <input id="email" type="text" className="form-control" name="email" value={email} required
                                            onChange={(e) => setemail(e.target.value)} />
                                        <div className="invalid-feedback">
                                            email is invalid
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" htmlFor="password">Password</label>
                                        <input id="password" type="password" className="form-control" name="password" value={password} required
                                            onChange={(e) => setpassword(e.target.value)} />
                                        <div className="invalid-feedback">
                                            Password is required
                                        </div>
                                    </div>

                                    <div className="align-items-center d-flex">
                                        <button type="submit" className="btn btn-primary ms-auto">
                                            {
                                                loading
                                                    ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    : <></>
                                            }
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer py-3 border-0">
                                <div className="text-center">
                                    Don't have account <Link to="/signup" className="text-dark">Register</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin