import React from 'react';

import { Collapse, Spinner, Card, CardBody, CardColumns } from 'reactstrap';

import FileIcon from '../FileViewer/FileIcon';

import { FaDownload, FaFile, FaTrashAlt } from 'react-icons/fa';

import Button from '../../components/Button';

const DocumentationCards = ({ documentations, loader, onClick=() => {}, openInNewTab=() => {}, deleteDocumentation=() => {}, filterItems=[], isEditMode=false }) => {
    let styles = {
        wrapper: {
            marginLeft: '10px',
            marginRight: '10px',
            padding: '20px 30px',
        },
        cardWrapper: {
            boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12)',
        },
        buttonProps: {
            backgroundColor: 'transparent',
            color: 'unset',
            border: 'none'
        },
        buttonWrapper: { 
            maxWidth: '-webkit-fill-available',
            textAlign: 'right'
        },
        fileIconPadding: {
            paddingLeft: '5px'
        },
        cardColumn: {
            paddingBottom: '30px'
        }
    };
    
    return (
        <div style={styles.wrapper}>
            <Collapse isOpen={loader} style={{ textAlign: 'center' }}>
                <Spinner />
            </Collapse>
            <Collapse isOpen={!loader}>
                <CardColumns style={styles.cardColumn}>
                    {
                        documentations && documentations.map(({ _id, filename, contentType, fileExtension, category, createdAt, url, tags }, i) => {
                            return (
                                <Card key={i} style={styles.cardWrapper}>
                                    <CardBody>
                                        <FileIcon fileExtension={fileExtension} /> {filename}
                                        <div style={styles.buttonWrapper}>
                                            <Button {...styles.buttonProps} onClick={() => onClick(url, fileExtension, filename)}><FaFile /></Button>
                                            <Button {...styles.buttonProps} onClick={() => openInNewTab(url)}><FaDownload /></Button>
                                            { isEditMode ? <Button {...styles.buttonProps} onClick={() => deleteDocumentation(_id)}><FaTrashAlt /></Button> : null}
                                        </div>
                                    </CardBody>
                                </Card>
                            );
                        })
                    }
                </CardColumns>
            </Collapse>
        </div>
    )
}

export default DocumentationCards;