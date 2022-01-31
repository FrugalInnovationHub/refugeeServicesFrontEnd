import React from 'react';

import { Modal, ModalHeader, ModalBody, Col, Collapse, Spinner } from 'reactstrap';

import Button from '../../components/Button';

import { FaUserMinus } from 'react-icons/fa';

const DeleteUserModal = ({ isOpen, toggle, onDeleteClick=() => {}, loader=true, userToDelete={} }) => {
    const styles = {
        button: {
            size: 'md',
            marginTop: '15px',
            width: '-webkit-fill-available'
        },
        icon: {
            marginRight: '5px',
        }
    }

    const { _id, name } = userToDelete;
    let { userId, userType } = userToDelete;

    if (name !== null && name !== undefined && name !== '') {
        userId = `${name} (${userId})`;
    }

    if (userType === 'ADMIN') {
        userType = 'Administrador';
    } else if (userType === 'AGENT') {
        userType = 'Administrador de Casos';
    } else {
        userType = 'Usuario';
    }

    const message = `¿Desea eliminar el ${userType}, ${userId}?`;

    return (
        <Modal scrollable={true} isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Eliminar {name}</ModalHeader>
            <ModalBody>
                <Collapse isOpen={loader} style={{ textAlign: 'center' }}>
                    <Spinner />
                </Collapse>
                <Collapse isOpen={!loader}>
                    <Col>
                        {message}
                    </Col>
                    <Col sm={{size: 6, offset: 3}}>
                        <Button {...styles.button} onClick={() => onDeleteClick(_id)}><FaUserMinus style={styles.icon} /> Eliminar</Button>
                    </Col>
                </Collapse>
            </ModalBody>
        </Modal>
    )
}

export default DeleteUserModal;