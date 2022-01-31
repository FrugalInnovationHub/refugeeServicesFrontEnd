import React from 'react';

import { Container, Row, Col } from 'reactstrap';

const Prompt = ({ prompt, no=1 }) => {
    const styles = {
        wrapper: {
            padding: '20px 30px',
            borderBottom: '1px solid #CCCCCC',
        },
        questionTextWrapper: {
            overflowWrap: 'break-word',
            textAlign: 'justify',
            fontSize: '20px',
            lineHeight: '28px'
        }
    };

    return (
        <div style={styles.wrapper}>
            <Container style={styles.questionTextWrapper}>
                <Row>
                    <Col xs='2' sm='1'>{no}.</Col>
                    <Col xs='10' sm='11'>{prompt}</Col>
                </Row>
            </Container>
        </div>
    );
}

export default Prompt;