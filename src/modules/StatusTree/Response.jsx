import React from 'react';

import { Container, Row, Col } from 'reactstrap';

const Response = ({ index, label, onClick, responseOptions }) => {
    let styles = {
        wrapper: {
            borderBottom: '1px solid #CCCCCC',
            fontSize: '15px',
            padding: '20px 30px',
            transition: 'all .3s ease-in-out',
            lineHeight: '30px',
            cursor: 'pointer'
        },
        choiceBox: {
            border: '2px solid #CCCCCC',
            padding: '5px 7px',
            borderRadius: '2px',
            textAlign: 'center'
        },
        label: {
            paddingLeft: '15px',
            fontFamily: ['SourceSansProRegular', 'sans-serif'],
            alignSelf: 'center'
        },
        row: {
            alignItems: 'center'
        }
    };

    return (
        <div style={styles.wrapper} onClick={() => onClick(responseOptions)}>
            <Container>
                <Row style={styles.row}>
                    <Col key='box' xs='3' sm='1'>
                        <div style={styles.choiceBox}>{index}</div>
                    </Col>
                    <Col key='label' xs='9' sm='11'>
                        <div style={styles.label}>{label}</div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Response;