import React from 'react';

import { Container, Row, Col, Input } from 'reactstrap';

const Response = ({ choice, option='', answer, onClick=() => {}, onChange=() => {} }) => {
    let styles = {
        wrapper: {
            borderBottom: '1px solid #CCCCCC',
            fontSize: '15px',
            padding: '20px 30px',
            lineHeight: '30px'
        },
        choiceBox: {
            border: '2px solid #CCCCCC',
            padding: '5px 7px',
            borderRadius: '2px',
            textAlign: 'center',
            cursor: 'pointer'
        },
        option: {
            paddingLeft: '15px',
            fontFamily: ['SourceSansProRegular', 'sans-serif'],
            alignSelf: 'center'
        },
        row: {
            alignItems: 'center'
        }
    };

    let optionColWidth = {
        xs: '9',
        sm: '11'
    };

    const capitalChoice = choice.toUpperCase();

    if (answer === choice) {
        styles.choiceBox['color'] = '#457500';
        styles.choiceBox['border'] = '3px solid #457500';
        styles.option['border'] = '3px solid #457500';

    }

    return (
        <div style={styles.wrapper}>
            <Container>
                <Row style={styles.row}>
                    <Col xs='3' sm='1' key='box' onClick={() => onClick(choice)}>
                        <div style={styles.choiceBox}>{capitalChoice}</div>
                    </Col>
                    <Col key='option' { ...optionColWidth }>
                        <Input style={styles.option} value={option} onChange={(e) => onChange(e.target.value)} placeholder={`Opción ${capitalChoice}`} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Response;