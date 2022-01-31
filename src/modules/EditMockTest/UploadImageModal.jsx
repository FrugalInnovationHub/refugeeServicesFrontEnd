import React from 'react';

import { Modal, ModalHeader, ModalBody, Col, Form, FormGroup, CustomInput, Collapse, Spinner } from 'reactstrap';

import Button from '../../components/Button';

import { FaFileMedical } from 'react-icons/fa';

const UploadImageModal = ({ isOpen, toggle, onFileUpload=() => {}, onSubmit=() => {}, loader=true }) => {
    const styles = {
        button: {
            size: 'md',
            width: '-webkit-fill-available'
        },
        icon: {
            marginRight: '5px',
        }
    }

    return (
        <Modal size='md' scrollable={true} isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Cargar Imagen</ModalHeader>
            <ModalBody>
                <Collapse isOpen={loader} style={{ textAlign: 'center' }}>
                    <Spinner />
                </Collapse>
                <Collapse isOpen={!loader}>
                    <Form>
                        <FormGroup>
                            <CustomInput type='file' name='file' id='fileUpload' accept='image/*' onChange={(e) => onFileUpload(e.target.files[0])} label='Imagen para Cargar' />
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={{size: 6, offset: 3}}>
                                <Button {...styles.button} onClick={onSubmit}><FaFileMedical style={styles.icon} /> Cargar</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Collapse>
            </ModalBody>
        </Modal>
    )
}

export default UploadImageModal;