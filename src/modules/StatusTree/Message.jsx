import React from 'react';

const Explanation = ({ message }) => {
    let styles = {
        wrapper: {
            padding: '40px',
            borderBottom: '1px solid #CCCCCC',
            overflowWrap: 'break-word',
            textAlign: 'justify',
        }
    };

    return (
        <div style={styles.wrapper}>
            <div>
                {message}
            </div>
        </div>
    );
}

export default Explanation;