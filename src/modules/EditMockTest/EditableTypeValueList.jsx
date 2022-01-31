import React from 'react';

import { Row, Col } from 'reactstrap';

import EditableTypeValueField from './EditableTypeValueField';

import Button from '../../components/Button';

import { FaFont, FaImage } from 'react-icons/fa';

const EditableTypeValueList = ({ items, onValueChange=() => {}, moveUpClick=() => {}, moveDownClick=() => {}, onDeleteClick=() => {}, onUploadImageClick=() => {}, onNewFieldAdd=() => {} }) => {
    const styles = {
        wrapper: {
            paddingTop: '20px',
            paddingLeft: '30px',
            paddingRight: '30px'
        },
        button: {
            size: 'md',
            width: '-webkit-fill-available',
            marginBottom: '15px'
        },
        icon: {
            marginRight: '5px',
        }
    }

    return (
        <div style={styles.wrapper}>
            {
                items && items.map((item, i) => {
                    return <EditableTypeValueField 
                                key={i} {...item} 
                                idx={i}
                                onValueChange={onValueChange}
                                moveUpClick={moveUpClick}
                                moveDownClick={moveDownClick}
                                onDeleteClick={onDeleteClick}
                                onUploadImageClick={onUploadImageClick} />;
                }).filter(item => item != null)
            }
            <Row>
                <Col md={6}>
                    <Button {...styles.button} onClick={() => onNewFieldAdd('TXT')}><FaFont style={styles.icon} /> Texto</Button>
                </Col>
                <Col md={6}>
                    <Button {...styles.button} onClick={() => onNewFieldAdd('IMG')}><FaImage style={styles.icon} /> Imagen</Button>
                </Col>
            </Row>
        </div>
    )
}

export default EditableTypeValueList;