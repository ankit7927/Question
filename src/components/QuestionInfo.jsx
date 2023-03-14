import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Caxios from '../extras/Caxios'

const QuestionInfo = (props) => {

    const question = props.question
    const token = useSelector((state) => state.user.token)
    const navigate = useNavigate()
    const [reqINT, setreqINT] = useState({
        loading: false,
        success: false,
        error: ""
    })

    const handleBTNClick = (e) => {
        if (token === "") {
            navigate("/signin")
        } else {
            setreqINT({
                loading: true,
                success: false,
                error: ""
            })

            let url = `/ques/vote/${question._id}`
            

            Caxios(token).get(url)
                .then(res => {
                    question.votes = res.data.votes
                    setreqINT({
                        loading: false,
                        success: true,
                        error: ""
                    })
                }).catch(err => {
                    console.log(err);
                    setreqINT({
                        loading: false,
                        success: false,
                        error: err.response.data.message
                    })
                })
        }
    }


    return (
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
    )
}

export default QuestionInfo