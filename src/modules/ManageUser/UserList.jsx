import React from 'react';

import { Collapse, Spinner } from 'reactstrap';

import Pagination from '../../components/Pagination';
import SimpleTable from '../SimpleTable';

const UserList = ({ users, loader, pageNumber=1, totalPages=1, handlePageClick=() => {}, deleteUserClick=() => {} }) => {
    const styles = {
        wrapper: {
            marginLeft: '10px',
            marginRight: '10px',
            padding: '20px 0',
            overflow: 'scroll'
        },
        button: {
            size: 'md',
            width: '-webkit-fill-available',
            marginBottom: '10px',
            color: 'unset',
            backgroundColor: 'transparent',
            border: 'none'
        }
    };

    const headerMap = {
        badge: {
            style: {
                textAlign: 'center'
            }
        },
        userId: {
            label: 'ID de Usuario'
        },
        name: {
            label: 'Nombre'
        },
        userType: {
            label: 'Tipo de Usuario'
        },
        buttonList: {
            label: 'Acción',
            style: {
                textAlign: 'center'
            }
        }
    }
    
    return (
        <div style={styles.wrapper}>
            <Collapse isOpen={loader} style={{ textAlign: 'center' }}>
                <Spinner />
            </Collapse>
            <Collapse isOpen={!loader}>
                <Collapse isOpen={users.length !== 0}>
                    <SimpleTable headerMap={headerMap} content={users} />
                </Collapse>
                <Collapse isOpen={users.length === 0} style={{ textAlign: 'center' }}>
                    No hay usuarios para mostrar
                </Collapse>
            </Collapse>
            <Pagination pageNumber={pageNumber} totalPages={totalPages} handlePageClick={handlePageClick} />
        </div>
    )
}

export default UserList;