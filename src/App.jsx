import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Content from './components/Content';

import Typography from './Typography';
import TawkTo from './TawkTo';

import {
    BrowserRouter as Router
} from 'react-router-dom';

import bgPattern from './images/bg-pattern.png';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        Typography();
        TawkTo();
    }

    render() {
        const styles = {
            bg: {
                backgroundImage: `url(${bgPattern})`,
                backgroundRepeat: 'repeat',
                overflowY: 'scroll',
                height: '100vh'    
            }
        }
        return (
            <div style={styles.bg}>
                <Router>
                    <Header />
                    <Content />
                </Router>
            </div>
        );
    }
}

export default App;