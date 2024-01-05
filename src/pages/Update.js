import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';


export default function Update() {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    axios
      .get(`http://localhost:5555/users/${id}`)
      .then((response) => {
        setName(response.data.data.Name);
        setEmail(response.data.data.Email);
        setPhone(response.data.data.Phone);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault()
    const data = { Name, Email, Phone }
    axios
      .put(`http://localhost:5555/users/${id}`, data)
      .then((response) => {
        if (!response.data.success) {
          enqueueSnackbar(response.data.message, { variant: 'error' })
        }
        else {
          enqueueSnackbar(response.data.message, { variant: 'success' })
          navigate('/')
        }
      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' })
        console.log(error)
      });
  }

  return (
    <div style={{ backgroundColor: "#020f14", height: '100vh' }}>
      <div className="container " style={{ height: '100vh' }}>
        <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
          <div className="p-4 border border-3 border-dark rounded fs-5 bg-light" style={{ maxHeight: "85%", width: "95%" }}>

            <div className="container-fluid d-flex justify-content-between p-0">
              <div></div>
              <div className="fw-bold text-dark fs-1">Update User</div>
              <Link className='btn btn-danger fs-6 btn-sm px-3 py-0 my-2 d-flex align-items-center' to="/"> X </Link>
            </div>

            <form className='text-black' style={{ zIndex: "9" }} onSubmit={handleUpdate}>
              <div className="mb-3">
                <label htmlFor="exampleInput1" className="form-label">User Name</label>
                <input type="text" className="form-control" name="Name" value={Name} onChange={(e) => setName(e.target.value)} placeholder='Enter User Name' />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" name="Email" value={Email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter User Email' />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Mobile Number</label>
                <input type="text" className="form-control" name="Phone" value={Phone} onChange={(e) => setPhone(e.target.value)} placeholder='Enter User Phone Number' />
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
