import React from 'react';

import { isAgentTokenValid, loginAgent, logonAgent, logoutAgent } from '../../api/auth';

import { getLoggedInUserDetails } from '../../utilities';

import AgentLanding from './AgentLanding';
import Login from '../Login';

import { Spinner } from 'reactstrap';

export default class Agent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            password: '',
            confirmPassword: '',
            name: '',
            mode: 'login',
            isLoggedIn: null,
            loginError: false,
            isLogonSuccess: false
        }

        this.onLoginClick = this.onLoginClick.bind(this);
        this.onLogonClick = this.onLogonClick.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    componentDidMount() {
        const { type, userId, token } = getLoggedInUserDetails();

        if (type === null || userId === null || token === null || type !== 'AGENT') {
            this.setState({
                isLoggedIn: false,
                loginError: false
            });
            
        } else {
            isAgentTokenValid().then(isValid => {
                this.setState({
                    isLoggedIn: isValid,
                    loginError: false
                });
            });
        }
    }

    onLoginClick() {
        const { userId, password } = this.state;

        loginAgent(userId, password).then(status => {
            this.setState({
                isLoggedIn: status === 200,
                loginError: status !== 200
            });
        });
    }

    onLogonClick() {
        const { userId, password, confirmPassword, name } = this.state;

        logonAgent(userId, password, confirmPassword, name).then(status => {
            this.setState({
                isLogonSuccess: status === 201 
            });
        });
    }

    onLogoutClick() {
        logoutAgent().then(status => {
            this.setState({
                isLoggedIn: status !== 204
            });
        })
    }

    onFieldChange(field) {
        return (value) => {
            this.setState({
                [field]: value 
            });
        }
    }

    render() {
        const { isLoggedIn, userId, password, confirmPassword, mode, loginError, isLogonSuccess } = this.state;

        let content;

        if (isLoggedIn === null) {
            content = <div style={{ textAlign: 'center' }}><Spinner /></div>;
        } else if (isLoggedIn) {
            content = <AgentLanding />;
        } else {
            content = <Login 
                title={'Inicio de Sesión del Administrador de Casos'} 
                logonTitle={'Registrador de Casos'} 
                registerationButtonLabel={'¿Nuevo Administrador de Casos?'} 
                type={'email'} 
                userId={userId} 
                password={password} 
                confirmPassword={confirmPassword} 
                onFieldChange={this.onFieldChange} 
                onLoginClick={this.onLoginClick} 
                onLogonCreateClick={this.onLogonClick} 
                error={loginError} 
                mode={mode}
                isLogonSuccess={isLogonSuccess}
            />;
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}
