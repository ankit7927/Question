import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Caxios from '../extras/Caxios'

const Search = () => {
    const params = useParams()
    const [loading, setloading] = useState(false)
    const [reault, setreault] = useState([])

    useEffect(() => {
        Caxios(null).get("/ques",
            {
                params: {
                    "question": params.query
                }
            })
            .then(res => {
                setreault(res.data)
                setloading(false)
            }).catch(err => {
                console.log(err)
                setloading(false)
                setmessage({ content: err.response.data, type: "warning" })
            })

    }, [params.query])

    if (loading) {
        return (<div className="list-group mt-3">
            <div href="#" className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Loading...</h5>
                </div>
            </div>
        </div>)
    } else if (reault.length === 0) {
        return (<div className="list-group mt-3">
            <div href="#" className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Nothing found....</h5>
                </div>
            </div>
        </div>)
    } else {
        return (
            <div className="list-group mt-3">
                {
                    reault.map((res) => {
                        return <Link to={`/ques/${res._id}`} className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{res.question.title}</h5>
                                <small className="text-muted">{new Date(res.createdAt).toLocaleDateString()}</small>
                            </div>
                            <small className="text-muted">{res.email}</small>
                        </Link>
                    })
                }
            </div>
        )
    }


}

export default Search