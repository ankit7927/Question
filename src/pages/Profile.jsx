import React, { useEffect, useRef, useState } from 'react'
import img from '../assets/avatar.png'
import { useDispatch, useSelector } from "react-redux"
import { logout } from '../state/slices/UserSlice'
import { setProfile } from '../state/slices/UserSlice'
import Caxios from '../extras/Caxios'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'

const Profile = () => {
    const dispatch = useDispatch()
    const temp = useRef(false)
    const profile = useSelector((state) => state.user.profile)
    const [name, setname] = useState(profile.name)
    const [email, setemail] = useState(profile.email)
    const [gender, setgender] = useState("")
    const [profilepic, setprofilepic] = useState("")
    const token = useSelector((state) => state.user.token)
    const [loading, setloading] = useState(false)
    const [message, setmessage] = useState({})

    const [question, setquestion] = useState({})
    const [change, setchange] = useState([])


    useEffect(() => {
        if (temp.current === false) {
            Caxios(token).get("/user/questions")
                .then(res => {
                    setquestion(res.data.question)
                }).catch(err => {
                    console.log(err)
                    setmessage({ content: err.response.data, type: "warning" })
                })
            return () => temp.current = true
        }
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        setloading(true)
        Caxios(token).put("/user/profile", {
            "name": name,
            "email": email
        }).then(res => {
            dispatch(setProfile(res.data))
            setloading(false)
        }).catch(err => {
            console.log(err)
            setmessage({ content: err.response.data, type: "warning" })
            setloading(false)
        })
    }

    const GetDisplay = () => {
        const [listques, setlistques] = useState([])

        useEffect(() => {
            Caxios(token).post("/ques/get-list", {
                "idList": change
            }).then(res => {
                setlistques(res.data)
            }).catch(err => {
                setmessage({ content: err.response.data, type: "warning" })
            })

        }, [change])

        const removeHandle = (e) => {
            setloading(true)
            Caxios(token).delete(`/ques/save/${e.target.id}`)
                .then(res => {
                    setloading(false)
                    setquestion(res.data)
                    setchange(res.data.saved)
                }).catch(err => {
                    console.log(err);
                    setmessage({ content: err.response.data, type: "warning" })
                    setloading(flase)
                })
        }

        return (
            <ul class="list-group mt-3">
                {
                    listques?.map(que => {
                        return <div class="list-group-item list-group-item-action" key={que._id}>
                            <div class="d-flex w-100 justify-content-between">
                                <Link to={`/ques/${que._id}`} class="mb-1 h5">{que.question.title}</Link>
                                <button className="btn btn-outline-danger btn-sm" id={que._id} onClick={removeHandle}>
                                    remove
                                </button>
                            </div>
                            <small class="text-muted">created at {new Date(que.createdAt).toLocaleDateString()} votes {que.votes}</small>
                        </div>
                    })
                }
            </ul>
        )
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="mt-3">
            {
                message.conent
                    ? <div class={`alert alert-${message.type}`} role="alert">
                        {message.conent}
                    </div>
                    : <></>
            }
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
                        <div className="card-body">
                            <h5 className="card-title">Basic Details</h5>
                            <form className="row g-3" onSubmit={handleSubmit}>
                                <div className="col-md-6">
                                    <label for="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="name"
                                        name="name" value={name} onChange={(e) => setname(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label for="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Email"
                                        name="email" value={email} onChange={(e) => setemail(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label for="gender" className="form-label">Gender</label>
                                    <select id="gender" className="form-select" name="gender" value={gender}
                                        onChange={(e) => setgender(e.target.value)}>
                                        <option selected>Choose...</option>
                                        <option value="male">male</option>
                                        <option value="female">female</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label for="profile" className="form-label">Profile Image</label>
                                    <input type="file" className="form-control" id="profile" onChange={(e) => setprofilepic(e.target.value)} />
                                </div>
                                <div className="col-auto">
                                    <button type="submit" className="btn btn-primary">
                                        {
                                            loading
                                                ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                : <></>
                                        }
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <div class="btn-group" role="group" aria-label="Basic outlined example">
                                <button onClick={() => setchange(question.asked)} type="button" id='asked' class="btn btn-outline-primary" value="Asked">Asked</button>
                                <button onClick={() => setchange(question.answerd)} type="button" id='answred' class="btn btn-outline-primary" value="Answred">Answred in</button>
                                <button onClick={() => setchange(question.saved)} type="button" id='saved' class="btn btn-outline-primary" value="Saved">Saved</button>
                            </div>
                            <GetDisplay />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile