import React from 'react';

import Response from './Response';

const EditResponses = ({ options, onChange=() => {}, onClick=() => {}, answer }) => {

    const choices = ['a', 'b', 'c', 'd'];

    const responses = options && (choices.map((choice, i) => {
        return <Response key={i} choice={choice} option={options[choice]} answer={answer} selected={answer} onClick={onClick} onChange={onChange(choice)}/>;
    }) || []);

    return (
        <div>
            {responses}
        </div>
    );
}

export default EditResponses;