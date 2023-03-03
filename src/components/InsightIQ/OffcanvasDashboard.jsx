import { faArrowRightFromBracket, faEnvelope, faTimes, faTrashCan, faUser, faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Offcanvas, OffcanvasBody } from "reactstrap";
import BASE_URL from "../../api/env";
import './UserDashboard.css';

const OffcanvasDashboard = ({ className, isOpen, toggle, showLogoutAlert, setIsCookieExpired, handleShowAlert }) => {

    const [userData, setUserData] = useState({ id: "", email: "", name: "" })

    const getUserData = async () => {
        const accessToken = Cookies.get("accessToken");

        axios.get(`${BASE_URL}/user/profile/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(response => {
                // console.log(response.data);
                setUserData(response.data);
            })
            .catch(errors => {
                console.log(errors);
            })
    }

    useEffect(() => {

        if (Cookies.get('accessToken') == null && Cookies.get('refreshToken') == null) {
            setIsCookieExpired(true);
        }
        else
            getUserData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <Offcanvas className={className}
                isOpen={isOpen} toggle={toggle}>
                <OffcanvasBody>
                    <div>
                        <div className="text-end" onClick={toggle} style={{ cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={faTimes} className="text-white" size="lg" />
                        </div>
                        <h4 className="text-center pt-5">Welcome {userData.name}</h4>
                        <ListGroup flush className="mt-5">
                            <ListGroupItem className='border-0 rounded-0 text-white my-3 DashboardListColor'>
                                <FontAwesomeIcon icon={faEnvelope} />&nbsp;&nbsp;{userData.email}
                            </ListGroupItem>
                            <ListGroupItem className='border-0 rounded-0 text-white my-3 DashboardListColor'>
                                <FontAwesomeIcon icon={faUser} />&nbsp;&nbsp; {userData.name}
                            </ListGroupItem>
                            <Link to={"/insight-iq/change-password"} className='border-0 rounded-0 text-white my-3 list-group-item list-group-item-action DashboardListColor'>
                                <FontAwesomeIcon icon={faUserLock} />&nbsp;&nbsp;ChangePassword
                            </Link>
                            <ListGroupItem className='border-0 rounded-0 text-white my-3 DashboardListColor' onClick={() => { handleShowAlert(); toggle(); }}>
                                <FontAwesomeIcon icon={faTrashCan} />&nbsp;&nbsp;Delete Conversation
                            </ListGroupItem>
                            <ListGroupItem className='border-0 rounded-0 text-white my-3 DashboardListColor' onClick={() => {showLogoutAlert(); toggle();}}>
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