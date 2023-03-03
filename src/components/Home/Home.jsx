import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import Footer from '../Footer/Footer'
import MyNavbar from "../Navbar/Navbar";
import './Home.css';

const Home = () => {

    const [text, setText] = useState("");
    const [subtext, setSubtext] = useState("");
    const [fullText] = useState(
        "Welcome to Insight IQ Website."
    )
    const [subFullText] = useState(" Get answers to all your questions with Insight IQ! Our powerful search engine scours the web to bring you the most accurate and helpful information on any topic.")
    const [index, setIndex] = useState(0)
    const [subindex, setSubindex] = useState(0)

    const [isHDone, setHDone] = useState("false");

    useEffect(() => {
        if (index < fullText.length) {
            setTimeout(() => {
                setText(text + fullText[index]);
                setIndex(index + 1);
            }, 40)
        }
        if (index === fullText.length) {
            // console.log(index + " " + fullText.length)
            setHDone(true);
        }

    }, [index, fullText, text])

    useEffect(() => {
        if (isHDone === true) {
            if (subindex < subFullText.length) {
                setTimeout(() => {
                    setSubtext(subtext + subFullText[subindex]);
                    setSubindex(subindex + 1);
                }, 20)
            }
        }
    }, [isHDone, subtext, subindex, subFullText]);

    return (
        <>
            <MyNavbar/>
            <div style={{
                height: '100vh',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/homeWallpaper.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat'
            }}
                className="d-flex justify-content-center align-items-center">
                <Container className="text-white text-center fonts">
                    <h1 className="text-bold display-1">
                        {text}
                    </h1>
                    <p className="my-5 h1">
                        {subtext}
                    </p>
                    <Link to="/insight-iq">
                        <Button className="fs-2">
                            Try Insight IQ!
                        </Button>
                    </Link>
                </Container>
            </div >
            <Container>
                <Row style={{ backgroundColor: 'white' }} className="my-5 p-3 rounded">
                    <Col md="3">
                        <img src="/images/homeQACard.jpg" className="img-fluid rounded" alt="" />
                    </Col>
                    <Col md="9" className="fs-4 py-5">
                        Say goodbye to endless searching and frustration. Insight IQ simplifies the process of finding answers to your most pressing questions, so you can get on with your day.
                    </Col>
                </Row>
                <Row style={{ backgroundColor: 'white' }} className="my-5 p-3 rounded">
                    <Col md="9" className="fs-4 py-5">
                        Stop wasting time scouring the internet for answers. Insight IQ gives you access to a wealth of knowledge and expertise, all in one easy-to-use platform
                    </Col>
                    <Col md="3" >
                        <img src="/images/homeQACard1.jpg" className="img-fluid rounded" alt="" />
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </>
    );
}

export default Home;