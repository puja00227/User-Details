import { Link } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineDelete, MdOutlineEmail, MdOutlineInfo } from 'react-icons/md';
import { PiPhoneBold } from "react-icons/pi";


export default function Card({ user, mode }) {
    return (
        <div className="card m-3 container-fluid p-0" style={{ "width": "18rem", "backgroundColor": "#67b6e542" }}>
            <div className='m-4 '>
                <div className="d-flex justify-start align-items-center ">
                    <div>
                        <BiUserCircle className='text-primary fs-4 me-2 my-1 text-center' />
                    </div>
                    <h2 className="my-1 fs-4 text-left">{user.Name}</h2>
                </div>
                <div className="d-flex justify-start align-items-center">
                    <div>
                        <MdOutlineEmail className='text-primary fs-4 me-2 my-1' />
                    </div>
                    <h2 className="my-1 fs-4 text-left">{user.Email}</h2>
                </div>
                <div className="d-flex justify-start align-items-center">
                    <div>
                        <PiPhoneBold className='text-primary fs-4 me-2 my-1' />
                    </div>
                    <h2 className="my-1 fs-4 text-left">{user.Phone}</h2>
                </div>

                {(mode === 'online') ? (
                    <div className="d-flex d-flex justify-content-between pt-3">
                        <Link to={`/users/view/${user._id}`}>
                            <MdOutlineInfo className='text-success fs-2' />
                        </Link>
                        <Link to={`/users/update/${user._id}`}>
                            <AiOutlineEdit className='text-warning fs-2' />
                        </Link>
                        <Link to={`/users/delete/${user._id}`}>
                            <MdOutlineDelete className='text-danger fs-2' />
                        </Link>
                    </div>
                ) : (
                    null
                )}
            </div>
        </div>
    )
}
