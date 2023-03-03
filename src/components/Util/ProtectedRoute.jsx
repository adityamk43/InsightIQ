import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const checkUserToken = () => {
        const accessToken = Cookies.get('accessToken');

        if (!accessToken || accessToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/auth/register');
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    return (
        <>
            {
                isLoggedIn ? props.children : null
            }
        </>
    );
}
export default ProtectedRoute;