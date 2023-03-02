import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import './Login.css';
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL from "../../api/env";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        // console.log("name: " + name + "\nvalue: " + value);
        setFormData({ ...formData, [name]: value });
    }

    const doLogin = async () =>
    {
        await axios.post(`${BASE_URL}/user/login/`, formData)
        .then(response => {
            console.log(response.data);
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
            const errorData=errors.response.data.errors.non_field_errors[0]
            console.log(errorData);
            toast.error(<div>Login Unsuccesfull! <br/> {errorData}</div>, {
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

        if (formData.email === '' || formData.password === '')
        {
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
        else 
        {
            doLogin();
        }
        setFormData({email: '', password: ''});
    }

    return (
        <div className="background">
            <Container className="pt-5 px-md-5">
                <Row>
                    <Col md={8} className="offset-md-2">
                        <Card className="backgroundForm">
                            <CardBody>
                                <CardTitle tag="h2" className="text-center">
                                    Login Here
                                    <br />
                                    <Button color="link" className="fst-italic"><Link to="/register">(New User? Singup here)</Link></Button>
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
    )
}

export default Login;