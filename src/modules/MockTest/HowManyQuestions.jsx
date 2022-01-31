import React from 'react';

import { Col, Form, FormGroup, Input, Label } from 'reactstrap';

import Button from '../../components/Button';

import { FaMarker } from 'react-icons/fa';

const HowManyQuestions = ({ default_value=20, max=50, onChange=() => {}, onSubmit=() => {} }) => {
    const styles = {
        button: {
            size: 'md',
            width: '-webkit-fill-available'
        },
        icon: {
            marginRight: '5px',
        },
        wrapper: {
            padding: '20px 30px',
            borderBottom: '1px solid #CCCCCC',
        }
    }

    return (
        <div style={styles.wrapper}>
            <Form>
                <FormGroup row>
                    <Label for={'questions'}>¿Cuántas preguntas quieres hacer en este simulacro de prueba?</Label>
                    <Input
                        name={'questions'}
                        type={'number'}
                        placeholder={ 'Numero de Preguntas' }
                        value={default_value}
                        onChange={e => onChange(e.target.value)}
                        max={max}
                    />
                </FormGroup>
                <FormGroup row>
                    <Col sm={{size: 6, offset: 3}}>
                        <Button {...styles.button} onClick={onSubmit}><FaMarker style={styles.icon} /> Realizar prueba</Button>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    )
}

export default HowManyQuestions;