import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const loggedIn = useSelector((state) => state.user.loggedIn)
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="/" className="navbar-brand h1 mb-0">Question ?</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/questions">Questions</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/new-question">Ask a Question</Link>
                        </li>
                        {
                            loggedIn
                                ? <li className="nav-item">
                                    <Link to="profile" className="nav-link">Profile</Link>
                                </li>
                                : <li className="nav-item">
                                    <Link to="signin" className="nav-link">Signin</Link>
                                </li>
                        }
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Navbar