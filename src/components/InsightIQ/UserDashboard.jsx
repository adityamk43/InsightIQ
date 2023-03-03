import { faArrowRightFromBracket, faEnvelope, faUser, faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import './UserDashboard.css';
import Cookies from 'js-cookie'
import BASE_URL from "../../api/env";
import { Link } from "react-router-dom";

const UserDashboard = ({ showLogoutAlert, setIsCookieExpired }) => {
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

        if (Cookies.get('accessToken')==null && Cookies.get('refreshToken')==null)
        {
            setIsCookieExpired(true);
        }
        else
            getUserData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
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
                <ListGroupItem className='border-0 rounded-0 text-white my-3 DashboardListColor' onClick={showLogoutAlert}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />&nbsp;&nbsp;Logout
                </ListGroupItem>
            </ListGroup>
        </div>
    )
}

export default UserDashboard;