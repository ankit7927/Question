import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Caxios from '../extras/Caxios'
import ErrorModel from './ErrorModal'

const CreateAns = (props) => {
    const quesID = props.quesID
    const profile = useSelector((state) => state.user.profile)
    const [name, setname] = useState(profile.name || "")
    const [email, setemail] = useState(profile.email || "")
    const [answer, setanswer] = useState("")
    const [reqINT, setreqINT] = useState({
        loading: false,
        success: false,
        error: null
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        setreqINT({
            loading: true,
            success: false,
            error: null
        })
        Caxios(null).post("/ques/answer",
            {
                "answer": answer,
                "email": email,
                "name": name,
                "quesID": quesID,
            }).then(res => {
                props.updateQue((ques) => ({
                    ...ques,
                    answers: res.data.answers
                }))
                setanswer("")
                setreqINT({
                    loading: false,
                    success: true,
                    error: null
                })
            }).catch(err => {
                console.log(err)
                setreqINT({
                    loading: false,
                    success: false,
                    error: err.response.data.message
                })
            })

    }

    return (
        <div className="card">
            <ErrorModel errorMessage={reqINT.error} />
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
                        <input type="email" className="form-control" id="answer" rows="5" onChange={(e) => setemail(e.target.value)} placeholder="your@email.com" value={email} />
                    </div>
                    {
                        reqINT.loading
                            ? <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            : <button type="submit" className={`btn btn-primary`}>
                                Submit Answer
                            </button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CreateAns