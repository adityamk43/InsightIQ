import { faArrowDown, faPaperPlane, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast } from "react-toastify";
import { Button, Card, CardText, Col, Container, Form, Input, InputGroup, InputGroupText, Row } from "reactstrap";
import BASE_URL from "../../api/env";
import "./InsightIQ.css";

const InsightIQ = () => {

    // const [index, setIndex] = useState(1);
    const [qaList, setQAList] = useState([]);
    // const [qaObject, setQAObject] = useState({q_id:'', question:'', answer:''});
    const [question, setQuestion] = useState('');
    const listRef = useRef(null);
    const formRef = useRef(null);
    const [remHeight, setRemHeight] = useState(0);
    const [visible, setVisible] = useState(false)
    const [showAlert, setShowAlert] = useState(false);


    const getAllQA = async () => {
        await axios.get(`${BASE_URL}/v1/answer/`)
            .then(response => {
                console.log("QA-List: " + response.data);
                setQAList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const deleteAllQA = async () => {

        await axios.delete(`${BASE_URL}/v1/answer/`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const questionSubmitHandler = async (e) => {
        e.preventDefault();

        if (question === '') {
            toast.warn('Please Type Any Question First!', {
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
        // console.log(question);
        //backend api to be given here!! for now this is hardcoded
        await axios.post(`${BASE_URL}/v1/answer/`, { question: question })
            .then(response => {
                console.log(response.data);
                //To debug and test working in front-end only, use these commented variables!!
                // const answer = "Hello This is a Dev Answer.";
                // const dbObject = { q_id: index, question: question, answer: answer };
                // setIndex(index + 1);

                //to debug if qadata coming from backend is working or not, use these variables!!
                const dbObject = response.data;

                // setQAList(qaList.concat(dbObject)); OR
                setQAList([...qaList, dbObject]);
                setQuestion('');
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleShowAlert = () => {
        setShowAlert(true);
    };

    const handleHideAlert = () => {
        setShowAlert(false);
    };

    const handleConfirmAlert = () => {

        if (qaList.length > 0) {
            setQAList([]);

            deleteAllQA();

            toast.success('Conversation has been deleted successfully!', {
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
            toast.warn('No Conversation exists!', {
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

        setShowAlert(false);
    };


    useEffect(() => {
        // Set body overflow to hidden when the component mounts
        if (formRef.current) {
            setRemHeight(formRef.current.clientHeight);
            // console.log(formRef.current.clientHeight);
        }
        document.body.style.overflow = 'hidden';
        getAllQA();
        return () => {
            // Reset body overflow when the component unmounts
            document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.addEventListener('scroll', toggleVisible);
            listRef.current.scrollTop = listRef.current.scrollHeight;
            // listRef.current.scrollTop = listRef.current.scrollHeight - listRef.current.clientHeight;
            // console.log(listRef);
        }

    }, [qaList]);

    const toggleVisible = () => {
        const { scrollTop, clientHeight, scrollHeight } = listRef.current;

        if (clientHeight === scrollHeight === 568) {
            setVisible(false);
        }
        else if (scrollHeight - scrollTop - clientHeight > 200) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const scrollToBottom = () => {
        listRef.current.scrollTo({
            top: listRef.current.scrollHeight,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour 
               in place of 'smooth' */
        });
    };

    const QAViewWindow = ({ remHeight }) => (
        <Container fluid className="background1 text-white"
            style={{ height: `calc(90.67vh - ${remHeight}px)`, overflowY: 'auto' }}>
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
    );

    return (
        <>
            <SweetAlert
                warning
                showCancel
                show={showAlert}
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                onConfirm={handleConfirmAlert}
                onCancel={handleHideAlert}
                focusCancelBtn
                cancelBtnBsStyle="success"
                customClass="DltSure"
                style={{ backgroundColor: '#343541', color: 'white' }}
            >
                Are you sure you want to delete all your conversations?
            </SweetAlert>


            {
                qaList.length === 0 ?

                    <QAViewWindow remHeight={remHeight} />

                    :

                    (<div ref={listRef} id="qa" className="background1 text-white pt-4"
                        style={{ height: `calc(90.67vh - ${remHeight}px)`, overflowY: 'auto', scrollBehavior: 'smooth' }}>

                        {qaList.map((qa) => <div key={qa.q_id}> <p className="background3 p-4 mx-4 questionDiv">Q: {qa.question}</p> <p className="background2 p-4 mx-4 fst-italic answerDiv">A: {qa.answer}</p></div>)}
                        <Button color="primary" className="scrollDownBtn" onClick={scrollToBottom}
                            style={{ display: visible ? 'inline' : 'none' }}>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </Button>
                    </div>)
            }

            <div ref={formRef} className="p-3 background1">
                <Form onSubmit={questionSubmitHandler}>
                    <Container>

                        <InputGroup>
                            <Input
                                autoComplete="off"
                                id="question"
                                name="question"
                                className="background2 QuestionInput"
                                placeholder="Have a Question? Type Here!!"
                                value={question}
                                onChange={event => setQuestion(event.target.value)}
                            />
                            <InputGroupText className="background2 QuestionInput">
                                <Button color="primary" type="submit" className="sendBtn"><FontAwesomeIcon icon={faPaperPlane} /></Button>
                            </InputGroupText>

                            <InputGroupText className="background1">
                                <Button color="primary" type="reset" className="dltBtn" onClick={handleShowAlert}><FontAwesomeIcon icon={faTrash} /></Button>
                            </InputGroupText>
                        </InputGroup>
                    </Container>

                </Form>
            </div>

        </>
    );
}

export default InsightIQ;