import React from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';


export default function Delete() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar()

  const handleDelete = (e) => {
    e.preventDefault()
    axios
      .post(`http://localhost:5555/users/delete/${id}`, { signEmail: localStorage.getItem('signEmail') })
      .then((response) => {
        enqueueSnackbar(response.data.message, { variant: 'error' })
        navigate('/')
      })
      .catch((error) => {
        enqueueSnackbar('Error.', { variant: 'error' })
        console.log(error);
      });
  }

  return (
    <div style={{ backgroundColor: "#020f14", height: '100vh' }}>
      <div className="container " style={{ height: '100vh' }}>
        <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
          <div className="p-4 border border-3 border-dark rounded fs-5 bg-light" style={{ maxHeight: "85%", width: "95%" }}>

            <div className="container-fluid d-flex justify-content-center p-0">
              <div className="fw-bold text-dark fs-1">Delete User</div>
            </div>
            <h3 className="text-2xl text-center">Are you sure you want to delete this User?</h3>
            <div className="d-flex align-items-center justify-content-center">
              <button onClick={handleDelete} className="px-3 btn btn-danger fw-bold fs-5">Delete</button>
              <Link to="/" className="m-3 px-3 btn btn-primary fw-bold fs-5">Cancel</Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
