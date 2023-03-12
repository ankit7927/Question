import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Caxios from '../extras/Caxios'

const UserQues = () => {
    const token = useSelector((state) => state.user.token)
    const [question, setquestion] = useState({})
    const temp = useRef(false)
    const [reqINT, setreqINT] = useState({
        loading: false,
        success: false,
        error: ""
    })

    useEffect(() => {
        if (temp.current === false) {
            setreqINT({
                loading: true,
                success: false,
                error: ""
            })
            Caxios(token).get("/user/questions")
                .then(res => {
                    setreqINT({
                        loading: false,
                        success: true,
                        error: ""
                    })
                    setquestion(res.data)
                }).catch(err => {
                    console.log(err)
                    setreqINT({
                        loading: false,
                        success: false,
                        error: err.response.data
                    })
                })
            return () => temp.current = true
        }
    }, [])

    const removeHandle = (e) => {

        Caxios(token).delete(`/ques/save/${e.target.id}`)
            .then(res => {
            }).catch(err => {
                console.log(err);
            })
    }


    return (
        <div className="card-body">
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
                    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
                    <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button>
                </div>
            </nav>

            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <ul class="list-group mt-3">
                        {
                            question.asked?.map(que => {
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
                </div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <ul class="list-group mt-3">
                        {
                            question.answerd?.map(que => {
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
                </div>
                <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                    <ul class="list-group mt-3">
                        {
                            question.saved?.map(que => {
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
                </div>
            </div>
        </div>
    )
}

export default UserQues