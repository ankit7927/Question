import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import Caxios from '../extras/Caxios'

const Question = () => {
    const param = useParams()
    const navigate = useNavigate()
    const [question, setquestion] = useState({})
    const [loading, setloading] = useState(true)
    const temp = useRef(false)
    const profile = useSelector((state) => state.user.profile)
    const token = useSelector((state) => state.user.token)
    const [message, setmessage] = useState({})
    const [name, setname] = useState(profile.name || "")
    const [email, setemail] = useState(profile.email || "")
    const [answer, setanswer] = useState("")

    useEffect(() => {
        if (temp.current === false) {
            setloading(true)
            Caxios(null).get(`/ques/que/${param.questID}`)
                .then(res => {
                    setquestion(res.data)
                    setloading(false)
                }).catch(err => {
                    console.log(err);
                    setmessage({ content: err.response.data, type: "warning" })
                    setloading(false)
                })
            return () => temp.current = true
        }
    }, [param.questID])

    const handleSubmit = (e) => {
        e.preventDefault()
        setloading(true)
        Caxios(null).post("/ques/answer",
            {
                "answer": answer,
                "email": email,
                "name": name,
                "quesID": param.questID,
            }).then(res => {
                setquestion(res.data)
                setanswer("")
                setloading(false)
            }).catch(err => {
                console.log(err)
                setloading(false)
                setmessage({ content: err.response.data, type: "warning" })
            })

    }

    const handleBTNClick = (e) => {
        if (token === "") {
            navigate("/signin")
        } else {
            setloading(true)

            let url = `/ques/vote/${question._id}`
            if (e.target.name === "answer") url = url + '/' + e.target.id
            if (e.target.name === "save") url = `/ques/save/${question._id}`

            Caxios(token).get(url)
                .then(res => {
                    setloading(false)
                }).catch(err => {
                    console.log(err);
                    setmessage({ content: err.response.data, type: "warning" })
                    setloading(flase)
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

                        <div className="row">
                            <div className="col-10">
                                <h2 className="mb-4">{question.question.title}</h2>
                            </div>
                            <div className="col-2 d-flex justify-content-end align-items-center">
                                <button name="save" className={`btn btn-outline-primary btn-sm`}
                                    onClick={handleBTNClick}>
                                    Save
                                </button>
                            </div>
                        </div>

                        <p>{question.question.content}</p>
                        <div className="mt-5">
                            <h3 className="mb-4">Answers ({question.answers.length})</h3>
                            {
                                question.answers.map((ans) => {
                                    return <div className="card mb-3" key={ans._id}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-10">
                                                    <p className="card-text">{ans.answer}</p>
                                                </div>
                                                <div className="col-2 d-flex justify-content-end align-items-center">
                                                    <input type="button" id={ans._id} name="answer" className="btn btn-outline-primary btn-sm" value={`Votes ${ans.votes}`}
                                                        onClick={handleBTNClick}>
                                                    </input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer text-muted border-0">
                                            Answered by {ans.name} on {new Date(ans.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Question Information</h5>
                                <hr />
                                <p className="card-text"><strong>Asked by:</strong> {question.name}</p>
                                <p className="card-text"><strong>Date:</strong> {new Date(question.createdAt).toLocaleDateString()}</p>

                                <p className="row">
                                    <div className="col-10">
                                        <strong>Votes:</strong> {question.votes}
                                    </div>
                                    <div className="col-2 d-flex justify-content-end align-items-center">
                                        <button name='question' className={`btn btn-outline-primary btn-sm border-0`}
                                            onClick={handleBTNClick}>
                                            Vote
                                        </button>
                                    </div>
                                </p>
                                <p className="card-text"><strong>Views:</strong> {question.views}</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">

                                <h5 className="card-title">Write an Answer</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <textarea className="form-control" id="answer" rows="5" onChange={(e) => setanswer(e.target.value)} required></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" id="answer" rows="5" onChange={(e) => setname(e.target.value)} placeholder="your name" required value={name} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="email" className="form-control" id="answer" rows="5" onChange={(e) => setemail(e.target.value)} placeholder="your@email.com" required value={email} />
                                    </div>
                                    <button type="submit" className={`btn btn-primary`}>
                                        Submit Answer
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Question