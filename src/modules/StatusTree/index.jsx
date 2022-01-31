import React from 'react';

import { Collapse, Spinner } from 'reactstrap';

import Title from '../../components/Title';

import { findAllStatusTreeBranches } from '../../api/statusTree';

import StatusTreeList from './StatusTreeList';


export default class StatusTree extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            branches: [],
            loader: true,
            isEditMode: props.isEditMode || false
        }
    }

    componentDidMount() {
        this.getAllStatusTreeBranches();
    }

    getAllStatusTreeBranches() {
        this.setState({
            loader: true 
        }, () => {
            findAllStatusTreeBranches()
                .then(data => {
                    this.setState({
                        branches: data,
                        loader: false
                    });
                });
        });
    }

    render() {
        const { loader, branches, isEditMode } = this.state;

        return (
            <div>
                <Title>{isEditMode ? 'Editar': null} Árbol de Decisiones</Title>
                <Collapse isOpen={loader} style={{ textAlign: 'center' }}>
                    <Spinner />
                </Collapse>
                <Collapse isOpen={!loader}>
                    <StatusTreeList branches={branches} isEditMode={isEditMode}/>
                </Collapse>
            </div>
        );
    }
}
