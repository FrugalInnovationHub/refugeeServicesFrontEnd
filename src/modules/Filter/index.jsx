import React from 'react';

import { Form, Input, FormGroup, Label, Col } from 'reactstrap';

const Filter = ({ label, items, onChange }) => {

    let labelContent;
    let contentLength = 12;

    if (label) {
        contentLength = 10;
        labelContent = <Label xs={3} lg={2} for='filter'>{label}: </Label>;
    }
    return (
        <Form>
            <FormGroup row>
                {labelContent}
                <Col xs={contentLength - 1} lg={contentLength}>
                    <Input type='select' id='filter' onChange={onChange}>
                        {
                            items.map((item, i) => <option key={i}>{item}</option>)
                        }
                    </Input>
                </Col>
            </FormGroup>
        </Form>
    )
}

export default Filter;