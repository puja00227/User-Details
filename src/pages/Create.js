import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';
import axios from 'axios';


export default function Create() {
    const [credentials, setcredentials] = useState({ Name: "", Email: "", Phone: "" })
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios
                .post(`http://localhost:5555/users`, ({ signEmail: localStorage.getItem('signEmail'), ...credentials }))
            if (!response.data.success) {
                enqueueSnackbar(response.data.message, { variant: 'error' })
            }
            else {
                enqueueSnackbar(response.data.message, { variant: 'success' })
                navigate('/')
            }
        } catch (error) {
            enqueueSnackbar("Error", { variant: 'error' });
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
                            <div className="fw-bold text-dark fs-1">Create User</div>
                            <Link className='btn btn-danger fs-6 btn-sm px-3 py-0 my-2 d-flex align-items-center' to="/"> X </Link>
                        </div>

                        <form className='text-black' style={{ zIndex: "9" }} onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInput1" className="form-label">User Name</label>
                                <input type="text" className="form-control" name="Name" onChange={onChange} placeholder='Enter User Name' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" name="Email" onChange={onChange} placeholder='Enter User Email' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Mobile Number</label>
                                <input type="text" className="form-control" name="Phone" onChange={onChange} placeholder='Enter User Phone Number' />
                                <div id="emailHelp" className="form-text text-dark">Password must contain minimum 6 charaters.</div>
                            </div>
                            <button type="submit" className="px-3 btn btn-primary fw-bold fs-5">Save</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
