import React from 'react';

import { Button as B } from 'reactstrap';

const Button = ({ 
        backgroundColor='#004a9e',
        color='#FFFFFF',
        minWidth, maxWidth,
        size, 
        width,
        marginTop, marginLeft, marginRight, marginBottom,
        paddingTop, paddingLeft, paddingRight, paddingBottom,
        border,
        isDisabled=false,
        onClick=() => {}, children='Add something here!!' }) => {
    const buttonStyles = {
        backgroundColor,
        color,
        minWidth, maxWidth,
        width,
        marginTop,
        marginLeft,
        marginRight,
        paddingTop,
        paddingLeft,
        paddingRight,
        paddingBottom,
        marginBottom,
        border
    };

    return (<B style={buttonStyles} size={size} onClick={onClick} disabled={isDisabled}>{children}</B>);
}


export default Button;