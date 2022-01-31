import React from 'react';

import Button from '../Button';
import Title from '../Title';

import { Form, FormGroup, Label, Input, Row, Col, Fade, Collapse } from 'reactstrap';

import { FaExclamationTriangle, FaClock } from 'react-icons/fa';

const Login = ({ title='Inicio de Sesión', logonTitle='Crea una Cuenta', registerationButtonLabel='¿Primer Usuario?', userId, password, confirmPassword, onFieldChange=() => {}, onLoginClick, onLogonCreateClick, error, type='email', mode='login', isLogonSuccess=false }) => {
    let styles = {
        wrapper: {
            boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12)',
            background: '#FFFFFF',
            fontFamily: ['Source Sans Pro', 'sans-serif'],
            fontWeight: '300',
            marginLeft: '15px',
            marginRight: '15px',
            paddingTop: '10px',
            paddingBottom: '10px'
        },
        formElementWrapper: {
            paddingTop: '5px',
            paddingLeft: '30px',
            paddingRight: '30px',
            marginBottom: '5px'
        },
        formButtonWrapper: {
            marginTop: '15px',
            marginLeft: '15px',
            marginRight: '15px',
            width: '-webkit-fill-available',
            size: 'md'
        },
        redButton: {
            backgroundColor: '#CE1126'
        },
        error: {
            color: '#CC3333',
            marginLeft: '15px',
            marginRight: '15px',
            textAlign: 'center',
            marginTop: '10px'
        },
        errorText: {
            marginLeft: '5px'
        },
        success: {
            color: '#39C16C',
            textAlign: 'center',
            padding: '30px',
            fontSize: '21px'
        },
        successText: {
            marginLeft: '10px'
        }
    };

    let userIdFieldLabel;
    let errorMessage;
    let userIdAutoCompleteType;
    let passwordAutoCompleteType;

    if (type === 'email') {
        errorMessage = 'Correo Electrónico o Contraseña no válidos';
        userIdFieldLabel = 'Correo Electrónico';
        userIdAutoCompleteType = 'email';
    } else {
        errorMessage = 'Número de Teléfono o Contraseña no válidos';
        userIdFieldLabel = 'Número de Teléfono';
        userIdAutoCompleteType = 'tel';
    }

    if (mode === 'login') {
        passwordAutoCompleteType = 'current-password';
        userIdAutoCompleteType += ' username';
    } else {   
        passwordAutoCompleteType = 'new-password';
        title = logonTitle;
    }

    return (
        <div>
            <Title>{ title }</Title>
            <div style={styles.wrapper}>
                <Collapse isOpen={!isLogonSuccess}>
                    <Form>
                        <FormGroup style={styles.formElementWrapper}>
                            <Label for={type}>{userIdFieldLabel}</Label>
                            <Input type={type} name={type} id={type} value={userId} placeholder={userIdFieldLabel} autoComplete={userIdAutoCompleteType} onChange={(e) => onFieldChange('userId')(e.target.value)} />
                        </FormGroup>
                        <Collapse isOpen={mode !== 'login'}>
                            <FormGroup style={styles.formElementWrapper}>
                                <Label for='name'>Nombre</Label>
                                <Input type='text' name='name' id='name' placeholder='Ingrese su Nombre' autoComplete='name' onChange={(e) => onFieldChange('name')(e.target.value)} />
                            </FormGroup>
                        </Collapse>
                        <FormGroup style={styles.formElementWrapper}>
                            <Label for='password'>Contraseña</Label>
                            <Input type='password' name='password' id='password' value={password} autoComplete={passwordAutoCompleteType} placeholder='Contraseña' onChange={(e) => onFieldChange('password')(e.target.value)} />
                        </FormGroup>
                        <Collapse isOpen={mode !== 'login'}>
                            <FormGroup style={styles.formElementWrapper}>
                                <Label for='confirmPassword'>Confirmar Contraseña</Label>
                                <Input type='password' name='confirmPassword' id='confirmPassword' value={confirmPassword} autoComplete={passwordAutoCompleteType} placeholder='Confirmar Contraseña' onChange={(e) => onFieldChange('confirmPassword')(e.target.value)} />
                            </FormGroup>
                        </Collapse>
                        <Fade in={error} tag={'div'} style={styles.error}>
                            <FaExclamationTriangle /> <span style={styles.errorText}>{errorMessage}</span>
                        </Fade>
                        <Collapse isOpen={mode === 'login'}>
                            <Row>
                                <Col xs={12} md={{size: 5, offset: 1}}>
                                    <Button {...styles.formButtonWrapper} onClick={() => onLoginClick()}>Iniciar Sesión</Button>
                                </Col>
                                <Col xs={12} md={5}>
                                    <Button {...styles.formButtonWrapper} {...styles.redButton} onClick={() => { onFieldChange('mode')('logon'); onFieldChange('loginError')(false) }}>{registerationButtonLabel}</Button>
                                </Col>
                            </Row>
                        </Collapse>
                        <Collapse isOpen={mode !== 'login'}>
                            <Row>
                                <Col xs={12} md={{size: 5, offset: 1}}>
                                    <Button {...styles.formButtonWrapper} onClick={() => onLogonCreateClick()}>Regístrate</Button>
                                </Col>
                                <Col xs={12} md={5}>
                                    <Button {...styles.formButtonWrapper} {...styles.redButton} onClick={() => onFieldChange('mode')('login')}>Cancelar</Button>
                                </Col>
                            </Row>
                        </Collapse>
                    </Form>
                </Collapse>
                <Collapse isOpen={isLogonSuccess}>
                    <div style={styles.success}>
                        <FaClock /><span style={styles.successText}>El administrador debe aprobar tu pedido en 24 horas. De no recibir respuesta por favor contactar al administrador de Servicios Refugiados de Costa Rica</span>
                    </div>
                </Collapse>
                            
            </div>
        </div>
    );
}

export default Login;