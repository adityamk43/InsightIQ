import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "reactstrap";
import './InsightIQ.css';

const QAList = ({ listRef, remHeight, navHeight, qaList, scrollToBottom, visible }) => {

    return (
        <div ref={listRef} id="qa" className="background1 text-white pt-4 qaContainer"
            style={{ height: `calc(calc(100vh - ${remHeight}px - ${navHeight}px)`, overflowY: 'auto', scrollBehavior: 'smooth' }}>

            {qaList.map((qa) => <div key={qa.q_id}> <p className="background3 p-4 mx-4 questionDiv">Q: {qa.question}</p> <p className="background2 p-4 mx-4 fst-italic answerDiv">A: {qa.answer}</p></div>)}
            <Button color="primary" className="scrollDownBtn" onClick={scrollToBottom}
                style={{ display: visible ? 'inline' : 'none' }}>
                <FontAwesomeIcon icon={faArrowDown} />
            </Button>
        </div>
    )

};

export default QAList;