import React from "react";
import { Outlet } from "react-router-dom";
import MyNavbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Auth = () => {
    return (
        <>
            <MyNavbar />
            <Outlet />
            <Footer/>
        </>
    );
}
export default Auth;