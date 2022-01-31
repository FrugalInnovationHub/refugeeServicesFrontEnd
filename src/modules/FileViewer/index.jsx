import React from 'react';

import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import F from 'react-file-viewer';

const FileViewer = ({ filename, url, fileExtension, isOpen, toggle }) => {
    return (
        <Modal size='lg' scrollable={true} isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>{filename}</ModalHeader>
            <ModalBody style={{ textAlign: 'center' }}>
                 <F
                    fileType={fileExtension}
                    filePath={url}
                    onError={console.log}
                />
            </ModalBody>
        </Modal>
    )
}

export default FileViewer;