import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardText, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import './Login.css';
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL from "../../../api/env";
import Cookies from 'js-cookie';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        // console.log("name: " + name + "\nvalue: " + value);
        setFormData({ ...formData, [name]: value });
    }

    const doLogin = async () => {
        await axios.post(`${BASE_URL}/user/login/`, formData)
            .then(response => {
                console.log(response.data);
                const token = response.data.token
                const access_token = token.access;
                const refresh_token = token.refresh;

                if (!token) {
                    toast.error("Unable to Login. Please try after some time.", {
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

                toast.success("Login Successful!!", {
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
                toast.error(<div>Login Unsuccesfull! <br /> {errorData}</div>, {
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

        if (formData.email === '' || formData.password === '') {
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
        else {
            doLogin();
        }
        setFormData({ email: '', password: '' });
    }

    return (
        <>
            <div className="backgroundLogin">
                <Container className="pt-5 px-md-5">
                    <Row>
                        <Col md={8} className="offset-md-2">
                            <Card className="backgroundForm">
                                <CardBody>
                                    <CardTitle tag="h2" className="text-center">
                                        Login Here
                                        <br />
                                        <Button color="link" className="fst-italic"><Link to="/auth/register">(New User? Singup here)</Link></Button>
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
                                                <Container className="text-end py-3">
                                                    <Link to="/reset-password">
                                                        Forgot Password?
                                                    </Link>
                                                </Container>
                                            </FormGroup>

                                            <Container className="text-center pt-5 pb-3">

                                                <Button className="submitBtn" type="submit">
                                                    Login
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

export default Login;