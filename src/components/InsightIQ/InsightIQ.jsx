import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast } from "react-toastify";
import { Button, Col, Container, Row } from "reactstrap";
import BASE_URL from "../../api/env";
import Cookies from "js-cookie";
import "./InsightIQ.css";
import UserDashboard from "./UserDashboard";
import { useNavigate } from "react-router-dom";
import OffcanvasDashboard from "./OffcanvasDashboard";
import QAList from "./QAList";
import QAViewWindow from "./QAViewWindow";
import QuestionForm from "./QuestionForm";
import MyNavbar from "../Navbar/Navbar";

const InsightIQ = () => {

    // const [index, setIndex] = useState(1);
    const [qaList, setQAList] = useState([]);
    // const [qaObject, setQAObject] = useState({q_id:'', question:'', answer:''});
    const [question, setQuestion] = useState('');
    const listRef = useRef(null);
    const formRef = useRef(null);
    const [remHeight, setRemHeight] = useState(0);
    const [navHeight, setNavHeight] = useState(0);
    const [visible, setVisible] = useState(false)
    const [showAlert, setShowAlert] = useState(false);
    const [showLogoutAlert, setShowLogoutAlert] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isCookieExpired, setIsCookieExpired] = useState(false);
    const navigate = useNavigate();

    const checkUserToken = () => {
        const accessToken = Cookies.get('accessToken');
        if (!accessToken || accessToken === 'undefined') {
            setIsLoggedIn(false);
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    useEffect(()=>{

        if (isCookieExpired===true)
        {
            toast.error('Session Expired!', {
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
        }

    }, [isCookieExpired, navigate])

    const logout = () => {

        setTimeout(() => {
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            toast.success('Logout Successful', {
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

    }

    const getAllQA = async () => {
        const accessToken = Cookies.get('accessToken');
        await axios.get(`${BASE_URL}/v1/answer/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(response => {
                // console.log("QA-List: " + response.data);
                setQAList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const deleteAllQA = async () => {

        const accessToken = Cookies.get('accessToken');
        await axios.delete(`${BASE_URL}/v1/answer/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(response => {
                console.log(response.data);
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
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    Cookies.remove('accessToken');
                    Cookies.remove('refreshToken');
                    toast.error('Session Expired!', {
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
                }
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
        const accessToken = Cookies.get('accessToken');
        await axios.post(`${BASE_URL}/v1/answer/`, { question: question }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
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
                if (error.response.status === 401) {
                    Cookies.remove('accessToken');
                    Cookies.remove('refreshToken');
                    toast.error('Session Expired!', {
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
                }
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


    const handleLogoutShowAlert = () => {
        setShowLogoutAlert(true);
    };

    const handleLogoutHideAlert = () => {
        setShowLogoutAlert(false);
    };

    const handleLogoutConfirmAlert = () => {

        logout();
        setShowLogoutAlert(false);
    };



    const onChangeInputHandler = (event) => {
        setQuestion(event.target.value);
    }

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

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleResize = () => {
        const width = window.innerWidth;
        setIsMobile(width <= 576);
    };

    useLayoutEffect(() => {
        const width = window.innerWidth;
        setIsMobile(width <= 576);

        window.addEventListener("resize", handleResize);

    }, []);

    return (
        <>
            <MyNavbar setNavHeight={setNavHeight} />

            {
                isMobile ? (
                    <>
                        <Button onClick={handleToggle} className="offcanvasToggleBtn">
                            <FontAwesomeIcon icon={faBars} />
                        </Button>

                        <OffcanvasDashboard className="Dashboardbackground" isOpen={isOpen} toggle={handleToggle} showLogoutAlert={handleLogoutShowAlert} setIsCookieExpired={setIsCookieExpired} />

                        {
                            qaList.length === 0 ?

                                <QAViewWindow remHeight={remHeight} navHeight={navHeight} />

                                :

                                <QAList listRef={listRef} remHeight={remHeight} qaList={qaList} scrollToBottom={scrollToBottom} visible={visible} navHeight={navHeight} />
                        }

                        <QuestionForm formRef={formRef} handleShowAlert={handleShowAlert} onChangeInputHandler={onChangeInputHandler} question={question} questionSubmitHandler={questionSubmitHandler} />
                    </>
                ) :
                    (
                        <Container fluid>


                            <Row>
                                <Col lg={3} md={4} sm={4} className="Dashboardbackground">
                                    <UserDashboard showLogoutAlert={handleLogoutShowAlert} setIsCookieExpired={setIsCookieExpired} />
                                </Col>
                                <Col lg={9} md={8} sm={8} className="background1">
                                    {
                                        qaList.length === 0 ?

                                            <QAViewWindow remHeight={remHeight} navHeight={navHeight} />

                                            :

                                            <QAList listRef={listRef} remHeight={remHeight} qaList={qaList} scrollToBottom={scrollToBottom} visible={visible} navHeight={navHeight} />
                                    }

                                    <QuestionForm formRef={formRef} handleShowAlert={handleShowAlert} onChangeInputHandler={onChangeInputHandler} question={question} questionSubmitHandler={questionSubmitHandler} />

                                </Col>
                            </Row>
                        </Container>
                    )
            }

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

            <SweetAlert
                warning
                showCancel
                show={showLogoutAlert}
                confirmBtnText="Yes"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                onConfirm={handleLogoutConfirmAlert}
                onCancel={handleLogoutHideAlert}
                focusCancelBtn
                cancelBtnBsStyle="success"
                customClass="DltSure"
                style={{ backgroundColor: '#343541', color: 'white' }}
            >
                Do you want to Logout?
            </SweetAlert>

        </>
    );
}

export default InsightIQ;