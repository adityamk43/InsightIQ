import React, { useEffect, useRef, useState } from "react";
import { ListGroup, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { Offcanvas, OffcanvasBody } from "reactstrap";
import './Navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const MyNavbar = ({ setNavHeight }) => {

    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [activePath, setActivePath] = useState('/');
    const navRef = useRef(null);

    useEffect(() => {

        if (navRef.current && setNavHeight) {
            setNavHeight(navRef.current.clientHeight);
            // console.log(navRef.current.clientHeight);
        }

    }, [setNavHeight])

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
        <div ref={navRef}>
            <Navbar
                dark
                className="NavbarBackground"
            >
                <NavbarBrand tag={Link} to="/" className="title-font">
                    <img
                        alt="logo"
                        src={process.env.PUBLIC_URL + '/QA.ico'}
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
                    className="NavbarBackground"
                    isOpen={isOpen} toggle={toggle}>
                    <OffcanvasBody>
                        <div className="text-end" onClick={toggle} style={{ cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={faTimes} className="text-white" size="lg" />
                        </div>
                        <ListGroup flush className="mt-5">
                            <Link
                                to="/"
                                className={`border-0 rounded-0 
                            ${activePath === '/' ? 'active' : 'NavbarList'}
                            text-white my-3 my-list-item list-group-item list-group-item-action`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/insight-iq"
                                className={`border-0 rounded-0
                            ${activePath === '/insight-iq' ? 'active' : 'NavbarList'} 
                            text-white my-3 my-list-item list-group-item list-group-item-action`}
                            >
                                Try Insight IQ!
                            </Link>
                            <Link
                                to="/auth/register"
                                className={`border-0 rounded-0
                            ${activePath === '/auth/register' ? 'active' : 'NavbarList'} 
                            text-white my-3 my-list-item list-group-item list-group-item-action`}
                            >
                                Register
                            </Link>
                            <Link
                                to="/about"
                                className={`border-0 rounded-0
                            ${activePath === '/about' ? 'active' : 'NavbarList'} 
                            text-white my-3 my-list-item list-group-item list-group-item-action`}
                            >
                                About
                            </Link>
                            <Link
                                to="/contact"
                                className={`border-0 rounded-0
                            ${activePath === '/contact' ? 'active' : 'NavbarList'} 
                            text-white my-3 my-list-item list-group-item list-group-item-action`}
                            >
                                Contact
                            </Link>
                        </ListGroup>
                    </OffcanvasBody>
                </Offcanvas>
            </Navbar>
        </div>
    );
};

export default MyNavbar;