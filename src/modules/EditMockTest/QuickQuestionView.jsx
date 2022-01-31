import React from 'react';

import {
  Card, CardImg, CardText, CardBody
} from 'reactstrap';

import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import Button from '../../components/Button';

const QuickQuestionView = ({ question, onEditQuestionClick=()=>{}, onDeleteQuestionClick=()=>{} }) => {
    if (question == null) {
        return null;
    }

    const styles = {
        wrapper: {
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
        }
    }

    const { prompt } = question;

    const cardContent = prompt.map(({ type, value }, i) => {
        if (type === 'TXT' && value !== '') {
            return <CardText key={i}>{value}</CardText>;
        } else if (type === 'IMG' && value !== '') {
            return <CardImg key={i} width='100%' src={value} alt={value} />;
        } else {
            return null;
        }
    }).filter(p => p !== null);

    return (
        <Card style={styles.wrapper}>
            <CardBody>
                {cardContent}
                <div style={styles.buttonWrapper}>
                    <Button key={'onEditQuestionClick'} {...styles.buttonProps} onClick={() => onEditQuestionClick(question)}><FaEdit /></Button>
                    <Button key={'onDeleteQuestionClick'} {...styles.buttonProps} onClick={() => onDeleteQuestionClick(question._id)}><FaTrashAlt /></Button>
                </div>
            </CardBody>
        </Card>
    );
}

export default QuickQuestionView;