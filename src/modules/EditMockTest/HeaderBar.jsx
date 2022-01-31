import React from 'react';

import { Container, Row, Col, FormGroup, Input } from 'reactstrap';

import Button from '../../components/Button';

import { FaPlus, FaCog } from 'react-icons/fa';

const HeaderBar = ({ onAddClick=() => {}, onSettingsClick=() => {}, onSearch=() => {} }) => {
    const styles = {
        wrapper: {
            paddingTop: '20px'
        },
        button: {
            size: 'md',
            width: '-webkit-fill-available',
            marginBottom: '10px'
        },
        icon: {
            marginRight: '5px',
        }
    };
    return (
        <div style={styles.wrapper}>
            <Container>
                <Row>
                    <Col lg={3}><Button {...styles.button} onClick={onAddClick}><FaPlus style={styles.icon} /> Añadir Nueva Pregunta</Button></Col>
                    <Col lg={3}><Button {...styles.button} onClick={onSettingsClick}><FaCog style={styles.icon} /> Configuraciones</Button></Col>
                    <Col lg={6}>
                        <FormGroup>
                            <Input
                                type='search'
                                name='search'
                                onChange={(e) => onSearch(e)}
                                placeholder='Pregunta de Búsqueda...'
                                onKeyPress={(e) => e.which === 13 && onSearch(e)}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HeaderBar;