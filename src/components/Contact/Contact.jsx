import { faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, CardBody, CardText, Col, Container, Row } from "reactstrap";
import Footer from "../Footer/Footer";

const Contact = () => {
    return (
        <>
            <Container style={{ minHeight: '66.5vh' }} >
                <h1 className="text-center pt-5 pb-4 px-5"
                    style={{
                        fontStyle: 'italic',
                        fontFamily: 'cursive'
                    }}>Follow Me On</h1>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col md={10}>
                        <Card
                            className="my-2 p-3"
                            style={{
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                            }}
                        >
                            <CardBody>
                                <CardText>
                                    <ul className="nav justify-content-center list-unstyled d-flex">
                                        <li className="mx-5"><a href="https://twitter.com/AdityaB55261776?t=oy7wcdP5YqbPn_35TK6K5A&s=08" target={"_blank"} rel="noopener noreferrer" className="text-white" ><FontAwesomeIcon icon={faTwitter} size="4x" style={{ color: "#1DA1F2" }} beatFade /></a></li>

                                        <li className="mx-5"><a href="https://instagram.com/ig_remonz?igshid=YmMyMTA2M2Y=" target={"_blank"} rel="noopener noreferrer" className="text-white" ><FontAwesomeIcon icon={faInstagram} size="4x" style={{ color: "#E1306C" }} beatFade /></a></li>
                                        <li className="mx-5"><a href="https://www.linkedin.com/in/aditya-bhardwaj-404466201/" target={"_blank"} rel="noopener noreferrer" className="text-white" ><FontAwesomeIcon icon={faLinkedin} size="4x" style={{ color: "#0077b5" }} beatFade /></a></li>
                                    </ul>
                                </CardText>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}

export default Contact;