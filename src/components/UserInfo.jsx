import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from '../state/slices/UserSlice'
import Caxios from '../extras/Caxios'

const UserInfo = () => {
    const dispatch = useDispatch()
    const profile = useSelector((state) => state.user.profile)
    const token = useSelector((state) => state.user.token)
    const [name, setname] = useState(profile.name)
    const [email, setemail] = useState(profile.email)
    const [gender, setgender] = useState("")
    const [profilepic, setprofilepic] = useState("")
    const [reqINT, setreqINT] = useState({
        loading: false,
        success: false,
        error: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setreqINT({
            loading: true,
            success: false,
            error: ""
        })
        Caxios(token).put("/user/profile", {
            "name": name,
            "email": email
        }).then(res => {
            dispatch(setProfile(res.data))
            setreqINT({
                loading: false,
                success: true,
                error: ""
            })
        }).catch(err => {
            console.log(err)
            setreqINT({
                loading: false,
                success: false,
                error: err.response.data
            })
        })
    }

    return (
        <div className="card-body">
            <h5 className="card-title">Basic Details</h5>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="name"
                        name="name" value={name} onChange={(e) => setname(e.target.value)} />
                </div>
                <div className="col-md-6">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Email"
                        name="email" value={email} onChange={(e) => setemail(e.target.value)} />
                </div>
                <div className="col-md-6">
                    <label for="gender" className="form-label">Gender</label>
                    <select id="gender" className="form-select" name="gender" value={gender}
                        onChange={(e) => setgender(e.target.value)}>
                        <option selected>Choose...</option>
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label for="profile" className="form-label">Profile Image</label>
                    <input type="file" className="form-control" id="profile" onChange={(e) => setprofilepic(e.target.value)} />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary">
                        {
                            reqINT.loading
                                ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                : <></>
                        }
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserInfo