import React from 'react';

const Title = ({ overflowWrap='break-word', fontSize='28px', lineHeight='32px', color='#444444', margin='60px 0 15px 30px', fontFamily=['Source Sans Pro', 'sans-serif'], children='add something here!!' }) => {
    const styles = {
        overflowWrap,
        fontSize,
        lineHeight,
        color,
        margin,
        fontFamily
    };

    return (<div style={styles}>{children}</div>);
}


export default Title;