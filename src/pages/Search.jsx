import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Caxios from '../extras/Caxios'

const Search = () => {
    const [query, setquery] = useState("")
    const [loading, setloading] = useState(false)
    const [reault, setreault] = useState([])

    useEffect(() => {
        if (query !== "") {
            Caxios(null).get("/ques",
                {
                    params: {
                        "question": query
                    }
                })
                .then(res => {
                    setreault(res.data)
                    setloading(false)
                }).catch(err => {
                    console.log(err)
                    setloading(false)
                })
        }
    }, [query])

    return (
        <div>
            <div className='mt-4'>
                <input type="text" autoFocus className="form-control" placeholder="Search for a question..." onChange={(e) => setquery(e.target.value)} />
            </div>
            {
                loading
                    ? <div className="list-group mt-3" key={""}>
                        <div href="#" className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Loading...</h5>
                            </div>
                        </div>
                    </div>
                    : <>
                        {
                            reault.length === 0
                                ? <div className="list-group mt-3" >
                                    <div href="#" className="list-group-item list-group-item-action" key={""}>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Nothing found....</h5>
                                        </div>
                                    </div>
                                </div>
                                : <div className="list-group mt-3">
                                    {
                                        reault.map((res) => {
                                            return <Link to={`/ques/${res._id}`} className="list-group-item list-group-item-action" key={res._id}>
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1">{res.question.title}</h5>
                                                    <small className="text-muted">{new Date(res.createdAt).toLocaleDateString()}</small>
                                                </div>
                                                <small className="text-muted">{res.email}</small>
                                            </Link>
                                        })
                                    }
                                </div>
                        }
                    </>
            }
        </div>
    )
}

export default Search