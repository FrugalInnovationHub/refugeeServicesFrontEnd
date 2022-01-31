import React from 'react';

import {
    InputGroup,
    InputGroupAddon,
    Input,
    Card
} from 'reactstrap';

import Button from '../../components/Button';
import { FaCaretUp, FaCaretDown, FaTrash, FaCloudUploadAlt } from 'react-icons/fa';

import { imageExists } from '../../utilities';

const EditableTypeValueField = ({ idx, type, value='', src, onValueChange=() => {}, moveUpClick=() => {}, moveDownClick=() => {}, onDeleteClick=() => {}, onUploadImageClick=() => {}}) => {
    const styles = {
        wrapper: {
            paddingBottom: '20px'
        },
        imageInputBox: {
            border: 'none'
        },
        imageDisplay: {
            alignSelf: 'center',
            maxHeight: '512px',
            maxWidth: '-webkit-fill-available',
            objectFit: 'contain'
        }
    }
    let content;

    let buttonList = [
        <InputGroupAddon key='up' addonType='append'><Button onClick={() => moveUpClick(idx, value)}><FaCaretUp /></Button></InputGroupAddon>,
        <InputGroupAddon key='down' addonType='append'><Button onClick={() => moveDownClick(idx, value)}><FaCaretDown /></Button></InputGroupAddon>,
        <InputGroupAddon key='delete' addonType='append'><Button onClick={() => onDeleteClick(idx, value)}><FaTrash /></Button></InputGroupAddon>
    ];

    if (type === 'IMG') {
        buttonList.splice(0, 0, <InputGroupAddon key='upload' addonType='append'><Button onClick={() => onUploadImageClick(idx)}><FaCloudUploadAlt /></Button></InputGroupAddon>);
    }

    let inputField = (
        <InputGroup>
            <Input onChange={(e) => onValueChange(idx, e.target.value)} value={value}/>
            {buttonList}
        </InputGroup>
    );

    if (type === 'TXT' || !imageExists(value)) {
        content = inputField;
    } else {
        content = (
            <Card>
                <img src={value} alt='thumbnail' style={styles.imageDisplay} />
                {inputField}
            </Card>
        );
    }
    return (
        <div style={styles.wrapper}>
            {content}
        </div>
    );
}

export default EditableTypeValueField;