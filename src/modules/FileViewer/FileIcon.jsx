import React from 'react';

import { AiFillFileUnknown, AiFillFileWord, AiFillFilePdf, AiFillFileImage } from 'react-icons/ai';

const FileIcon = ({ fileExtension }) => {
    if (fileExtension === 'pdf') {
        return <AiFillFilePdf />;
    } else if (fileExtension === 'bmp' || fileExtension === 'gif' || fileExtension === 'jpeg' || fileExtension === 'jpg' || fileExtension === 'png') {
        return <AiFillFileImage />;
    } else if (fileExtension === 'doc' || fileExtension === 'docx') {
        return <AiFillFileWord />;
    } else {
        return <AiFillFileUnknown />;
    }
}

export default FileIcon;