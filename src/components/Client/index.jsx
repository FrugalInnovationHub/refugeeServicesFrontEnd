import React from 'react';

import {
    Switch, Route, Link, useRouteMatch
} from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap';

import Button from '../Button';
import Title from '../Title';

import StatusTree from '../../modules/StatusTree';
import MockTest from '../../modules/MockTest';
import Documentation from '../../modules/Documentation';

const Client = (props) => {
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
                            <Link to={`${path}/status-tree`}>
                                <Button {...styles.button}>Árbol de Decisiones</Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='12' sm='auto'>
                            <Link to={`${path}/mock-test`}>
                                <Button {...styles.button}>Examen de Prueba</Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='12' sm='auto'>
                            <Link to={`${path}/documentation`}>
                                <Button {...styles.button}>Documentación Útil</Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </Route>
            <Route path={`${path}/status-tree`}>
                <StatusTree />
            </Route>
            <Route path={`${path}/mock-test`}>
                <MockTest />
            </Route>
            <Route path={`${path}/documentation`}>
                <Documentation title='Documentación Útil'/>
            </Route>
        </Switch>
    )
}

export default Client;