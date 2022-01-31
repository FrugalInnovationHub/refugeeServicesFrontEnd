import React from 'react';

import { Navbar, NavbarBrand, NavbarText, Button } from 'reactstrap';

import {
    Link
} from 'react-router-dom';

import { MdMessage } from 'react-icons/md';

import logo from '../images/logo.png';

const Header = (props) => {

    const styles = {
        wrapper: {
            backgroundColor: '#004a9e',
            color: '#FFFFFF',
            position: 'sticky',
            top: 0,
            zIndex: 5,
            boxShadow: '0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.2)'
        },
        innerWrapper: {
            maxWidth: '1028px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '10px'
        }

    }

    return ( 
        <div style={styles.wrapper}>
            <div style={styles.innerWrapper}>
                <Navbar>
                    <Link to='/'>
                        <NavbarBrand>
                            <img
                                src={logo}
                                alt='logo'
                                height='80px'
                            />
                        </NavbarBrand>
                    </Link>
                    <NavbarText>
                        <Button color={styles.wrapper.backgroundColor}>
                            <MdMessage size='2em' color={styles.wrapper.color} />
                        </Button>
                    </NavbarText>
                </Navbar>
                
            </div>
        </div>
    );
}

export default Header;