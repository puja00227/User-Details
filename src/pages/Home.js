import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Card from '../components/Card';
import { useSnackbar } from 'notistack';

const STYLES = {
    position: 'fixed',
    top: '90%',
    left: '85%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
}

export default function Home() {
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState();
    const [sortOption, setSortOption] = useState(localStorage.getItem('sortOption') || 'A-Z');
    const [searchTerm, setSearchTerm] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const [mode, setMode] = useState('online');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:5555/users/alluser', { signEmail: localStorage.getItem('signEmail'), sort: sortOption });
                setUsers(response.data.data);
                setCount(response.data.count);
                localStorage.setItem('users', JSON.stringify(response.data.data))
                localStorage.setItem('counts', JSON.stringify(response.data.count))
            } catch (error) {
                setMode("offline")
                enqueueSnackbar("You are OFFLINE! Please enable WI-FI / Mobile Data!", { variant: 'warning' });
                let usersLocal = localStorage.getItem('users');
                let countLocal = localStorage.getItem('counts');
                setUsers(JSON.parse(usersLocal));
                setCount(JSON.parse(countLocal));
            }
        };
        fetchData();
    }, [sortOption, enqueueSnackbar]);

    const handleSortChange = (newSortOption) => {
        setSortOption(newSortOption);
        localStorage.setItem('sortOption', newSortOption);
    };

    const handleSearch = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
    };

    const filteredUsers = users ? users.filter((user) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            user.Name.toLowerCase().includes(lowerCaseSearchTerm) ||
            user.Email.toLowerCase().includes(lowerCaseSearchTerm) ||
            user.Phone.toString().includes(searchTerm)
        );
    }) : [];

    const handleSignOut = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("signEmail");
        setUsers([]);
        setCount(0);
    };

    return (
        <div>
            <Navbar handleSignOut={handleSignOut} mode={mode} />
            <div className="mb-16">
                {(localStorage.getItem("authToken") && mode !== 'offline') ? (
                    <Link to='/users/create' className='btn btn-primary btn-lg p-1 ' style={STYLES}>
                        <MdOutlineAddBox className="fs-1" />
                    </Link>
                ) : null}
                <div>
                    {(count !== 0) ? (
                        <div>
                            <div className="mb-0 p-1" style={{ backgroundColor: "#0dcaf059" }}>
                                <div className="container d-flex flex-wrap justify-content-center">
                                    <div className=" m-2 mx-3 w-75 d-flex gap-4">
                                        <div className="fs-6 fw-bold">FILTER:</div>
                                        <select className='m-0 h-100 w-75 border rounded' value={sortOption} onChange={(e) => handleSortChange(e.target.value)}>
                                            <option value="A-Z">A-Z</option>
                                            <option value="Z-A">Z-A</option>
                                            <option value="lastModified">Last Modified</option>
                                            <option value="lastInserted">Last Inserted</option>
                                        </select>
                                    </div>
                                    <div className=" m-2 mt-0 mx-3 w-75 d-flex gap-3">
                                        <div className="fs-6 fw-bold">SEARCH:</div>
                                        <input className='m-0 w-75 h-100 border rounded'
                                            type="text"
                                            placeholder="Search by Name, Email, or Mobile"
                                            value={searchTerm}
                                            onChange={handleSearch}
                                        />
                                    </div>

                                </div>
                            </div>

                            <div>
                                {(mode === 'offline') ? (
                                    <div className="alert alert-warning text-center mb-0" role="alert">
                                        You are OFFLINE!
                                    </div>
                                ) : (null)}
                            </div>

                            <div className="p-5 pt-4 row">
                                {filteredUsers.map((item) => (
                                    <div key={item._id} className='col-12 col-md-6 col-lg-4 col-xl-3 p-0 d-flex justify-content-center'>
                                        <Card user={item} mode={mode} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div>
                                {(mode === 'offline') ? (
                                    <div className="alert alert-warning text-center mb-0" role="alert">
                                        You are OFFLINE!
                                    </div>
                                ) : (null)}
                            </div>

                            <div className="d-flex justify-content-center ">
                                <img src="NoData.jpg" alt="No Data Found" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
