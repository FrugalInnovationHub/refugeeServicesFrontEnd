import React from 'react';

import { Container, Row, Col } from 'reactstrap';

import {
    Switch, Route, Link, useRouteMatch
} from 'react-router-dom';

import Button from '../../components/Button';

import StatusTreeComponent from './StatusTreeComponent';

const StatusTreeList = ({ branches, isEditMode }) => {
    let { path } = useRouteMatch();

    const styles = {
        button: {
            backgroundColor: '#004a9e',
            color: '#FFFFFF',
            minWidth: 'unset',
            width: '-webkit-fill-available',
            marginLeft: '7px',
            marginRight: '7px',
            marginBottom: '15px',
            size: 'lg'
        },
        addButton: {
            backgroundColor: '#FFFFFF',
            color: '#004a9e',
        }
    };

    return (
        <Switch>
            <Route exact path={path}>
                <Container>
                    <Row>
                        {isEditMode ? <Col xs='12' key={`status-tree-link-new`}>
                            <Link to={`${path}/new`}>
                                <Button {...{...styles.button, ...styles.addButton}}>Agregar Rama de Árbol de Decisión</Button>
                            </Link>
                        </Col>: null}
                        {
                            branches && branches.map((branch, i) => 
                                <Col xs='12' key={`status-tree-link-${i}`}>
                                    <Link to={`${path}/${branch._id}`}>
                                        <Button {...styles.button}>{branch.label}</Button>
                                    </Link>
                                </Col>
                            )
                        }
                    </Row>
                </Container>
            </Route>
            {
                branches && branches.map((branch, i) => 
                    <Route key={`status-tree-route-${i}`} path={`${path}/${branch._id}`}>
                        <StatusTreeComponent branchId={branch._id} />
                    </Route>
                )
            }
            {isEditMode ? <Route key={`status-tree-route-new`} path={`${path}/new`}>
                WIP
            </Route>: null}
            
        </Switch>
    )
}

export default StatusTreeList;
