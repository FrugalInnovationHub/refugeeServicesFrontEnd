import React from 'react';

import { Container, Row, Col } from 'reactstrap';

import Img from 'react-advanced-img';

const Prompt = ({ currentQuestion, totalQuestions, prompt }) => {
    const styles = {
        wrapper: {
            padding: '20px 30px',
            borderBottom: '1px solid #CCCCCC',
        },
        questionCounter: {
            paddingBottom: '16px',
            lineHeight: '22px'
        },
        questionTextWrapper: {
            overflowWrap: 'break-word',
            fontSize: '20px',
            lineHeight: '28px',
            textAlign: 'justify'
        },
        questionText: {
            paddingBottom: '15px',
        },
        questionImage: {
            paddingBottom: '15px',
            maxWidth: '-webkit-fill-available'
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.questionCounter}>
                Pregunta {currentQuestion} de {totalQuestions}
            </div>
            <Container style={styles.questionTextWrapper}>
                <Row>
                    <Col xs='2' sm='1'>{currentQuestion}.</Col>
                    <Col xs='10' sm='11'>
                        <div>
                            {
                                prompt && prompt.map((p, i) => {
                                    if (p.type === 'TXT' && p.value !== '') {
                                        return <div key={i} style={styles.questionText}>{p.value}</div>;
                                    } else if (p.type === 'IMG' && p.value !== '') {
                                        return <Img key={i} src={p.value} placeholder='404!!' height={200} style={styles.questionImage}/>;
                                    } else {
                                        return null;
                                    }
                                }).filter(p => p != null)
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Prompt;