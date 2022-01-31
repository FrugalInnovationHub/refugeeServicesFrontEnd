import React from 'react';

import { Container, Row, Col } from 'reactstrap';

import Button from '../../components/Button';

import { FaChevronLeft } from 'react-icons/fa';

const ButtonContainer = ({ onSubmitClick=() => {}, onBackClick=() => {} }) => {
    const styles = {
        button: {
            size: 'md',
            width: '-webkit-fill-available',
            marginTop: '15px',
            marginBottom: '15px'
        }
    };

    return (
        <Container>
            <Row>
                <Col md={6} style={styles.general}>
                    <Button {...styles.button} onClick={onBackClick}><FaChevronLeft /> Cancelar</Button>
                </Col>
                <Col md={6} style={styles.general}>
                    <Button {...styles.button} onClick={onSubmitClick}>Enviar</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default ButtonContainer;