import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Caxios from '../extras/Caxios'
import 'reactjs-popup/dist/index.css';

const Answer = (props) => {
    const answer = props.answer
    const token = useSelector((state) => state.user.token)
    const navigate = useNavigate()
    const [reqINT, setreqINT] = useState({
        loading: false,
        success: false,
        error: ""
    })

    const voteBTN = (e) => {
        if (token === "") {
            navigate("/signin")
        } else {
            setreqINT({
                loading: true,
                success: false,
                error: ""
            })

            Caxios(token).get(`/ques/vote/${props.quesID}/${answer._id}`)
                .then(res => {
                    answer.votes = res.data.votes
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
        <div className="card mb-3" key={answer._id}>
            <div className="card-body">
                <div className="row">
                    <p className="card-text">{answer.answer}</p>
                </div>
            </div>
            <div className="card-footer text-muted border-0">
                <div className='row'>
                    <div className="col-10">
                        by {answer.name} on {new Date(answer.createdAt).toLocaleDateString()}
                    </div>
                    <div className="col-2 d-flex justify-content-end align-items-center">
                        {
                            reqINT.loading
                                ? <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                : <input type="button" className="btn btn-light border-0 btn-sm" value={`Votes ${answer.votes}`}
                                    onClick={voteBTN}>
                                </input>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Answer