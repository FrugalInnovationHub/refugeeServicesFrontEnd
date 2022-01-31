import React from 'react';

import Response from './Response';

const Responses = ({ options, onClick, answer, selectedOption, isDisabled }) => {

    const choices = ['a', 'b', 'c', 'd'];

    const responses = options && (choices.map((choice, i) => {
        return <Response key={i} choice={choice} option={options[choice]} answer={answer} selected={selectedOption} onClick={onClick} isDisabled={isDisabled}/>;
    }) || []);

    return (
        <div>
            {responses}
        </div>
    );
}

export default Responses;