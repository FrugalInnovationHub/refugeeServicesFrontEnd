import React from 'react';

import { CardColumns } from 'reactstrap';

import HeaderBar from './HeaderBar';
import QuickQuestionView from './QuickQuestionView';

const EditMockTestList = ({ questions=[], onAddQuestionClick=() => {}, onEditQuestionClick=() => {}, onDeleteQuestionClick=() => {}, onSearchUpdate=() => {}, onSettingsClick=() => {} }) => {
    const styles = {
        wrapper: {
            paddingLeft: '30px',
            paddingRight: '30px'
        }
    }

    const cards = questions.map((question, i) => {
        return <QuickQuestionView key={i} question={question} onEditQuestionClick={onEditQuestionClick} onDeleteQuestionClick={onDeleteQuestionClick}/>;
    });

    return (
        <div style={styles.wrapper}>
            <HeaderBar onAddClick={onAddQuestionClick} onSearch={onSearchUpdate} onSettingsClick={onSettingsClick} />
            <CardColumns>
                {cards}
            </CardColumns>
        </div>
    );
}

export default EditMockTestList;