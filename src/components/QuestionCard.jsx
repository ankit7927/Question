import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Caxios from '../extras/Caxios'

const QuestionCard = (props) => {
    const question = props.question
    const token = useSelector((state) => state.user.token)
    const navigate = useNavigate()
    const [reqINT, setreqINT] = useState({
        loading: false,
        success: false,
        error: ""
    })

    const handleVoteClick = (e) => {
        if (token === "") {
            navigate("/signin")
        } else {
            setreqINT({
                loading: true,
                success: false,
                error: ""
            })

            Caxios(token).get(`/ques/vote/${e.target.id}`)
                .then(res => {
                    setreqINT({
                        loading: false,
                        success: true,
                        error: ""
                    })
                    e.target.value = `Votes ${res.data}`
                }).catch(err => {
                    console.log(err);
                    setreqINT({
                        loading: false,
                        success: false,
                        error: err.response.data
                    })
                })
        }
    }

    return (
        <div className="card mb-3" key={question._id}>
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
    )
}

export default QuestionCard