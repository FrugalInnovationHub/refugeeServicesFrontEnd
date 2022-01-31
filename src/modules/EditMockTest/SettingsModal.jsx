import React from 'react';

import { Modal, ModalHeader, ModalBody, Col, Form, FormGroup, Input, Collapse, Spinner, Label, FormText } from 'reactstrap';

import Button from '../../components/Button';

import { FaEdit } from 'react-icons/fa';

const SettingsModal = ({ isOpen, toggle, data=[], onSubmit=() => {}, loader=true, onChange=() => {} }) => {
    const styles = {
        button: {
            size: 'md',
            width: '-webkit-fill-available'
        },
        icon: {
            marginRight: '5px',
        }
    }

    const attributes = {
        'mockTest.size.sample': {
            label: 'Número Predeterminado de Preguntas',
            type: 'number',
            min: 0
        },
        'mockTest.pass.percentage': {
            label: 'Porcentaje de Aprobación',
            type: 'range',
            min: 0,
            max: 100,
            step: 0
        },
        'mockTest.pass.message': {
            label: 'Mensaje al Pasar',
            type: 'textarea'
        },
        'mockTest.fail.message': {
            label: 'Mensaje al Fallar',
            type: 'textarea'
        }
    };

    const inputFields = data.map(({ key, value='' }, i) => {
        if (!(key in attributes)) {
            return null;
        }
        const { label, type } = attributes[key];
        
        var hint;

        if (type === 'range' && value) {
            hint = <FormText color='muted' className='float-right'>{value} %</FormText>;
        }

        return <FormGroup row key={key}>
                    <Label for={key} lg={2}>{label}</Label>
                    <Col lg={10}>
                        <Input
                            name={key}
                            id={key}
                            placeholder={ label }
                            value={value || ''}
                            onChange={e => onChange(i, key, e.target.value)}
                            {
                                ...attributes[key]
                            }
                        />
                        {hint}
                    </Col>
                </FormGroup>;
    }).filter(e => e != null);


    return (
        <Modal size='xl' scrollable={true} isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Configuración de Examen de Prueba</ModalHeader>
            <ModalBody>
                <Collapse isOpen={loader} style={{ textAlign: 'center' }}>
                    <Spinner />
                </Collapse>
                <Collapse isOpen={!loader}>
                    <Form>
                        {inputFields}
                        <FormGroup row>
                            <Col sm={{size: 6, offset: 3}}>
                                <Button {...styles.button} onClick={onSubmit}><FaEdit style={styles.icon} /> Actualizar</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Collapse>
            </ModalBody>
        </Modal>
    )
}

export default SettingsModal;