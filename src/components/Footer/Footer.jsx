import React from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <>
            <Container fluid className="border-top bg-dark text-white">
                <footer className="py-3 mt-4">
                    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                        <li className="nav-item">
                            <Link to="/" className="nav-link px-2 text-white">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/insight-iq" className="nav-link px-2 text-white">
                                Try Insight IQ!
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link px-2 text-white">
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link px-2 text-white">
                                Contact
                            </Link>
                        </li>
                    </ul>
                    {/* <p class="text-center text-white">&copy; 2023 Aditya Bhardwaj, Inc</p> */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center ">
                        <div className="col-md-4 d-flex align-items-center">
                            <Link to="/" className="mb-3 me-2 mb-md-0 text-white text-decoration-none lh-1">
                                <img src="/QA.ico" className="img-fluid"
                                    width={30}
                                    alt="" />
                            </Link>
                            <span className="mb-3 mb-md-0 text-white">&copy; 2023 Aditya Bhardwaj, Inc</span>
                        </div>

                        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                            <li className="ms-5"><a href="https://twitter.com/AdityaB55261776?t=oy7wcdP5YqbPn_35TK6K5A&s=08" target={"_blank"}  rel="noopener noreferrer"  className="text-white" ><FontAwesomeIcon icon={faTwitter} size="2x" style={{color:"#1DA1F2"}} beat/></a></li>

                            <li className="ms-5"><a href="https://instagram.com/ig_remonz?igshid=YmMyMTA2M2Y=" target={"_blank"}  rel="noopener noreferrer" className="text-white" ><FontAwesomeIcon icon={faInstagram} size="2x" style={{color: "#E1306C"}} beat/></a></li>
                            <li className="ms-5"><a href="https://www.linkedin.com/in/aditya-bhardwaj-404466201/" target={"_blank"}  rel="noopener noreferrer" className="text-white" ><FontAwesomeIcon icon={faLinkedin} size="2x" style={{color: "#0077b5"}} beat/></a></li>
                        </ul>
                    </div>
                </footer>
            </Container>
        </>
    );
}

export default Footer;