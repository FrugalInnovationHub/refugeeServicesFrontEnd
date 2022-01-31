import React from 'react';

import Response from './Response';

const Responses = ({ responseOptions, onClick }) => {
    const responses = responseOptions && (Object.keys(responseOptions).map((key, i) => {
        return <Response key={i} index={i + 1} label={key} onClick={onClick} responseOptions={responseOptions[key]} />;
    }) || []);

    return (
        <div>
            {responses}
        </div>
    );
}

export default Responses;