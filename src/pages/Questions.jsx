import React, { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard'
import ErrorModel from '../components/ErrorModal'
import Loading from '../components/Loading'
import QuestionCard from '../components/QuestionCard'
import QuestionCat from '../components/QuestionCat'
import Caxios from '../extras/Caxios'

const Questions = () => {
    const [questions, setQuestion] = useState([])
    const [reqINT, setreqINT] = useState({
        loading: false,
        success: false,
        error: null
    })

    useEffect(() => {
        setreqINT({
            loading: true,
            success: false,
            error: null
        })
        Caxios(null).get(`/ques/latest`)
            .then(res => {
                setQuestion(res.data);
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
    }, [])

    if (reqINT.loading) {
        return <Loading />
    }

    return (
        <section className="py-3">
            <div className="container">
                <ErrorModel errorMessage={reqINT.error} />
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