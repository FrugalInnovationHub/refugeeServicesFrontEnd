import React from 'react';

import { Container, Row, Col, Collapse } from 'reactstrap';

import { FaCheckCircle, FaTimesCircle, FaRedo } from 'react-icons/fa';
import { ImCool2, ImSad2 } from 'react-icons/im';

import Button from '../../components/Button';

const ScoreCard = ({ correctAnswers, wrongAnswers, total=1, passPercentage, showResult=false, onRetest=() => {}, passMessage='', failMessage='' }) => {
    const styles = {
        wrapper: {
            margin: '30px 0 20px 0'
        },
        general: {
            boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12)',
            padding: '30px',
            fontSize: '2rem',
            backgroundColor: '#FFFFFF',
            textAlign: 'center'
        },
        correct: {
            color: '#457500',
        },
        wrong: {
            color: '#CC3333',
        },
        count: {
            paddingLeft: '15px'
        },
        icon: {
            marginLeft: '-20px',
            marginRight: '5px',
        },
        innerWrapper: {
            marginTop: '20px',

            padding: '10px',
            marginLeft: '10px',
            marginRight: '10px'
        },
        button: {
            size: 'md',
            width: '-webkit-fill-available',
            backgroundColor: '#FFFFFF',
            color: '#004a9e'
        },
        reactionIcon: {
            fontSize: '70px'
        },
        percentage: {
            fontSize: '50px'
        }
    };

    let percentage = Number(Math.round((100 * correctAnswers / total)+'e' + 2) + 'e-' + 2);
    let out = {
        style: {
            backgroundColor: styles.correct.color,
            color: 'white'
        },
        icon: <ImCool2 style={{...styles.icon, ...styles.reactionIcon}} />,
        message: passMessage
    }
    if (passPercentage > percentage) {
        out = {
            style: {
                backgroundColor: styles.wrong.color,
                color: 'white'
            },
            icon: <ImSad2 style={{...styles.icon, ...styles.reactionIcon}} />,
            message: failMessage
        }
    }

    return (
        <div style={styles.wrapper}>
            <Container>
                <Row>
                    <Col xs={{ size: '4', offset: 1 }} style={{...styles.general, ...styles.correct}}>
                        <FaCheckCircle style={styles.icon} /><span style={styles.count}>{correctAnswers}</span>
                    </Col>
                    <Col xs={{ size: '4', offset: 2 }} style={{...styles.general, ...styles.wrong}}>
                        <FaTimesCircle style={styles.icon} /><span style={styles.count}>{wrongAnswers}</span>
                    </Col>
                </Row>
            </Container>
            <Collapse isOpen={showResult} style={{ textAlign: 'center' }}>
                <div style={{...styles.general, ...styles.innerWrapper, ...out.style}}>
                    <div>
                        {out.icon}<br />
                        <div><span style={styles.percentage}>{percentage}</span> %</div>
                        {out.message}
                    </div>
                    <Button {...styles.button} onClick={onRetest}><FaRedo style={styles.icon} /> Volver a Tomar la Prueba</Button>
                </div>
            </Collapse>
        </div>
    );
}

export default ScoreCard;