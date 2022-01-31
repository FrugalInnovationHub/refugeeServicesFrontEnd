import React from 'react';

import {
    Switch, Route, Link, useRouteMatch
} from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap';

import Button from '../Button';
import Title from '../Title';

import StatusTree from '../../modules/StatusTree';
import EditMockTestLanding from '../../modules/EditMockTest';
import Documentation from '../../modules/Documentation';
import ManageUser from '../../modules/ManageUser';

const AdminLanding = ({ logoutClick=() => {} }) => {
    let { path } = useRouteMatch();

    const styles = {
        button: {
            backgroundColor: '#004A9E',
            color: '#FFFFFF',
            minWidth: '20rem',
            width: '-webkit-fill-available',
            marginBottom: '15px',
            size: 'lg'
        },
        logoutButton: {
            backgroundColor: '#CE1126',
            color: '#FFFFFF',
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
                                <Button {...styles.button}>Árbol de Decisiones</Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='12' sm='auto'>
                            <Link to={`${path}/edit-mock-test`}>
                                <Button {...styles.button}>Editar Examen de Prueba</Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='12' sm='auto'>
                            <Link to={`${path}/edit-documentation`}>
                                <Button {...styles.button}>Editar Documentación Útil</Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='12' sm='auto'>
                            <Link to={`${path}/manage-users`}>
                                <Button {...styles.button}>Administrar Usuarios</Button>
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
                <StatusTree isEditMode={true} />
            </Route>
            <Route path={`${path}/edit-mock-test`}>
                <EditMockTestLanding />
            </Route>
            <Route path={`${path}/edit-documentation`}>
                <Documentation isEditMode={true} />
            </Route>
            <Route path={`${path}/manage-users`}>
                <ManageUser />
            </Route>
        </Switch>
    )
}

export default AdminLanding;