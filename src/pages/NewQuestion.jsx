import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Caxios from '../extras/Caxios'

const NewQuestion = () => {
  const navigate = useNavigate()
  const [tags, settags] = useState("")
  const [title, settitle] = useState("")
  const [conent, setconent] = useState("")
  const token = useSelector((state) => state.user.token)

  const [reqINT, setreqINT] = useState({
    loading: false,
    success: false,
    error: ""
  })


  function handleSubmit(e) {
    e.preventDefault()
    setreqINT({
      loading: true,
      success: false,
      error: ""
    })
    if (token === "") {
      navigate("/signin")
      return
    }
    Caxios(token).post(`/ques/new-question`,
      {
        "title": title,
        "content": conent,
        "tags": tags,
      }).then(res => {
        settags("")
        settitle("")
        setconent("")
        setreqINT({
          loading: false,
          success: true,
          error: ""
        })
        navigate("/questions")
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
    <section className="ask-question py-5">
      <div className="container">
        {
          reqINT.error !== ""
            ? <div className='alert alert-danger' role="alert">
              {reqINT.error}
            </div>
            : <></>
        }

        <h1 className="text-center mb-4">Ask a Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="questionTitle" className="form-label">Title</label>
            <input type="text" className="form-control" id="questionTitle" placeholder="Enter your question title" onChange={(e) => settitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="questionBody" className="form-label">Body</label>
            <textarea className="form-control" id="questionBody" rows="10" placeholder="Enter your question description" onChange={(e) => setconent(e.target.value)}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="questionTags" className="form-label">Tags</label>
            <input type="text" className="form-control" id="questionTags" placeholder="Enter your question tags (separated by commas)" onChange={(e) => settags(e.target.value)} />
          </div>
          {
            reqINT.loading
              ? <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              : <button type="submit" className="btn btn-primary">Submit</button>
          }
        </form>
      </div>
    </section>
  )
}

export default NewQuestion