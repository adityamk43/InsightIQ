import React from "react";
import { Card, CardText, Col, Container, Row } from "reactstrap";
import './InsightIQ.css';

const QAViewWindow = ({ remHeight, navHeight }) => {

    return (
        <Container fluid className="background1 text-white qaContainer"
            style={{ height: `calc(100vh - ${remHeight}px - ${navHeight}px)`, overflowY: 'auto' }}>
            <h1 className="pt-5 text-center">Insight IQ</h1>
            <br />
            <h2 className="text-center">
                Get Started!
            </h2>
            <Container>
                <h3 className="mt-5 fs-5 text-center">Features of this App</h3>
                <Row className="fs-6">
                    <Col md={4}>
                        <Card
                            body
                            className="my-2 background2"
                        >
                            <CardText>
                                Allow users to search for answers to their questions using relevant keywords or phrases.
                            </CardText>
                        </Card>
                        <Card
                            body
                            className="my-2 background2"
                        >
                            <CardText>
                                Enable users to create accounts and save their questions, answers, and preferences for future reference.
                            </CardText>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card
                            body
                            className="my-2 background2"
                        >
                            <CardText>
                                Use machine learning algorithms to recommend answers to users based on their preferences, and behavior on the platform.
                            </CardText>
                        </Card>
                        <Card
                            body
                            className="my-2 background2"
                        >
                            <CardText>
                                Ensure the app is fully responsive and optimized for mobile devices, so users can access it from anywhere at any time.
                            </CardText>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card
                            body
                            className="my-2 background2"
                        >
                            <CardText>
                                Allow users to search and submit questions and answers in multiple languages.
                            </CardText>
                        </Card>
                        <Card
                            body
                            className="my-2 background2"
                        >
                            <CardText>
                                Use machine translation to automatically translate questions and answers between languages, based on user preferences.
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </Container>
    )
};

export default QAViewWindow;