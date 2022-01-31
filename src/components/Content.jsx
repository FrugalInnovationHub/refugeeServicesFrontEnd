import React from 'react';

import {
    Switch, Route, Link
} from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap';

import Button from './Button';
import Title from './Title';

import Client from './Client';
import Admin from './Admin';
import Agent from './Agent';

const Content = () => {
    const styles = {
        wrapper: {
            maxWidth: '1028px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '75px'
        },
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
        <div style={styles.wrapper}>
            <Switch>
                <Route exact path='/'>
                    <Title>Bienvenidas</Title>
                    <Container>
                        <Row>
                            <Col xs='12' sm='auto'>
                                <Link to='/client'>
                                    <Button {...styles.button}>Cliente</Button>
                                </Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs='12' sm='auto'>
                                <Link to='/admin'>
                                    <Button {...styles.button}>Administradora</Button>
                                </Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs='12' sm='auto'>
                                <Link to='/agent'>
                                    <Button {...styles.button}>Administradora de casos</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </Route>
                <Route path='/client'>
                    <Client />
                </Route>
                <Route path='/admin'>
                    <Admin />
                </Route>
                <Route path='/agent'>
                    <Agent />
                </Route>
            </Switch>
        </div>
    )
}

export default Content;