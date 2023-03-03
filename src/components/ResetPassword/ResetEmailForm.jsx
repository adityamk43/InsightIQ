import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import "./ResetPassword.css";
import BASE_URL from "../../api/env";
import axios from "axios";
import MyNavbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

const ResetEmailForm = () => {

    const [formData, setFormData] = useState({email: ''});

    const handleOnChange = (e) => {
        const email = e.target.value;
        // console.log("name: " + name + "\nvalue: " + value);
        setFormData({email: email});
    }

    const sendResetLinkToMail = async () => {
        await axios.post(`${BASE_URL}/user/send-reset-password-email/`, formData)
            .then(response => {
                console.log(response.data);

                toast.success("Reset Link has been sent to your Respective Email!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
            .catch(errors => {
                const errorData = errors.response.data.errors.non_field_errors[0]
                console.log(errorData);
                toast.error(<div>Unable to Reset Password!! <br /> {errorData}</div>, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
    }


    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formData);

        if (formData === '') {
            toast.warn("Fill Email correctly!!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            sendResetLinkToMail();
        }
        setFormData({email: ''});
    }



    return (
        <>
            <MyNavbar />
            <div className="backgroundLoginResetPassword">
                <Container className="pt-5 px-md-5">
                    <Row>
                        <Col md={8} className="offset-md-2">
                            <Card className="backgroundFormResetPassword">
                                <CardBody>
                                    <CardTitle tag="h2" className="text-center pt-4 ">
                                        Enter Your Verified Email Address
                                    </CardTitle>
                                    <CardSubtitle
                                        className="text-center text-muted pb-5"
                                        tag="h6"
                                    >
                                        Reset Password Link will be send to your Entered Email Address
                                        <br />
                                        <Button color="link" className="fst-italic"><Link to="/auth/login">(Go Back)</Link></Button>
                                    </CardSubtitle>
                                    <CardText tag={"div"} className="px-md-5 pt-1">
                                        <Form onSubmit={onSubmitHandler}>
                                            <FormGroup>
                                                <Label for="email">
                                                    Email
                                                </Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    placeholder="Type your Email"
                                                    type="email"
                                                    onChange={handleOnChange}
                                                    value={formData.email}
                                                />
                                            </FormGroup>

                                            <Container className="text-center pt-5 pb-3">
                                                <Button className="submitBtnResetPassword" type="submit">
                                                    Send Rest Link
                                                </Button>
                                            </Container>
                                        </Form>
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default ResetEmailForm;