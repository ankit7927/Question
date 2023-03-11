import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import Caxios from '../extras/Caxios'

const Questions = () => {
    const [questions, setQuestion] = useState([])
    const [loading, setloading] = useState(false)
    const [message, setmessage] = useState({})
    const token = useSelector((state) => state.user.token)
    const navigate = useNavigate()

    useEffect(() => {
        setloading(true)
        Caxios(null).get(`/ques/latest`)
            .then(res => {
                setQuestion(res.data);
                setloading(false)
            }).catch(err => {
                console.log(err);
                setloading(false)
                setmessage({ content: err.response.data, type: "warning" })
            })
    }, [])

    const handleClick = (e) => {
        setloading(true)
        Caxios(null).get(`/ques/${e.target.value}`)
            .then(res => {
                setQuestion(res.data);
                setloading(false)
            }).catch(err => {
                console.log(err);
                setloading(false)
                setmessage({ content: err.response.data, type: "warning" })
            })
    }

    const handleVoteClick = (e) => {
        if (token === "") {
            navigate("/signin")
        } else {
            Caxios(token).get(`/ques/vote/${e.target.id}`)
                .then(res => {
                    e.target.value = `Votes ${res.data}`
                }).catch(err => {
                    console.log(err);
                    setmessage({ content: err.response.data, type: "warning" })
                })
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <section className="py-5">
            <div className="container">
                {
                    message.conent
                        ? <div className={`alert alert-${message.type}`} role="alert">
                            {message.conent}
                        </div>
                        : <></>
                }
                <div className="row">
                    <div className="col-md-8">
                        <div className='container mb-3'>
                            <h1 className="mb-4">Questions</h1>
                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" className="btn-check" name="btnradio" id="btnradio1"
                                    onClick={handleClick} value="Latest" />
                                <label className="btn btn-outline-primary" for="btnradio1">Latest</label>

                                <input type="radio" className="btn-check" name="btnradio" id="btnradio2"
                                    onClick={handleClick} value="ananswred" />
                                <label className="btn btn-outline-primary" for="btnradio2">Unanswred</label>

                                <input type="radio" className="btn-check" name="btnradio" id="btnradio3"
                                    onClick={handleClick} value="Top" />
                                <label className="btn btn-outline-primary" for="btnradio3">Top</label>
                            </div>
                        </div>

                        {
                            questions.map(question => {
                                return <div className="card mb-3" key={question._id}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-10">
                                                <h5 className="card-title"><Link to={`/ques/${question._id}`}>{question.question.title}</Link></h5>
                                                <p className="card-text">{question.question.content}</p>
                                            </div>
                                            <div className="col-2 d-flex justify-content-end align-items-center">
                                                <input type="button" id={question._id} className="btn btn-outline-primary btn-sm" value={`Votes ${question.votes}`}
                                                    onClick={handleVoteClick}>
                                                </input>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="card-footer text-muted border-0">Asked by {question.name} on {new Date(question.createdAt).toLocaleDateString()}</div>
                                </div>
                            })
                        }
                    </div>
                    <div className="col-md-4">
                        <h2 className="mb-3">Blogs By Quesion</h2>
                        <div className="card">
                            <div className="card-body">
                                <span>Coming soon....</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Questions