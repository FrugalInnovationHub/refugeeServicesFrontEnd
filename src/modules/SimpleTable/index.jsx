import React from 'react';

import { Table } from 'reactstrap';

const SimpleTable = ({ headerMap={}, content=[] }) => {
    const headerKeyList = Object.keys(headerMap);
    return (
        <Table hover>
            <thead>
                <tr>
                    {
                        headerKeyList.map((header, i) => {
                            return <th key={i} style={headerMap[header].style}>{headerMap[header].label}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    content.map((item, i) => {
                        return (
                            <tr key={i}>
                                {
                                    headerKeyList.map((header, j) => {
                                        return <td key={j} style={headerMap[header].style}>{item[header]}</td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

export default SimpleTable;

