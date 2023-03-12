import React, { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard'
import Loading from '../components/Loading'
import QuestionCard from '../components/QuestionCard'
import QuestionCat from '../components/QuestionCat'
import Caxios from '../extras/Caxios'

const Questions = () => {
    const [questions, setQuestion] = useState([])
    const [reqINT, setreqINT] = useState({
        loading: false,
        success: false,
        error: ""
    })

    useEffect(() => {
        setreqINT({
            loading: true,
            success: false,
            error: ""
        })
        Caxios(null).get(`/ques/latest`)
            .then(res => {
                setQuestion(res.data);
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
                    error: err.response.data
                })
            })
    }, [])

    if (reqINT.loading) {
        return <Loading />
    }

    return (
        <section className="py-5">
            <div className="container">
                {
                    reqINT.error !== ""
                        ? <div className="alert alert-danger" role="alert">
                            {reqINT.error}
                        </div>
                        : <></>
                }
                <div className="row">
                    <div className="col-md-8">
                        <QuestionCat setQuestion={setQuestion} />
                        {
                            questions.map(question => {
                                return <QuestionCard question={question} />
                            })
                        }
                    </div>
                    <div className="col-md-4">
                        <h2 className="mb-3">Blogs By Question</h2>
                        <BlogCard />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Questions