import React from 'react';

import { Container, Row, Col } from 'reactstrap';

import Button from '../../components/Button';

import Filter from '../Filter';

import { FaFileMedical } from 'react-icons/fa';

const HeaderBar = ({ categoryItems=[], onCategoryFilter=() => {}, onAddDocumentationClick=() => {}, isEditMode=false }) => {
    const styles = {
        wrapper: {
            paddingTop: '20px',
            paddingLeft: '30px',
            paddingRight: '30px'
        },
        button: {
            size: 'md',
            width: '-webkit-fill-available',
            marginBottom: '10px'
        },
        icon: {
            marginRight: '5px',
        }
    };
    return (
        <div style={styles.wrapper}>
            <Container>
                <Row>
                    {isEditMode ? <Col sm='6'><Button {...styles.button} onClick={onAddDocumentationClick}><FaFileMedical style={styles.icon} /> Agregar Documentación útil</Button></Col> : null}
                    <Col sm={{size: '6', offset: isEditMode ? '0': '6'}}><Filter label={'Categoría'} items={categoryItems} onChange={(e) => onCategoryFilter(e.target.value)} /></Col>
                </Row>
            </Container>
        </div>
    )
}

export default HeaderBar;