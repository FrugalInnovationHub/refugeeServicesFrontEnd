import React from 'react';

import { Container, Row, Col } from 'reactstrap';

import Button from '../../components/Button';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';


const ButtonContainer = ({ isEditMode=false, isBackDisabled=true, hasNextQuestion=true, onBackClick=() => {}, onNextClick=() => {} }) => {
    let styles = {
        wrapper: {
            paddingTop: '15px',
            fontSize: '20px',
        },
        button: {
            size: 'md',
            width: '-webkit-fill-available'
        }
    };

    return (
        <div style={styles.wrapper}> 
            <Container>
                <Row>
                    <Col md={4}>
                        <Button {...styles.button} onClick={onBackClick} isDisabled={isBackDisabled}><FaAngleLeft /> Pregunta Anterior</Button>
                    </Col>
                    {hasNextQuestion ? <Col md={{size: 4, offset: 4}}>
                        <Button {...styles.button} onClick={onNextClick}>Próximo <FaAngleRight /></Button>
                    </Col>: null}
                </Row>
            </Container>
        </div>
    );
}

export default ButtonContainer;