import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function View() {
  const [user, setUser] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5555/users/${id}`)
      .then((response) => {
        setUser(response.data.data);
        localStorage.setItem('usersView', JSON.stringify(response.data.data))
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div style={{ backgroundColor: "#020f14", height: '100vh' }}>
      <div className="container " style={{ height: "100vh" }}>
        <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
          <div className="p-4 border border-3 border-dark rounded fs-5 bg-light" style={{ maxHeight: "85%", width: "95%" }}>

            <div className="container-fluid d-flex justify-content-between p-0">
              <div></div>
              <div className="fw-bold text-dark fs-1">User Details</div>
              <Link className='btn btn-danger fs-6 btn-sm px-3 py-0 my-2 d-flex align-items-center' to="/"> X </Link>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-grey-500">User Name: </span>
              <span>{user.Name}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-grey-500">Email address: </span>
              <span>{user.Email}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-grey-500">Mobile Number: </span>
              <span>{user.Phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
