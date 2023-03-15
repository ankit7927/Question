import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Caxios from '../extras/Caxios'
import ErrorModel from './ErrorModal';
import Loading from './Loading';

const UserQues = () => {
    const token = useSelector((state) => state.user.token)
    const [question, setquestion] = useState({})
    const temp = useRef(false)
    const [reqINT, setreqINT] = useState({
        loading: false,
        success: false,
        error: null
    })

    useEffect(() => {
        if (temp.current === false) {
            setreqINT({
                loading: true,
                success: false,
                error: null
            })
            Caxios(token).get("/user/questions")
                .then(res => {
                    setreqINT({
                        loading: false,
                        success: true,
                        error: null
                    })
                    setquestion(res.data)
                }).catch(err => {
                    console.log(err)
                    setreqINT({
                        loading: false,
                        success: false,
                        error: err.response.data.message
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

    if (reqINT.loading) {
        return <Loading />
    } else {
        return (
            <div className="card-body">
                <ErrorModel errorMessage={reqINT.error} />
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-asked-tab" data-bs-toggle="tab" data-bs-target="#nav-asked" type="button" role="tab" aria-controls="nav-asked" aria-selected="true">Asked</button>
                        <button className="nav-link" id="nav-answred-tab" data-bs-toggle="tab" data-bs-target="#nav-answred" type="button" role="tab" aria-controls="nav-answred" aria-selected="false">Answred</button>
                        <button className="nav-link" id="nav-saved-tab" data-bs-toggle="tab" data-bs-target="#nav-saved" type="button" role="tab" aria-controls="nav-saved" aria-selected="false">Saved</button>
                    </div>
                </nav>

                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-asked" role="tabpanel" aria-labelledby="nav-asked-tab">
                        <ul className="list-group mt-3">
                            {
                                question.asked?.map(que => {
                                    return <div className="list-group-item list-group-item-action" key={que._id}>
                                        <div className="d-flex w-100 justify-content-between">
                                            <Link to={`/ques/${que._id}`} className="mb-1 h5">{que.question.title}</Link>
                                            <button className="btn btn-outline-danger btn-sm" id={que._id} onClick={removeHandle}>
                                                remove
                                            </button>
                                        </div>
                                        <small className="text-muted">created at {new Date(que.createdAt).toLocaleDateString()} votes {que.votes}</small>
                                    </div>
                                })
                            }
                        </ul>
                    </div>
                    <div className="tab-pane fade" id="nav-answred" role="tabpanel" aria-labelledby="nav-answred-tab">
                        <ul className="list-group mt-3">
                            {
                                question.answerd?.map(que => {
                                    return <div className="list-group-item list-group-item-action" key={que._id}>
                                        <div className="d-flex w-100 justify-content-between">
                                            <Link to={`/ques/${que._id}`} className="mb-1 h5">{que.question.title}</Link>
                                            <button className="btn btn-outline-danger btn-sm" id={que._id} onClick={removeHandle}>
                                                remove
                                            </button>
                                        </div>
                                        <small className="text-muted">created at {new Date(que.createdAt).toLocaleDateString()} votes {que.votes}</small>
                                    </div>
                                })
                            }
                        </ul>
                    </div>
                    <div className="tab-pane fade" id="nav-saved" role="tabpanel" aria-labelledby="nav-saved-tab">
                        <ul className="list-group mt-3">
                            {
                                question.saved?.map(que => {
                                    return <div className="list-group-item list-group-item-action" key={que._id}>
                                        <div className="d-flex w-100 justify-content-between">
                                            <Link to={`/ques/${que._id}`} className="mb-1 h5">{que.question.title}</Link>
                                            <button className="btn btn-outline-danger btn-sm" id={que._id} onClick={removeHandle}>
                                                remove
                                            </button>
                                        </div>
                                        <small className="text-muted">created at {new Date(que.createdAt).toLocaleDateString()} votes {que.votes}</small>
                                    </div>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserQues