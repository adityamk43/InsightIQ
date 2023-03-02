import React, { useEffect, useState } from "react";
import { ListGroup, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { Offcanvas, OffcanvasBody } from "reactstrap";
import { RxCross1 } from 'react-icons/rx';
import './Navbar.css';

const MyNavbar = () => {

    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [activePath, setActivePath] = useState('/');

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    // const handleItemClick = (event) => {
    //     setActivePath(event.target.pathname);
    // };

    // useEffect(() => {

    //     setActivePath(window.location.pathname);

    // }, []);

    return (
        <Navbar
            color="secondary"
            dark
            style={{
                background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), #d3d3d3'
            }}
        >
            <NavbarBrand tag={Link} to="/" className="title-font">
                <img
                    alt="logo"
                    src="./QA.ico"
                    style={{
                        height: 40,
                        width: 40
                    }}
                />
                &nbsp;&nbsp;Insight IQ
            </NavbarBrand>

            <NavbarToggler
                onClick={toggle} className="me-2" />
            <Offcanvas
                color="light"
                style={{
                    background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), #d3d3d3',
                    backgroundColor: 'black',
                    color: 'white'
                }}
                isOpen={isOpen} toggle={toggle}>
                <OffcanvasBody>
                    <div className="text-end" onClick={toggle} style={{ cursor: 'pointer' }}>
                        <RxCross1 />
                    </div>
                    <ListGroup flush className="mt-5">
                        <Link
                            to="/"
                            className={`border-0 rounded-0 
                            ${activePath === '/' ? 'active' : ''}
                            text-white my-3 my-list-item list-group-item list-group-item-action`}
                            style={{ backgroundColor: 'black' }}
                        >
                            Home
                        </Link>
                        <Link
                            to="/insight-iq"
                            className={`border-0 rounded-0
                            ${activePath === '/insight-iq' ? 'active' : ''} 
                            text-white my-3 my-list-item list-group-item list-group-item-action`}
                            style={{ backgroundColor: 'black' }}
                        >
                            Try Insight IQ!
                        </Link>
                        <Link
                            to="/register"
                            className={`border-0 rounded-0
                            ${activePath === '/register' ? 'active' : ''} 
                            text-white my-3 my-list-item list-group-item list-group-item-action`}
                            style={{ backgroundColor: 'black' }}
                        >
                            Register
                        </Link>
                        <Link
                            to="/login"
                            className={`border-0 rounded-0
                            ${activePath === '/login' ? 'active' : ''} 
                            text-white my-3 my-list-item list-group-item list-group-item-action`}
                            style={{ backgroundColor: 'black' }}
                        >
                            Login
                        </Link>
                        <Link
                            to="/about"
                            className={`border-0 rounded-0
                            ${activePath === '/about' ? 'active' : ''} 
                            text-white my-3 my-list-item list-group-item list-group-item-action`}
                            style={{ backgroundColor: 'black' }}
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className={`border-0 rounded-0
                            ${activePath === '/contact' ? 'active' : ''} 
                            text-white my-3 my-list-item list-group-item list-group-item-action`}
                            style={{ backgroundColor: 'black' }}
                        >
                            Contact
                        </Link>
                    </ListGroup>
                </OffcanvasBody>
            </Offcanvas>
        </Navbar>
    );
};

export default MyNavbar;