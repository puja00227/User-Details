import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';

export default function Navbar({ handleSignOut, mode }) {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate();

    // const handleSignOut = () => {
    //     localStorage.removeItem("authToken")
    //     enqueueSnackbar("You Signed Out Successfully", { variant: 'success' })
    //     navigate("/")
    // }
    const handleSignOutClick = () => {
        handleSignOut(); // Call the callback function to handle sign out
        enqueueSnackbar("You Signed Out Successfully", { variant: 'success' });
        navigate("/");
    };

    return (
        <div>
            <nav className="fw-bold navbar navbar-expand-lg bg-primary">
                <div className="container-fluid">
                    <div className="text-light fs-1 fst-italic mx-2 py-0">User Details</div>
                    {(!localStorage.getItem("authToken") && mode !== 'offline') ? (
                        <div className="d-flex my-1">
                            <Link type="button" className="btn btn-light mx-2 fw-bold" to="/signin">Sign In</Link>
                            <Link type="button" className="btn btn-light  mx-2 fw-bold" to="/signup">Sign Up</Link>
                        </div>
                    ) : (
                        <div>
                            {(mode !== 'offline') ? (
                                <div className="d-flex my-1">
                                    <div type="button" className="btn mx-2 btn-danger fw-bold" onClick={handleSignOutClick}>Sign Out</div>
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>
            </nav>
        </div>
    )
}
