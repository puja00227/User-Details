import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


export default function SignUp() {
    const [credentials, setcredentials] = useState({ Name: "", Email: "", Password: "", Phone: "", Gender: "", Hear: "", City: "", State: "" })
    const [selectedState, setSelectedState] = useState(null);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios
                .post(`http://localhost:5555/users/signup`, ({ ...credentials }))
            if (!response.data.success) {
                enqueueSnackbar(response.data.message, { variant: 'error' })
            }
            else {
                enqueueSnackbar(response.data.message, { variant: 'success' })
                navigate('/signin')
            }
        } catch (error) {
            enqueueSnackbar('Error During SignUp', { variant: 'error' })
        };
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleSelectState = (value) => {
        setSelectedState(value);
        setcredentials({ ...credentials, State: value || "" });
    };

    return (
        <div style={{ backgroundColor: "#020f14", height: '100vh' }}>
            <div className="container " style={{ height: '100vh' }}>
                <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                    <div className="p-4 border border-3 border-dark rounded fs-5 bg-light" style={{ overflowY: "auto", maxHeight: "85%", width: "95%" }}>

                        <div className="container-fluid d-flex justify-content-between p-0">
                            <div></div>
                            <div className="fw-bold text-dark fs-1">Sign Up</div>
                            <Link className='btn btn-danger fs-6 btn-sm px-3 py-0 my-2 d-flex align-items-center' to="/"> X </Link>
                        </div>

                        <form className='text-black' style={{ zIndex: "9" }} onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control " name="Name" onChange={onChange} placeholder='Enter Your Name' />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email Address</label>
                                <input type="email" className="form-control" name="Email" onChange={onChange} placeholder='Enter Your Email' />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" name="Password" onChange={onChange} placeholder='Enter Your Password' />
                                <div id="emailHelp" className="form-text text-dark">Password must contain minimum 6 charaters.</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone Number </label>
                                <input type="text" className="form-control" name="Phone" onChange={onChange} placeholder='Enter Your Mobile Number' />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Gender </label>
                                <div className="fs-6">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="Gender" id="flexRadioDefault1" onChange={onChange} value="Male" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">Male</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="Gender" id="flexRadioDefault2" onChange={onChange} value="Female" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2"> Female </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="Gender" id="flexRadioDefault3" onChange={onChange} value="Others" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault3"> Others</label>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">How did you hear about this? </label>
                                <div className="fs-6">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="LinkedIn" id="flexCheckDefault1" name="Hear" onChange={onChange} />
                                        <label className="form-check-label" htmlFor="flexCheckDefault1">LinkedIn</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="Friends" id="flexCheckDefault2" name="Hear" onChange={onChange} />
                                        <label className="form-check-label" htmlFor="flexCheckDefault2">Friends</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="Job Portal" id="flexCheckDefault3" name="Hear" onChange={onChange} />
                                        <label className="form-check-label" htmlFor="flexCheckDefault3">Job Portal</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="Others" id="flexCheckDefault4" name="Hear" onChange={onChange} />
                                        <label className="form-check-label" htmlFor="flexCheckDefault4">Others</label>
                                    </div>

                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="cities">Select a City:</label>
                                <div className="fs-6 my-2 ">
                                    <select className='rounded' id="cities" name="City" onChange={onChange}>
                                        <option value=""></option>
                                        <option value="Mumbai">Mumbai</option>
                                        <option value="Pune">Pune</option>
                                        <option value="Ahmedabad">Ahmedabad</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="state" className="form-label ">State </label>
                                <Autocomplete
                                    options={['Gujarat', 'Maharashtra', 'Karnataka']}
                                    value={selectedState}
                                    onChange={(event, value) => handleSelectState(value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Search your state..."
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </div>

                            <button type="submit" className="px-3 btn btn-primary fw-bold fs-5">Submit</button>
                            <Link to="/signin" className="m-3 px-3 btn btn-danger fw-bold fs-5">Sign In</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
