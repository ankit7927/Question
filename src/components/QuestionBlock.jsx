import React from 'react'
import { Link } from 'react-router-dom';

const QuestionBlock = (props) => {
    const questionList = props.questionList;
    const title = props.title;
    const index = props.index;
    return (
        <div className='mt-4'>
            <div className="card ">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <div className="row row-cols-1 row-cols-md-3 g-3">
                        {
                            questionList?.map(que => {
                                return <div className='col' key={que._id}>
                                    <div className="card text-dark bg-light border-0">
                                        <div className="card-body">
                                            <Link className="card-text text-decoration-none" to={`/ques/${que._id}`}>
                                                <p className='text-truncate'>{que.question}</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    {
                        index
                            ? <small className="d-block text-end mt-3">
                                <Link to="list/latest">See all Questions</Link>
                            </small>
                            : <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default QuestionBlock