import React from 'react';

import Img from 'react-advanced-img';

const Explanation = ({ explanation, answer, selected }) => {
    let styles = {
        wrapper: {
            padding: '30px',
            backgroundColor: '#F9F9F9',
            borderBottom: '2px solid #CCCCCC',
        },
        explanationText: {
            paddingBottom: '15px'
        },
        explanationImage: {
            paddingBottom: '15px',
            maxWidth: '-webkit-fill-available'
        }
    };

    if (selected === -1) {
        styles.wrapper['border'] = '0px';
    } else if (answer === selected) {
        styles.wrapper['border'] = '2px solid #457500';
    } else {
        styles.wrapper['border'] = '2px solid #CC3333';
    }

    return (
        <div style={styles.wrapper}>
            <div>
                {
                    explanation && explanation.map((e, i) => {
                        if (e.type === 'TXT' && e.value !== '') {
                            return <div key={i} style={styles.explanationText}>{e.value}</div>;
                        } else if (e.type === 'IMG' && e.value !== '') {
                            return <Img key={i} src={e.value} placeholder='404!!' height={200} style={styles.explanationImage} />;
                        } else {
                            return null;
                        }
                    }).filter(e => e != null)
                }
            </div>
        </div>
    );
}

export default Explanation;