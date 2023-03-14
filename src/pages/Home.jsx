import Caxios from '../extras/Caxios'
import React, { useEffect, useRef, useState } from 'react'
import Loading from '../components/Loading'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [quesIndex, setquesIndex] = useState({})
  const [loading, setloading] = useState(true)
  const [query, setquery] = useState("")
  const temp = useRef(false)

  useEffect(() => {
    if (temp.current === false) {
      Caxios(null).get("/ques/index")
        .then(res => {
          setquesIndex(res.data)
          setloading(false)
        }).catch(err => console.log(err))
      return () => temp.current = true
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search/${query}`)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <section className="hero py-4">
        <div className="container">
          <h1 className="text-center mb-4">Ask Anything, Get Answers</h1>
          <input type="search" onClick={() => navigate(`/search`)} className="form-control" placeholder="Search for a question..." />
        </div>
      </section>
      <section className="questions py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h2 className="mb-4">Trending Questions</h2>
              {
                quesIndex?.latest.map(que => {
                  return <div className="card mb-3" key={que._id}>
                    <div className="card-body">
                      <h5 className="card-title">{que.question.title}?</h5>
                      <p className="card-text">{que.question.content}</p>
                      <Link to={`/ques/${que._id}`} className="card-link">Read More</Link>
                    </div>
                  </div>
                })
              }
            </div>
            <div className="col-md-4">
              <h2 className="mb-4">Latest Questions</h2>
              <div className="list-group">
                {
                  quesIndex?.latest.map(que => {
                    return <Link to={`/ques/${que._id}`} className="list-group-item list-group-item-action" key={que._id}>
                      {que.question.title}
                    </Link>
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home