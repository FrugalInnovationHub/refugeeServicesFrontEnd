import React from 'react';

import { uploadFile } from '../../api/s3bucket';

import { findQuestionsByKeywords, findAllQuestions, deleteQuestion, saveQuestion, updateQuestion, getMockTestSettings, updateMockTestSettings } from '../../api/questions';

import EditMockTestList from './EditMockTestList';
import EditableTypeValueList from './EditableTypeValueList';
import EditResponses from './EditResponses';
import ButtonContainer from './ButtonContainer';

import UploadImageModal from './UploadImageModal';
import SettingsModal from './SettingsModal';

import Title from '../../components/Title';

import { Collapse, Spinner } from 'reactstrap';

export default class EditMockTestLanding extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            loader: true,
            keywords: '',
            isEditorMode: false,
            
            _id: undefined,
            prompt: [],
            explanation: [],
            options: {},
            answer: '',

            isUploadModalOpen: false,
            isUploadModalLoader: false,
            fileToUpload: undefined,
            fileToUpload_field: undefined,
            fileToUpload_idx: -1,

            isSettingsModalOpen: false,
            isSettingsModalLoader: false,
            settingsData: []
        }
    }

    componentDidMount() {
        this.getQuestionsByKeywords();
    }

    onAddQuestionClick = () => {
        this.setState({
            isEditorMode: true,
            answer: 'a'
        });
    }

    onEditQuestionClick = (currentQuestion) => {
        this.setState({
            isEditorMode: true,
            ...currentQuestion
        });
    }

    onDeleteQuestionClick = (id) => {
        deleteQuestion(id).then(() => {
            this.getQuestionsByKeywords();
        });
    }

    onBackClick = () => {
        this.setState({
            isEditorMode: false,
            _id: undefined,
            prompt: [],
            explanation: [],
            options: {},
            answer: '',
        });
    }

    getQuestionsByKeywords = () => {
        const { keywords } = this.state;
        this.setState({
            loader: true
        }, () => {
            let questionsRequest;

            if (keywords === null || keywords === '') {
                questionsRequest = findAllQuestions();
            } else {
                questionsRequest = findQuestionsByKeywords(keywords);
            }

            questionsRequest.then(questions => {
                this.setState({
                    questions,
                    loader: false
                });
            });
        });
    }

    onKeywordChange = (e)  => {
        if (e.which === 13) {
            this.getQuestionsByKeywords();
        } else {
            this.setState({
                keywords: e.target.value
            });
        }
    }

    moveTypeValueUp = (field) => (i) => {
        if (i === 0) {
            return;
        }
        this.setState((state, props) => ({
            [field]: [
                ...state[field].slice(0, i - 1),
                state[field][i],
                state[field][i - 1],
                ...state[field].slice(i + 1)
            ]
        }));
    }

    moveTypeValueDown = (field) => (i) => {
        if (i === this.state[field].length - 1) {
            return;
        }
        this.setState((state, props) => ({
            [field]: [
                ...state[field].slice(0, i),
                state[field][i + 1],
                state[field][i],
                ...state[field].slice(i + 2)
            ]
        }));
    }

    onTypeValueChange = (field) => (i, value) => {
        let fields = [...this.state[field]];
        
        fields[i].value = value;

        this.setState((state, props) => ({
            [field]: [
                ...fields
            ]
        }));
    }

    onTypeValueDelete = (field) => (i, prompt) => {
        this.setState((state, props) => ({
            [field]: [
                ...state[field].slice(0, i),
                ...state[field].slice(i + 1)
            ]
        }));
    }

    onOptionsTextChange = (option) => (value) => {
        this.setState((state, props) => ({
            options: {
                ...state.options,
                [option]: value
            }
        }));
    }

    onOptionSelect = (answer) => {
        this.setState({
            answer
        });
    }

    toggleUploadModal = () => {
        this.setState({
            isUploadModalOpen: false,
            isUploadModalLoader: false 
        });
    }

    onFileUpload = (fileToUpload) => {
        this.setState({
            fileToUpload
        });
    }

    onUploadImageClick = (fileToUpload_field) => (fileToUpload_idx) => {
        this.setState({
            fileToUpload_field,
            fileToUpload_idx,
            fileToUpload: undefined
        }, () => {
            this.setState({
                isUploadModalOpen: true,
                isUploadModalLoader: false 
            });
        });
    }

    onFileUploadSubmit = () => {
        this.setState({
            isUploadModalLoader: true
        }, () => {
            const { fileToUpload } = this.state;

            uploadFile(fileToUpload).then(({ url }) => {
                const { fileToUpload_field, fileToUpload_idx } = this.state;

                if (url) {
                    this.onTypeValueChange(fileToUpload_field)(fileToUpload_idx, url);
                }
                this.setState({
                    isUploadModalLoader: false,
                    isUploadModalOpen: false,
                    
                    fileToUpload: undefined,
                    fileToUpload_field: undefined,
                    fileToUpload_idx: -1
                });
            });
        });
    }

    onNewFieldAdd = (field) => (type='TXT') => {
        this.setState((state, props) => ({
            [field]: [
                ...state[field],
                {
                    type,
                    value: undefined
                }
            ]
        }));
    }

    onSubmitClick = () => {
        this.setState({
            loader: true 
        }, () => {
            const { _id, prompt, explanation, options, answer } = this.state;

            let requestAPI;
            if (_id !== undefined) {
                requestAPI = updateQuestion(_id, { _id, prompt, explanation, options, answer });
            } else {
                requestAPI = saveQuestion({ _id, prompt, explanation, options, answer });
            }

            requestAPI.then(resp => {
                // Handle error here
                this.setState({
                    isEditorMode: false, 
                    _id: undefined,
                    prompt: [],
                    explanation: [],
                    options: {},
                    answer: ''
                }, () => {
                    this.setState({
                        loader: false 
                    }, () => {
                        this.getQuestionsByKeywords();
                    });
                });
            })
        });
    }

    onSettingsClick = () => {
        this.setState({
            isSettingsModalOpen: true,
            isSettingsModalLoader: true 
        }, () => {
            getMockTestSettings().then(resp => {
                this.setState({
                    settingsData: resp,
                    isSettingsModalLoader: false
                });
            });
        });
    }

    toggleSettingsModal = () => {
        this.setState({
            isSettingsModalOpen: false,
            isSettingsModalLoader: false
        });
    }

    onSettingsChange = (i, field, value) => {
        this.setState((state, props) => {
            var { settingsData } = state;
            settingsData[i].value = value;
            return {
                settingsData
            }
        });
    }

    onSettingsUpdate = () => {
        this.setState({
            isSettingsModalLoader: true
        }, () => {
            const { settingsData } = this.state;
            updateMockTestSettings(settingsData).then(resp => {
                this.setState({
                    isSettingsModalLoader: false,
                    isSettingsModalOpen: false,
                    settingsData: resp
                });
            })
        });
    }

    render() {
        const { questions, loader, isEditorMode, prompt, explanation, options, answer } = this.state;
        const { isUploadModalOpen, isUploadModalLoader } = this.state;
        const { isSettingsModalOpen, isSettingsModalLoader, settingsData } = this.state;

        let styles = {
            wrapper: {
                boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12)',
                background: '#FFFFFF',
                fontFamily: ['Source Sans Pro', 'sans-serif'],
                fontWeight: '300',
                marginLeft: '10px',
                marginRight: '10px'
            },
            fieldWrapper: {
                borderBottom: '2px solid #CCCCCC'
            },
            explanationWrapper: {
                backgroundColor: '#F9F9F9',
            },
            textField: {
                paddingTop: '30px',
                paddingLeft: '30px',
                fontSize: '24px'
            }
        };

        return (
            <div>
                <Title>Editar Examen de Prueba</Title>
                <div style={styles.wrapper}>
                    <Collapse isOpen={loader} style={{ textAlign: 'center' }}>
                        <Spinner style={{ width: '3rem', height: '3rem' }} />
                    </Collapse>
                    <Collapse isOpen={!loader}>
                        <Collapse isOpen={!isEditorMode}>
                            <EditMockTestList 
                                questions={questions} 
                                onSearchUpdate={this.onKeywordChange}
                                onSettingsClick={this.onSettingsClick}
                                onAddQuestionClick={this.onAddQuestionClick}
                                onEditQuestionClick={this.onEditQuestionClick}
                                onDeleteQuestionClick={this.onDeleteQuestionClick}
                            />
                            <SettingsModal
                                isOpen={isSettingsModalOpen}
                                toggle={this.toggleSettingsModal}
                                onSubmit={this.onSettingsUpdate}
                                onChange={this.onSettingsChange}
                                loader={isSettingsModalLoader}
                                data={settingsData}
                            />
                        </Collapse>
                        <Collapse isOpen={isEditorMode}>
                            <div style={styles.fieldWrapper}>
                                <p style={styles.textField}>Pregunta: </p>
                                <EditableTypeValueList 
                                    items={prompt}
                                    onValueChange={this.onTypeValueChange('prompt')}
                                    moveUpClick={this.moveTypeValueUp('prompt')}
                                    moveDownClick={this.moveTypeValueDown('prompt')}
                                    onDeleteClick={this.onTypeValueDelete('prompt')}
                                    onUploadImageClick={this.onUploadImageClick('prompt')}
                                    onNewFieldAdd={this.onNewFieldAdd('prompt')}
                                />
                            </div>
                            <div style={{...styles.fieldWrapper, ...styles.explanationWrapper}}>
                                <p style={styles.textField}>Respuesta: </p>
                                <EditableTypeValueList 
                                    items={explanation}
                                    onValueChange={this.onTypeValueChange('explanation')}
                                    moveUpClick={this.moveTypeValueUp('explanation')}
                                    moveDownClick={this.moveTypeValueDown('explanation')}
                                    onDeleteClick={this.onTypeValueDelete('explanation')}
                                    onUploadImageClick={this.onUploadImageClick('explanation')}
                                    onNewFieldAdd={this.onNewFieldAdd('explanation')}
                                />
                            </div>
                            <EditResponses options={options} answer={answer} onChange={this.onOptionsTextChange} onClick={this.onOptionSelect}/>
                            <ButtonContainer onSubmitClick={this.onSubmitClick} onBackClick={this.onBackClick}/>
                            <UploadImageModal
                                isOpen={isUploadModalOpen}
                                toggle={this.toggleUploadModal}
                                onFileUpload={this.onFileUpload}
                                onSubmit={this.onFileUploadSubmit}
                                loader={isUploadModalLoader}
                            />
                        </Collapse>
                    </Collapse>
                </div>
            </div>
        );
    }
}
