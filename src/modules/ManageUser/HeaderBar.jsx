import React from 'react';

import { Container, Row, Col } from 'reactstrap';

import Button from '../../components/Button';

import { FaUserPlus } from 'react-icons/fa';

const HeaderBar = ({ onAddUserClick=() => {} }) => {
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
                    <Col sm='6'><Button {...styles.button} onClick={onAddUserClick}><FaUserPlus style={styles.icon} /> Agregar Nuevo Usuario</Button></Col>
                </Row>
            </Container>
        </div>
    )
}

export default HeaderBar;