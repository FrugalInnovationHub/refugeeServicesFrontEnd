import React from 'react';

import { Modal, ModalHeader, ModalBody, Col, Form, FormGroup, Label, Input, Collapse, Spinner, Fade } from 'reactstrap';

import Button from '../../components/Button';

import { FaUserPlus, FaExclamationTriangle } from 'react-icons/fa';

const AddUser = ({ isOpen, toggle, newUserId, newUserType, categoryItems=[], onAddUserTypeChange=() => {}, onFieldChange=() => {}, onSubmit=() => {}, loader=true, error=false }) => {
    const styles = {
        button: {
            size: 'md',
            width: '-webkit-fill-available'
        },
        icon: {
            marginRight: '5px',
        },
        error: {
            color: '#CC3333',
            marginLeft: '15px',
            marginRight: '15px',
            marginBottom: '15px',
            textAlign: 'center'
        },
        errorText: {
            marginLeft: '5px'
        }
    }

    return (
        <Modal size='lg' scrollable={true} isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Agregar Documentación útil</ModalHeader>
            <ModalBody>
                <Collapse isOpen={loader} style={{ textAlign: 'center' }}>
                    <Spinner />
                </Collapse>
                <Collapse isOpen={!loader}>
                    <Form>
                        <FormGroup row>
                            <Label for='filter' sm={3}>Tipo de Usuario</Label>
                            <Col sm={9}>
                                <Input type='select' id='filter' onChange={(e) => onAddUserTypeChange(e.target.value)}>
                                    {
                                        categoryItems && categoryItems.map((item, i) => <option key={i}>{item}</option>)
                                    }
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='username' sm={3}>{ newUserType === 'CLIENT' ? 'Número de Teléfono': 'Correo Electrónico' }</Label>
                            <Col sm={9}>
                                <Input 
                                    type={ newUserType === 'CLIENT' ? 'tel': 'email' } 
                                    name='username' id='username' 
                                    onChange={(e) => onFieldChange('newUserId')(e.target.value)}
                                    value={ newUserId }
                                    autoComplete={ newUserType === 'CLIENT' ? 'tel': 'email' }
                                    label={ newUserType === 'CLIENT' ? 'Número de Teléfono': 'Correo Electrónico' }
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='name' sm={3}>Nombre</Label>
                            <Col sm={9}>
                                <Input 
                                    type='text'
                                    name='name' id='name' 
                                    onChange={(e) => onFieldChange('newName')(e.target.value)}
                                    autoComplete='name'
                                    label='Nombre'
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='newPassword' sm={3}>Contraseña</Label>
                            <Col sm={9}>
                                <Input 
                                    type='password'
                                    name='newPassword' id='newPassword' 
                                    onChange={(e) => onFieldChange('newPassword')(e.target.value)} 
                                    autoComplete='new-password'
                                    label='Contraseña'
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='confirmPassword' sm={3}>Confirmar Contraseña</Label>
                            <Col sm={9}>
                                <Input 
                                    type='password'
                                    name='confirmPassword' id='confirmPassword' 
                                    onChange={(e) => onFieldChange('newConfirmPassword')(e.target.value)}
                                    autoComplete='new-password'
                                    label='Confirmar Contraseña'
                                />
                            </Col>
                        </FormGroup>
                        <Fade in={error} tag={'div'} style={styles.error}>
                            <FaExclamationTriangle /> <span style={styles.errorText}>{'¡Error al Agregar Usuario!'}</span>
                        </Fade>
                        <FormGroup row>
                            <Col sm={{size: 6, offset: 3}}>
                                <Button {...styles.button} onClick={onSubmit}><FaUserPlus style={styles.icon} /> Agregar</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Collapse>
            </ModalBody>
        </Modal>
    )
}

export default AddUser;