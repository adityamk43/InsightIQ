import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardText, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import './Register.css';
import BASE_URL from '../../../api/env';
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

const Register = () => {

    const [formData, setFormData] = useState({ email: '', name: '', password: '', password2: '' })
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        // console.log("name: " +name + "\nvalue: " + value );
        setFormData({ ...formData, [name]: value });
    }

    const doRegister = async () => {
        await axios.post(`${BASE_URL}/user/register/`, formData)
            .then(response => {
                console.log(response.data);
                const token = response.data.token
                const access_token = token.access;
                const refresh_token = token.refresh;

                if (!token) {
                    toast.error("Unable to Register. Please try after some time.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    return;
                }

                // const tenSeconds = 10; // 10 seconds
                // const expirationDate = new Date(Date.now() + (tenSeconds * 1000)); // 10 seconds from now
                const twentyFiveMinutes = 25 * 60; // 25 minutes in seconds
                const expirationDate = new Date(Date.now() + (twentyFiveMinutes * 1000)); // 25 minutes from now
                Cookies.set('accessToken', access_token, { expires: expirationDate });
                Cookies.set('refreshToken', refresh_token, { expires: expirationDate });

                setTimeout(() => {
                    navigate('/insight-iq');
                }, 500);

                toast.success("User Registered Successfully!!", {
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
                const errorData = errors.response.data.errors.email[0]
                console.log(errorData);
                toast.error(<div>Login Unsuccesful! <br /> {errorData}</div>, {
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

        if (formData.email === '' || formData.name === '' || formData.password === '' || formData.password2 === '') {
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
            toast.error("Password and Confirm Password Doesn't match!", {
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
            doRegister();
        }
        setFormData({ email: '', name: '', password: '', password2: '' });
    }

    return (
        <>
            <div className="backgroundRegister">
                <Container className="pt-5 px-md-5">
                    <Row>
                        <Col md={8} className="offset-md-2">
                            <Card className="backgroundForm">
                                <CardBody>
                                    <CardTitle tag="h2" className="text-center">
                                        Register Here
                                        <br />
                                        <Button color="link" className="fst-italic"><Link to="/auth/login">(Existing User? Login here)</Link></Button>
                                    </CardTitle>
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
                                            <FormGroup>
                                                <Label for="name">
                                                    Username
                                                </Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    placeholder="Type your Username"
                                                    type="text"
                                                    onChange={handleOnChange}
                                                    value={formData.name}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="password">
                                                    Password
                                                </Label>
                                                <Input
                                                    id="password"
                                                    name="password"
                                                    placeholder="Enter your Password"
                                                    type="password"
                                                    onChange={handleOnChange}
                                                    value={formData.password}
                                                />
                                            </FormGroup>

                                            <FormGroup>
                                                <Label for="password2">
                                                    Confirm Password
                                                </Label>
                                                <Input
                                                    id="password2"
                                                    name="password2"
                                                    placeholder="Cofirm your Password"
                                                    type="password"
                                                    onChange={handleOnChange}
                                                    value={formData.password2}
                                                />
                                            </FormGroup>

                                            <Container className="text-center pt-5 pb-3">
                                                <Button className="submitBtn" type="submit">
                                                    Register
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
        </>
    )
}

export default Register;