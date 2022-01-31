import React from 'react';

import { Modal, ModalHeader, ModalBody, Col, Form, FormGroup, Label, CustomInput, Collapse, Spinner } from 'reactstrap';

import CreatableSelect from 'react-select/creatable';

import Button from '../../components/Button';

import { FaFileMedical } from 'react-icons/fa';

const AddDocumentation = ({ isOpen, toggle, categoryItems=[], onCategoryChange=() => {}, onFileUpload=() => {}, onSubmit=() => {}, loader=true }) => {
    const styles = {
        button: {
            size: 'md',
            width: '-webkit-fill-available'
        },
        icon: {
            marginRight: '5px',
        }
    }

    const options = categoryItems.map((item, i) => {
        return {
            label: item,
            value: item
        };        
    });

    return (
        <Modal size='lg' scrollable={true} isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Agregar Documentación útil</ModalHeader>
            <ModalBody>
                <Collapse isOpen={loader} style={{ textAlign: 'center' }}>
                    <Spinner />
                </Collapse>
                <Collapse isOpen={!loader}>
                    <Form>
                        <FormGroup row>
                            <Label for='fileUpload' sm={2}>Subir archivo</Label>
                            <Col sm={10}>
                                <CustomInput type='file' name='file' id='fileUpload' onChange={onFileUpload} label='Sube documentación útil' />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='filter' sm={2}>Categoría</Label>
                            <Col sm={10}>
                                <CreatableSelect
                                    isSearchable
                                    isClearable
                                    placeholder={'Seleccione...'}
                                    onChange={(newValue: any, actionMeta: any) => onCategoryChange(newValue && newValue.value)}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    menuPlacement={'auto'}
                                    formatCreateLabel={(label) => `Crear categoría: ${label}`}
                                    options={options}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={{size: 6, offset: 3}}>
                                <Button {...styles.button} onClick={onSubmit}><FaFileMedical style={styles.icon} /> Agregar</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Collapse>
            </ModalBody>
        </Modal>
    )
}

export default AddDocumentation;