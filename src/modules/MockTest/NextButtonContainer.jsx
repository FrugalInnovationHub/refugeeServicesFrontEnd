import React from 'react';

import { Container, Row, Col } from 'reactstrap';

import Button from '../../components/Button';

import { FaAngleRight } from 'react-icons/fa';

import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';


const NextButtonContainer = ({ answer, selected, onClick }) => {
    let styles = {
        wrapper: {
            padding: '10px',
            color: '#FFFFFF',
            borderBottom: '1px solid #CCCCCC',
            fontSize: '20px'
        },
        correct: {
            border: '1px solid #457500'
        },
        wrong: {
            border: '1px solid #CC3333'
        },
        button: {
            backgroundColor:'#FFFFFF',
            minWidth: 'inherit',
            color: '#000000',
            marginBottom: '0',
            size: 'md',
            width: '-webkit-fill-available'
        }
    };

    let content;
    if (selected === -1) {
        return null;
    } else if (answer === selected) {
        styles.wrapper['border'] = '1px solid #457500';
        styles.wrapper['backgroundColor'] = '#457500';

        styles.button['color'] = '#457500';

        content = <span><FaCheckCircle /> Correcta</span>;
    } else {
        styles.wrapper['border'] = '1px solid #CC3333';
        styles.wrapper['backgroundColor'] = '#CC3333';

        styles.button['color'] = '#CC3333';

        content = <span><FaTimesCircle /> Incorrecta</span>;
    }

    return (
        <div style={styles.wrapper}>
            <Container>
                <Row>
                    <Col xs='5'>
                        {content}
                    </Col>
                    <Col xs='7' sm={{size: '4', offset: '3'}}>
                        <Button {...styles.button} onClick={onClick}>Próxima Pregunta<FaAngleRight color={styles.button['color']} /></Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default NextButtonContainer;