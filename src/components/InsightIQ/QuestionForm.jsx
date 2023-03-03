import { faPaperPlane, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Container, Form, Input, InputGroup, InputGroupText } from "reactstrap";
import "./InsightIQ.css";

const QuestionForm = ({formRef, questionSubmitHandler, question, onChangeInputHandler, handleShowAlert}) => {
    return (
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
                            onChange={onChangeInputHandler}
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
    );
}

export default QuestionForm;