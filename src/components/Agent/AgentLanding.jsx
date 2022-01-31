import React from 'react';

import {
    Switch, Route, Link, useRouteMatch
} from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap';

import Button from '../Button';
import Title from '../Title';


const AgentLanding = ({ logoutClick }) => {
    let { path } = useRouteMatch();

    const styles = {
        button: {
            backgroundColor: '#004a9e',
            color: '#FFFFFF',
            minWidth: '20rem',
            width: '-webkit-fill-available',
            marginBottom: '15px',
            size: 'lg'
        }
    };

    return (
        <Switch>
            <Route exact path={path}>
                <Title>Bienvenidas</Title>
                <Container>
                    <Row>
                        <Col xs='12' sm='auto'>
                            <Link to={`${path}/edit-status-tree`}>
                                <Button {...styles.button}>&Aacute;rbol de desiciones</Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='12' sm='auto'>
                            <Link to={`${path}/edit-mock-test`}>
                                <Button {...styles.button}>Examen de prueba</Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='12' sm='auto'>
                            <Link to={`${path}/edit-documentation`}>
                                <Button {...styles.button}>Documentaci&oacute;n util</Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='12' sm='auto'>
                            <Button {...styles.button} {...styles.logoutButton} onClick={logoutClick}>Cerrar Sesión</Button>
                        </Col>
                    </Row>
                </Container>
            </Route>
            <Route path={`${path}/edit-status-tree`}>
                Status
            </Route>
            <Route path={`${path}/edit-mock-test`}>
                Mock
            </Route>
            <Route path={`${path}/edit-documentation`}>
                Documentaci&oacute;n util
            </Route>
        </Switch>
    )
}

export default AgentLanding;