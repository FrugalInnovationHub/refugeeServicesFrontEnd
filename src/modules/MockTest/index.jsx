import React from 'react';

import { getMockTestQuestions, getMockTestSettings } from '../../api/questions';

import ScoreCard from './ScoreCard';
import Prompt from './Prompt';
import NextButtonContainer from './NextButtonContainer';
import Explanation from './Explanation';
import Responses from './Responses';
import HowManyQuestions from './HowManyQuestions';

import Title from '../../components/Title';

import { Collapse, Spinner } from 'reactstrap';

export default class MockTest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            currentQuestion: 0,
            totalQuestions: 0,
            selectedOption: -1,
            correctAnswers: 0,
            wrongAnswers: 0,
            
            requestTotal: 20,
            maxTotal: 50,
            passPercentage: 70,
            passMessage: '',
            failMessage: '',

            isFirstPhase: true,
            
            loader: true
        }
    }

    componentDidMount() {
        this.getMockTestSettingsConfig();
    }

    getMockTestSettingsConfig = () => {
        this.setState({
            isFirstPhase: true,
            loader: false
        }, () => {
            getMockTestSettings()
                .then(resp => {
                    const data = Object.fromEntries(
                        Object.entries(resp)
                            .map(([i, d]) => [d.key, d.value] )
                    );
                    this.setState({
                        requestTotal: data['mockTest.size.sample'],
                        maxTotal: data['mockTest.size.max'],
                        passPercentage: data['mockTest.pass.percentage'],
                        passMessage: data['mockTest.pass.message'],
                        failMessage: data['mockTest.fail.message']
                    });
                });
        });
    }

    firstPhase = () => {
        this.setState({
            isFirstPhase: true,
            loader: false 
        });
    }

    onResponseClick = (choice) => {
        this.setState((state, props) => {
            let { correctAnswers, wrongAnswers, currentQuestion, questions } = state;

            const question = questions && (questions[currentQuestion] || {});

            if (question.answer === choice) {
                correctAnswers += 1;
            } else {
                wrongAnswers += 1;
            }
            return {
                selectedOption: choice,
                correctAnswers,
                wrongAnswers

            };
        });
    }

    setQuestions = () => {
        this.setState({
            loader: true 
        }, () => {
            getMockTestQuestions(this.state.requestTotal)
                .then(data => {
                    this.setState({
                        questions: data,
                        currentQuestion: 0,
                        totalQuestions: data.length,
                        selectedOption: -1,
                        correctAnswers: 0,
                        wrongAnswers: 0,
                        loader: false,
                        isFirstPhase: false
                    });
                });
        });
    }

    onNextClick = () => {
        this.setState((state, props) => {
            return {
                selectedOption: -1,
                currentQuestion: state.currentQuestion + 1
            };
        });
    }

    onNumberChange = (requestTotal) => {
        this.setState({
            requestTotal
        });
    }

    onStartQuiz = () => {
        this.setQuestions();
    }

    render() {
        const { currentQuestion, totalQuestions, questions, selectedOption, correctAnswers, wrongAnswers, loader } = this.state;
        const { isFirstPhase, requestTotal, maxTotal, passPercentage, passMessage, failMessage } = this.state;

        let styles = {
            wrapper: {
                boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12)',
                background: '#FFFFFF',
                fontFamily: ['Source Sans Pro', 'sans-serif'],
                fontWeight: '300',
                marginLeft: '10px',
                marginRight: '10px'
            },
        };

        const question = questions && (questions[currentQuestion] || {});

        return (
            <div>
                <Title>Examen de prueba</Title>
                <Collapse isOpen={loader} style={{ textAlign: 'center' }}>
                    <Spinner style={{ width: '3rem', height: '3rem' }} />
                </Collapse>
                <Collapse isOpen={!loader && !isFirstPhase}>
                    <ScoreCard
                        correctAnswers={correctAnswers}
                        wrongAnswers={wrongAnswers}
                        total={totalQuestions}
                        passPercentage={passPercentage}
                        showResult={currentQuestion === totalQuestions}
                        onRetest={this.firstPhase}
                        passMessage={passMessage}
                        failMessage={failMessage}
                    />
                    <Collapse isOpen={currentQuestion !== totalQuestions}>
                        <div style={styles.wrapper}>
                            <Prompt currentQuestion={currentQuestion + 1} totalQuestions={totalQuestions} prompt={question.prompt} />
                            <Collapse isOpen={selectedOption !== -1}>
                                <NextButtonContainer answer={question.answer} selected={selectedOption} onClick={this.onNextClick} />
                                <Explanation explanation={question.explanation} answer={question.answer} selected={selectedOption}/>
                            </Collapse>
                            <Responses options={question.options} onClick={this.onResponseClick} answer={question.answer} selectedOption={selectedOption} isDisabled={selectedOption !== -1}/>
                        </div>
                    </Collapse>
                    
                </Collapse>
                <Collapse isOpen={!loader && isFirstPhase}>
                    <div style={styles.wrapper}>
                        <HowManyQuestions 
                            default_value={requestTotal}
                            max={maxTotal}
                            onChange={this.onNumberChange}
                            onSubmit={this.onStartQuiz}
                        />
                    </div>
                </Collapse>

            </div>
        );
    }
}
