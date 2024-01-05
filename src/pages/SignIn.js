import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';
import axios from 'axios';

export default function SignIn() {
    const [credentials, setcredentials] = useState({ Email: "", Password: "" })
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios
                .post(`http://localhost:5555/users/signin`, ({ ...credentials }))
            if (!response.data.success) {
                enqueueSnackbar(response.data.message, { variant: 'error' })
            }
            else {
                enqueueSnackbar(response.data.message, { variant: 'success' })
                localStorage.setItem("signEmail", credentials.Email)
                localStorage.setItem("authToken", response.data.authToken)
                navigate('/')
            }
        } catch (error) {
            enqueueSnackbar("Error during SignIn:", { variant: 'error' });
        }
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <div style={{ backgroundColor: "#020f14", height: '100vh' }}>
            <div className="container " style={{ height: '100vh' }}>
                <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                    <div className="p-4 border border-3 border-dark rounded fs-5 bg-light" style={{ maxHeight: "85%", width: "95%" }}>

                        <div className="container-fluid d-flex justify-content-between p-0">
                            <div></div>
                            <div className="fw-bold text-dark fs-1">Sign In</div>
                            <Link className='btn btn-danger fs-6 btn-sm px-3 py-0 my-2 d-flex align-items-center' to="/"> X </Link>
                        </div>

                        <form className='text-black' style={{ zIndex: "9" }} onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" name="Email" onChange={onChange} placeholder='Enter Your Email' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" name="Password" onChange={onChange} placeholder='Enter Your Password' />
                                <div id="emailHelp" className="form-text text-dark">Password must contain minimum 6 charaters.</div>
                            </div>
                            <button type="submit" className="px-3 btn btn-primary fw-bold fs-5">Submit</button>
                            <Link to="/signup" className="m-3 px-3 btn btn-danger fw-bold fs-5">Sign Up</Link>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
