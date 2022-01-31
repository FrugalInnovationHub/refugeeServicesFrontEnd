import React from 'react';

import { Container, Row, Col } from 'reactstrap';

import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Response = ({ choice, option, answer, selected, onClick, isDisabled }) => {
    let styles = {
        wrapper: {
            borderBottom: '1px solid #CCCCCC',
            fontSize: '15px',
            padding: '20px 30px',
            transition: 'all .3s ease-in-out',
            lineHeight: '30px',
            cursor: 'pointer'
        },
        choiceBox: {
            border: '2px solid #CCCCCC',
            padding: '5px 7px',
            borderRadius: '2px',
            textAlign: 'center'
        },
        option: {
            paddingLeft: '15px',
            fontFamily: ['SourceSansProRegular', 'sans-serif'],
            alignSelf: 'center'
        },
        correct: {
            color: '#457500'
        },
        wrong: {
            color: '#CC3333'
        },
        row: {
            alignItems: 'center'
        },
        result: {
            fontSize: '0.7rem'
        }
    };

    let optionColWidth = {
        xs: '9',
        sm: '11'
    };
    let correctnessContent;

    if (selected !== -1) {

        if (selected === choice || answer === choice) {
            optionColWidth = {
                ...optionColWidth,
                xs: '5',
                sm: '9'
            }
        }

        if (selected === choice) {
            styles.wrapper['boxShadow'] = '0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.2)';
            styles.wrapper['background'] = '#F9F9F9';

            styles.choiceBox['color'] = '#CC3333';
            styles.choiceBox['border'] = '3px solid #CC3333';
            correctnessContent = (
                <Col xs='4' sm='2' key='correctness'>
                    <div style={{...styles.result, ...styles.wrong}}><FaTimesCircle /> Incorrecta</div>
                </Col>
            );
        }

        if (answer === choice) {
            styles.choiceBox['color'] = '#457500';
            styles.choiceBox['border'] = '3px solid #457500';
            correctnessContent = (
                <Col xs='4' sm='2' key='correctness'>
                    <div style={{...styles.result, ...styles.correct}}><FaCheckCircle /> Correcta</div>
                </Col>
            );
        }
    }

    return (
        <div style={styles.wrapper} onClick={() => !isDisabled && onClick(choice)}>
            <Container>
                <Row style={styles.row}>
                    <Col xs='3' sm='1' key='box'>
                        <div style={styles.choiceBox}>{choice.toUpperCase()}</div>
                    </Col>
                    <Col key='option' { ...optionColWidth }>
                        <div style={styles.option}>{option}</div>
                    </Col>
                    {correctnessContent}
                </Row>
            </Container>
        </div>
    );
}

export default Response;