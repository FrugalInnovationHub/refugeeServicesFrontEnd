import React from 'react';

import { findStatusTreeBranch } from '../../api/statusTree';

import Title from '../../components/Title';

import Prompt from './Prompt';
import Responses from './Responses';
import Message from './Message';
import ButtonContainer from './ButtonContainer';

import { Collapse, Spinner } from 'reactstrap';

export default class StatusTreeComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: '',
            statusTreeQuestions: {},
            currentQuestionId: '',
            nextQuestionId: -1,
            message: '',
            historyStack: [],
            loader: true,
            isEditMode: props.isEditMode || false
        }

        this.onResponseClick = this.onResponseClick.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);

        this.setStatusTreeQuestions = this.setStatusTreeQuestions.bind(this);
    }

    componentDidMount() {
        this.setStatusTreeQuestions();
    }

    onResponseClick(responseOptions) {
        if (responseOptions) {
            this.setState({
                loader: true 
            }, () => {
                // Hard coding TODO remove this
                if(responseOptions.length > 1) {
                    if(responseOptions[1].type === 'ID') {
                        this.setState({
                            nextQuestionId: responseOptions[1].value
                        });
                    }
                }
                this.setState((state, props) => {
                    const historyStack = state.historyStack;
                    historyStack.push(state.currentQuestionId);

                    let message = '';
                    let currentQuestionId = -1;
                    
                    if (responseOptions[0].type === 'TXT') {
                        message = responseOptions[0].value;
                    } else if (responseOptions[0].type === 'ID') {
                        currentQuestionId = responseOptions[0].value;
                    }

                    return {
                        currentQuestionId,
                        message,
                        historyStack,
                        loader: false
                    }
                    
                });
            });
        }
    }

    onNextClick() {
        this.setState({
            loader: true 
        }, () => {
            this.setState((state, props) => {
                const currentQuestionId = state.nextQuestionId;

                return {
                    currentQuestionId,
                    nextQuestionId: -1,
                    message: '',
                    loader: false
                }
            });
        });
    }

    onBackClick() {
        this.setState({
            loader: true 
        }, () => {
            this.setState((state, props) => {
                const historyStack = state.historyStack;
                const currentQuestionId = historyStack.pop();

                return {
                    currentQuestionId,
                    historyStack,
                    nextQuestionId: -1,
                    message: '',
                    loader: false
                }
            });
        });
    }

    setStatusTreeQuestions() {
        this.setState({
            loader: true 
        }, () => {
            findStatusTreeBranch(this.props.branchId)
                .then(data => {
                    this.setState({
                        label: data.label,
                        statusTreeQuestions: data.statusTreeQuestions,
                        currentQuestionId: data.firstQuestion,
                        loader: false
                    });
                });
        });
    }

    render() {
        const { label, currentQuestionId, nextQuestionId, statusTreeQuestions, loader, message, historyStack, isEditMode } = this.state;

        let styles = {
            title: {
                margin: '10px 0 15px 30px',
                fontSize: '20px'
            },
            wrapper: {
                boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12)',
                background: '#FFFFFF',
                fontFamily: ['Source Sans Pro', 'sans-serif'],
                fontWeight: '300',
                marginLeft: '15px',
                marginRight: '15px'
            },
        };

        let content;

        if (currentQuestionId === -1) {
            content = <Message message={message}/>;
        } else {
            const question = statusTreeQuestions && (statusTreeQuestions[currentQuestionId] || {});

            content = (
                <div>
                    <Prompt prompt={question.question} no={historyStack.length + 1} />
                    <Responses responseOptions={question.statusTreeResponseOptions} onClick={this.onResponseClick} />
                </div>
            );
        }

        return (
            <div>
                <Title {...styles.title}>{loader ? null: 'Sección:'} {label}</Title>
                <Collapse isOpen={loader} style={{ textAlign: 'center' }}>
                    <Spinner style={{ width: '3rem', height: '3rem' }} />
                </Collapse>
                <Collapse isOpen={!loader}>
                    <div style={styles.wrapper}>
                        {content}
                    </div>
                    <ButtonContainer onBackClick={this.onBackClick} onNextClick={this.onNextClick} isEditMode={isEditMode} isBackDisabled={historyStack.length === 0} hasNextQuestion={nextQuestionId  !== -1} />
                </Collapse>
            </div>
        );
    }
}
