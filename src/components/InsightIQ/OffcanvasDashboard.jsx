import { faArrowRightFromBracket, faEnvelope, faUser, faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { ListGroup, ListGroupItem, Offcanvas, OffcanvasBody } from "reactstrap";
import BASE_URL from "../../api/env";
import './UserDashboard.css';

const OffcanvasDashboard = ({ className, isOpen, toggle, logout }) => {

    const [userData, setUserData] = useState({ id: "", email: "", name: "" })

    const getUserData = async () => {
        const accessToken = Cookies.get("accessToken");

        axios.get(`${BASE_URL}/user/profile/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(response => {
                console.log(response.data);
                setUserData(response.data);
            })
            .catch(errors => {
                console.log(errors);
            })
    }

    useEffect(() => {
        getUserData();
    }, [])


    return (
        <>
            <Offcanvas className={className}
                isOpen={isOpen} toggle={toggle}>
                <OffcanvasBody>
                    <div>
                        <div className="text-end" onClick={toggle} style={{ cursor: 'pointer' }}>
                            <RxCross1 />
                        </div>
                        <h4 className="text-center pt-5">Welcome {userData.name}</h4>
                        <ListGroup flush className="mt-5">
                            <ListGroupItem className='border-0 rounded-0 text-white my-3 DashboardListColor'>
                                <FontAwesomeIcon icon={faEnvelope} />&nbsp;&nbsp;{userData.email}
                            </ListGroupItem>
                            <ListGroupItem className='border-0 rounded-0 text-white my-3 DashboardListColor'>
                                <FontAwesomeIcon icon={faUser} />&nbsp;&nbsp; {userData.name}
                            </ListGroupItem>
                            <ListGroupItem className='border-0 rounded-0 text-white my-3 DashboardListColor'>
                                <FontAwesomeIcon icon={faUserLock} />&nbsp;&nbsp;ChangePassword
                            </ListGroupItem>
                            <ListGroupItem className='border-0 rounded-0 text-white my-3 DashboardListColor' onClick={logout}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} />&nbsp;&nbsp;Logout
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                </OffcanvasBody>
            </Offcanvas>
        </>
    );
}

export default OffcanvasDashboard