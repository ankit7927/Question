import cAxios from '../extras/Caxios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()
    const [name, setname] = useState("")
    const [email, setemail] = useState("")

    const [password, setpassword] = useState("")
    const [cnfPass, setcnfPass] = useState("")
    const [message, setmessage] = useState({})
    const [loading, setloading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setloading(true)
        if (password !== cnfPass) {
            setmessage({ "content": "both password should be same.", "type": "alert-warning" })
            setloading(false)
            return
        }
        cAxios(null).post("/user/signup",
            {
                "name": name,
                "email": email,
                "password": password
            })
            .then(res => {
                console.log(res.data);
                setloading(false)
                navigate("/signin")
            }).catch(err => {
                console.log(err)
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
                                <h1 className="fs-4 card-title fw-bold mb-4">Register</h1>
                                <form autoComplete="off" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" for="name">Name</label>
                                        <input id="name" type="text" className="form-control" name="name" value={name} required autoFocus
                                            onChange={(e) => setname(e.target.value)} />
                                        <div className="invalid-feedback">
                                            Name is required
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" for="email">E-Mail Address</label>
                                        <input id="email" type="email" className="form-control" name="email" value={email} required
                                            onChange={(e) => setemail(e.target.value)} />
                                        <div className="invalid-feedback">
                                            Email is invalid
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" for="password">Password</label>
                                        <input id="password" type="password" className="form-control" name="password" value={password} required
                                            onChange={(e) => setpassword(e.target.value)} />
                                        <div className="invalid-feedback">
                                            Password is required
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" for="cnfpassword">Confirm Password</label>
                                        <input id="cnfpassword" type="password" className="form-control" name="password" value={cnfPass} required
                                            onChange={(e) => setcnfPass(e.target.value)} />
                                        <div className="invalid-feedback">
                                            Password is required
                                        </div>
                                    </div>

                                    <p className="form-text text-muted mb-3">
                                        By registering you agree with our terms and condition.
                                    </p>

                                    <div className="align-items-center d-flex">
                                        <button type="submit" className="btn btn-primary ms-auto">
                                            {
                                                loading
                                                    ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    : <></>
                                            }
                                            Register
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer py-3 border-0">
                                <div className="text-center">
                                    Already have an account? <Link to="/signin" className="text-dark">Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup