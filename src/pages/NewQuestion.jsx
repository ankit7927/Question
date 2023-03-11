import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import Caxios from '../extras/Caxios'

const NewQuestion = () => {
  const navigate = useNavigate()
  const [tags, settags] = useState("")
  const [title, settitle] = useState("")
  const [conent, setconent] = useState("")
  const [loading, setloading] = useState(false)
  const [message, setmessage] = useState({})
  const token = useSelector((state) => state.user.token)

  function handleSubmit(e) {
    e.preventDefault()
    setloading(true)
    Caxios(token).post(`/ques/new-question`,
      {
        "title": title,
        "content": conent,
        "email": "email",
        "tags": tags,
      }).then(res => {
        setloading(false)
        navigate("/")
      }).catch(err => {
        console.log(err)
        setmessage({ content: err.response.data, type: "warning" })
        setloading(false)
      })
  }

  if (loading) {
    return <Loading />
  } else {
    return (
      <section className="ask-question py-5">
        <div className="container">
          {
            message.conent
              ? <div className={`alert alert-${message.type}`} role="alert">
                {message.conent}
              </div>
              : <></>
          }

          <h1 className="text-center mb-4">Ask a Question</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label for="questionTitle" className="form-label">Title</label>
              <input type="text" className="form-control" id="questionTitle" placeholder="Enter your question title" onChange={(e) => settitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <label for="questionBody" className="form-label">Body</label>
              <textarea className="form-control" id="questionBody" rows="10" placeholder="Enter your question description" onChange={(e) => setconent(e.target.value)}></textarea>
            </div>
            <div className="mb-3">
              <label for="questionTags" className="form-label">Tags</label>
              <input type="text" className="form-control" id="questionTags" placeholder="Enter your question tags (separated by commas)" onChange={(e) => settags(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">
              {
                loading
                  ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  : <></>
              }
              Submit
            </button>
          </form>
        </div>
      </section>
    )

  }
}

export default NewQuestion