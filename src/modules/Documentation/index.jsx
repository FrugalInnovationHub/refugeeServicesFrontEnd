import React from 'react';

import { uploadFile } from '../../api/s3bucket';

import { findAllDocumentation, saveDocumentation, deleteDocumentation } from '../../api/documentation';

import Title from '../../components/Title';

import HeaderBar from './HeaderBar';
import DocumentationCards from './DocumentationCards';
import AddDocumentation from './AddDocumentation';

import FileViewer from '../FileViewer';

export default class Documentation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loader: true,
            documentations: [],
            filteredDocumentations: [],
            showFileModal: false,
            showAddDocumentationModal: false,
            filename: '',
            filePath: '',
            fileExtension: '',
            isEditMode: props.isEditMode || false,
            categories: [],
            currentCategory: '',

            uploadedFile: null,
            uploadedCategory: null,
            addDocumentationModalLoader: true
        }

        this.onCardClick = this.onCardClick.bind(this);
        this.onAddDocumentationClick = this.onAddDocumentationClick.bind(this);

        this.toggleFile = this.toggleFile.bind(this);
        this.toggleAddDocumentationModal = this.toggleAddDocumentationModal.bind(this);

        this.deleteDocumentationClick = this.deleteDocumentationClick.bind(this);

        this.onCategoryFilter = this.onCategoryFilter.bind(this);

        this.onUploadCategoryChange = this.onUploadCategoryChange.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.onUploadFormSubmit = this.onUploadFormSubmit.bind(this);
    }

    componentDidMount() {
        this.findAllDocumentation(); 
    }

    findAllDocumentation() {
        this.setState({
            loader: true
        }, () => {
            findAllDocumentation().then(documentations => {
                let categories = documentations.map(documentation => documentation.category);

                categories = [...new Set(categories)];

                this.setState({
                    documentations,
                    categories,
                    currentCategory: categories[0],
                    uploadedCategory: categories[0],
                    loader: false 
                }, () => {
                    this.onCategoryFilter(categories[0])
                })
            });
        });
    }

    onCardClick(filePath, fileExtension, filename) {
        this.setState({
            filename,
            filePath,
            fileExtension,
            showFileModal: true
        });
    }

    onAddDocumentationClick() {
        this.setState({
            showAddDocumentationModal: true,
            addDocumentationModalLoader: false
        });
    }

    openInNewTab(filePath) {
        window.open(filePath);
    }

    toggleFile() {
        this.setState((state, props) => {
            return {
                showFileModal: false
            } 
        });
    }

    toggleAddDocumentationModal() {
        this.setState((state, props) => {
            return {
                showAddDocumentationModal: false,
                addDocumentationModalLoader: true
            } 
        });
    }

    deleteDocumentationClick(id) {
        deleteDocumentation(id).then(resp => {
            if (resp.status === 204) {
                let { documentations, filteredDocumentations } = this.state;
                
                filteredDocumentations = filteredDocumentations.filter(documentation => documentation._id !== id);
                documentations = documentations.filter(documentation => documentation._id !== id);

                this.setState({
                    documentations,
                    filteredDocumentations
                });
            }
        });
    }

    onCategoryFilter(selectedCategory) {
        const { documentations } = this.state;

        let filteredDocumentations = documentations.filter(documentation => documentation.category === selectedCategory);
        this.setState({
            filteredDocumentations,
            currentCategory: selectedCategory
        });
    }

    onUploadCategoryChange(uploadedCategory) {
        this.setState({
            uploadedCategory 
        });
    }

    onFileUpload(e) {
        this.setState({
            uploadedFile: e.target.files[0]
        });
    }

    onUploadFormSubmit() {
        const { uploadedFile, uploadedCategory, currentCategory } = this.state;

        this.setState({
            addDocumentationModalLoader: true 
        }, () => {
            uploadFile(uploadedFile).then(data => {
                saveDocumentation({
                    ...data,
                    category: uploadedCategory
                }).then(data => {
                    this.setState((state, props) => {
                        return {
                            documentations: [
                                ...state.documentations,
                                data
                            ],
                            addDocumentationModalLoader: false,
                            uploadedFile: null
                        };
                    }, () => {
                        this.onCategoryFilter(currentCategory);
                        this.toggleAddDocumentationModal();
                        this.findAllDocumentation();
                    });
                })
            });
        });
    }

    render() {
        const { loader, filteredDocumentations, showFileModal, showAddDocumentationModal, filePath, filename, fileExtension, isEditMode, categories, addDocumentationModalLoader } = this.state;

        let styles = {
            wrapper: {
                boxShadow: ['0 2px 2px 0 rgba(0,0,0,0.14)', '0 3px 1px -2px rgba(0,0,0,0.2)', '0 1px 5px 0 rgba(0,0,0,0.12)'],
                background: '#FFFFFF',
                fontFamily: ['Source Sans Pro', 'sans-serif'],
                fontWeight: '300',
                marginLeft: '10px',
                marginRight: '10px'
            },
        };

        return (
            <div>
                <Title>{isEditMode ? 'Editar': null} Documentación Útil</Title>
                <div style={styles.wrapper}>
                    <HeaderBar categoryItems={categories} onCategoryFilter={this.onCategoryFilter} isEditMode={isEditMode} onAddDocumentationClick={this.onAddDocumentationClick} />
                    <DocumentationCards documentations={filteredDocumentations} loader={loader} onClick={this.onCardClick} openInNewTab={this.openInNewTab} isEditMode={isEditMode} deleteDocumentation={this.deleteDocumentationClick} />
                    <FileViewer filename={filename} url={filePath} fileExtension={fileExtension} isOpen={showFileModal} toggle={this.toggleFile} />
                    <AddDocumentation categoryItems={categories} isOpen={showAddDocumentationModal} toggle={this.toggleAddDocumentationModal} onCategoryChange={this.onUploadCategoryChange} onFileUpload={this.onFileUpload} onSubmit={this.onUploadFormSubmit} loader={addDocumentationModalLoader}/>
                </div>
            </div>
        );
    }
}
