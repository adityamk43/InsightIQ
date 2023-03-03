import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardText, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import "./ResetPassword.css";
import BASE_URL from "../../api/env";
import axios from "axios";
import MyNavbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const ResetPassword = () => {

    const { uid, token } = useParams();
    const [formData, setFormData] = useState({ password: '', password2: '' })
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        // console.log("name: " + name + "\nvalue: " + value);
        setFormData({ ...formData, [name]: value });
    }

    const ResetPassword = async () => {
        await axios.post(`${BASE_URL}/user/reset-password/${uid}/${token}/`, formData)
            .then(response => {
                console.log(response.data);

                setTimeout(() => {
                    toast.success("Password Changed Successfully!!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });

                    navigate('/auth/login');
                }, 500)


            })
            .catch(errors => {
                const errorData = errors.response.data.errors.non_field_errors[0]
                console.log(errorData);
                toast.error(<div>Unable to Change Password!! <br /> {errorData}</div>, {
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

        if (formData.password === '' || formData.password2 === '') {
            toast.warn("Fill all the Fields correctly!!", {
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
        else if (formData.password !== formData.password2) {
            toast.warn("Password and Confirm Password Do not match!!", {
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
            ResetPassword();
        }
        setFormData({ password: '', password2: '' });
    }



    return (
        <>
            <MyNavbar/>
            <div className="backgroundLoginResetPassword">
                <Container className="pt-5 px-md-5">
                    <Row>
                        <Col md={8} className="offset-md-2">
                            <Card className="backgroundFormResetPassword">
                                <CardBody>
                                    <CardTitle tag="h2" className="text-center pb-5">
                                        Reset Password
                                    </CardTitle>
                                    <CardText tag={"div"} className="px-md-5 pt-1">
                                        <Form onSubmit={onSubmitHandler}>
                                            <FormGroup>
                                                <Label for="password">
                                                    New Password
                                                </Label>
                                                <Input
                                                    id="password"
                                                    name="password"
                                                    placeholder="Type your New Password"
                                                    type="password"
                                                    onChange={handleOnChange}
                                                    value={formData.password}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="password2">
                                                    Confirm New Password
                                                </Label>
                                                <Input
                                                    id="password2"
                                                    name="password2"
                                                    placeholder="Confirm your New Password"
                                                    type="password"
                                                    onChange={handleOnChange}
                                                    value={formData.password2}
                                                />
                                            </FormGroup>

                                            <Container className="text-center pt-5 pb-3">
                                                <Button className="submitBtnResetPassword" type="submit">
                                                    Reset Password
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
            <Footer/>
        </>
    );
}

export default ResetPassword;