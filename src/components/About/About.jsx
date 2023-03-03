import React, { useState } from "react";
import {
    Container, Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from "reactstrap";
import Footer from "../Footer/Footer";
import MyNavbar from "../Navbar/Navbar";
import './About.css';

const About = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const items = [
        {
            src: '/carouselImages/bg1.jpg',
            altText: 'JavaScript, often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
            caption: 'Javascript',
            key: 1,
        },
        {
            src: '/carouselImages/s1.jpg',
            altText: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
            caption: 'ReactJs',
            key: 2,
        },
        {
            src: '/carouselImages/s3.jpg',
            altText: 'Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of web development, so you can focus on writing your app without needing to reinvent the wheel. It’s free and open source.',
            caption: 'Django',
            key: 3,
        },
        {
            src: '/carouselImages/s5.jpg',
            altText: 'Angular is an application design framework and development platform for creating efficient and sophisticated single-page apps.',
            caption: 'Angular',
            key: 4,
        },
    ];

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item) => {
        return (
            <CarouselItem
                className="carousel-div"
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img src={item.src} alt={item.altText} className="d-block w-100 slider-image" />
                <CarouselCaption
                    captionText={item.altText}
                    captionHeader={item.caption}
                />
            </CarouselItem>
        );
    });

    return (
        <>
            <MyNavbar />
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            // {...args}
            >
                <CarouselIndicators
                    items={items}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                />
                {slides}
                <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={previous}
                />
                <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={next}
                />
            </Carousel>

            <Container
                className="fs-5 mt-5"
                style={{ minHeight: "66.5vh", fontFamily: 'monospace', fontStyle: 'italic' }}
            >

                I am a 4th Year B. Tech Computer
                Science Student studying in Amity University. I have learned various skills that are required in
                web development.
                These slides were showing some of my skills that I hone but I am not limited to these skills only ;&#41;. I have developed many projects using java, django, nodejs in backend and reactjs, angular and bootstrap in frontend. I have a experience as a Web
                Developer Intern in Burgwalden, Germany where I have worked as a SpringBoot Java backend Developer. Currently, I am focusing on learning new skills and experience and problem solving skills through DSA.

                This is my first Project based on Artificial intelligence. This app is mainly based on Question Answer System where user can ask their doubts and question and in the backend user's question are processed through Natural Language Processing through the Middleware GPT-3 Model which uses mixture of DaVince, Babbage and Ada engine to answer that particular given question accordingly.

                Thank You!
                <br />
                <br />
                (<a href="https://www.linkedin.com/in/aditya-bhardwaj-404466201/">Want to know more about me! then check out my linkedIn page and also follow me there :&#41;</a>)

            </Container>
            <Footer />
        </>
    );
}

export default About;