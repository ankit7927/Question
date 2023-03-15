import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { FaEllipsisV } from "react-icons/fa";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Answer from '../components/Answer'
import CreateAns from '../components/CreateAns'
import Loading from '../components/Loading'
import QuestionInfo from '../components/QuestionInfo'
import Caxios from '../extras/Caxios'
import ErrorModel from '../components/ErrorModal';

const Question = () => {
    const param = useParams()
    const navigate = useNavigate()
    const [question, setquestion] = useState({})
    const [loading, setloading] = useState(true)
    const temp = useRef(false)
    const token = useSelector((state) => state.user.token)
    const [reqINT, setreqINT] = useState({
        loading: false,
        success: false,
        error: null
    })

    useEffect(() => {
        if (temp.current === false) {
            setloading(true)
            Caxios(null).get(`/ques/que/${param.questID}`)
                .then(res => {
                    setquestion(res.data)
                    setloading(false)
                }).catch(err => {
                    console.log(err);
                    setloading(false)
                })
            return () => temp.current = true
        }
    }, [param.questID])

    const handleBTNClick = (e) => {
        if (token === "") {
            navigate("/signin")
        } else {
            setreqINT({
                loading: true,
                success: false,
                error:null
            })
            Caxios(token).get(`/user/save-rem/${question._id}`)
                .then(res => {
                    setreqINT({
                        loading: false,
                        success: true,
                        error: null
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

    if (loading) {
        return <Loading />
    }

    return (
        <section className="py-5">
            <ErrorModel errorMessage={reqINT.error} />
            <div className="row">
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-10">
                            <h2 className="mb-4">{question.question.title}</h2>
                        </div>
                        <div className="col-2 d-flex justify-content-end align-items-center">
                            <Popup trigger={<button className='btn border-0'><FaEllipsisV /></button>} position="left">
                                {
                                    reqINT.loading
                                        ? <div class="spinner-border text-primary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                        : <button name="save" className="btn btn-primary m-2"
                                            onClick={handleBTNClick}>
                                            Save
                                        </button>
                                }
                            </Popup>
                        </div>
                    </div>
                    <p>{question.question.content}</p>
                    <div className="mt-5">
                        <h3 className="mb-4">Answers ({question.answers.length})</h3>
                        {
                            question.answers.map((ans) => {
                                return <Answer answer={ans} quesID={question._id} />
                            })
                        }
                    </div>
                </div>
                <div className="col-md-4">
                    <QuestionInfo question={question} />
                    <CreateAns quesID={question._id} updateQue={setquestion} />
                </div>
            </div>
        </section>
    )
}

export default Question