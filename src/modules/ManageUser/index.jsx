import React from 'react';

import { Badge } from 'reactstrap';

import { getUserList, addUser, approveUser, deleteUser } from '../../api/auth';
import { getLoggedInUserDetails } from '../../utilities';

import Title from '../../components/Title';
import Button from '../../components/Button';

import { FaCheck, FaTrashAlt } from 'react-icons/fa';

import HeaderBar from './HeaderBar';
import AddUser from './AddUser';
import DeleteUserModal from './DeleteUserModal';
import UserList from './UserList';

export default class ManageUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loader: true,
            users: [],
            
            categories: [
                'CLIENT',
                'ADMIN',
                'AGENT'
            ],
            currentCategory: '',
            currentUserId: '',

            // New User Form control
            showAddUserModal: false,
            showAddUserModalLoader: true,
            addFormError: false,

            // New User Form items
            newUserId: '',
            newUserType: 'CLIENT',
            newName: '',
            newPassword: '',
            newConfirmPassword: '',

            // Delete User Form control
            showDeleteUserModal: false,
            showDeleteUserModalLoader: true,

            // Delete User Form items
            userToDelete: {},
            
            // Pagination
            pageNumber: 0, 
            totalPages: 0
        }
    }

    componentDidMount() {
        const { userId } = getLoggedInUserDetails();
        this.setState({
            currentUserId: userId 
        }, this.findUsers);
        
    }

    findUsers = () => {
        this.setState({
            loader: true
        }, () => {
            const { pageNumber } = this.state;
            
            getUserList(pageNumber).then(({ content, totalPages }) => {
                this.setState({
                    users: content,
                    totalPages,
                    loader: false
                }, () => {
                    let { users, currentUserId } = this.state;

                    const buttonProps = {
                        backgroundColor: 'transparent',
                        color: 'unset',
                        border: 'none',
                        paddingTop: 0,
                        paddingBottom: 0
                    };

                    const styles = {
                        icon: {
                            verticalAlign: 'baseline'
                        }
                    }

                    users = users.map((user) => {
                        const { _id, userId, name, userType, active } = user;
                        let buttonList = [];
                        let badge;
                        if (!active) {
                            badge = <Badge color='danger' pill> </Badge>
                            buttonList.push(<Button key={'approve'} {...buttonProps} onClick={() => this.onApproveUserClick({ userId, userType })}><FaCheck style={styles.icon}/></Button>);
                        } else {
                            badge = <Badge color='success' pill> </Badge>
                        }

                        if (userId !== currentUserId) {
                            buttonList.push(<Button key={'delete'} {...buttonProps} onClick={() => this.onDeleteUserClick({ _id, name, userId, userType })}><FaTrashAlt style={styles.icon}/></Button>);
                        }

                        return {
                            ...user,
                            buttonList,
                            badge
                        }

                    });

                    this.setState({
                        users
                    });
                });
            });
        });
    }

    onApproveUserClick = (approveUserRequest) => {
        approveUser(approveUserRequest).then(({ status }) => {
            if (status === 200) {
                this.findUsers();
            }
        });
    }

    onUserUpdateClick = (filePath, fileExtension, filename) => {
        this.setState({
            showFileModal: true
        });
    }

    onAddUserClick = () => {
        this.setState({
            showAddUserModal: true,
            showAddUserModalLoader: false
        });
    }

    toggleAddUserModal = () => {
        this.setState((state, props) => {
            return {
                showAddUserModal: false,
                showAddUserModalLoader: true
            } 
        });
    }

    onDeleteUserClick = (userToDelete) => {
        this.setState({
            userToDelete 
        }, () => {
            this.setState({
                showDeleteUserModal: true,
                showDeleteUserModalLoader: false
            });
        });
    }


    toggleDeleteUserModal = () => {
        this.setState((state, props) => {
            return {
                showDeleteUserModal: false,
                showDeleteUserModalLoader: true
            } 
        });
    }

    onAddNewUser = () => {
        const { newUserId, newUserType, newName, newPassword, newConfirmPassword } = this.state;

        this.setState({
            showAddUserModalLoader: true 
        }, () => {
            addUser({
                userId: newUserId, 
                userType: newUserType, 
                name: newName, 
                password: newPassword, 
                confirmPassword: newConfirmPassword
            }).then(data => {
                console.log(data);
                if (data.status === 201) {
                    this.setState({
                        newUserId: '',
                        newUserType: 'CLIENT',
                        newName: '',
                        newPassword: '',
                        newConfirmPassword: '',
                        addFormError: false,
                        showAddUserModal: false,
                        pageNumber: 0
                    }, () => {
                        this.findUsers();
                    });
                } else {
                    this.setState({
                        addFormError: true
                    });
                }
                this.setState({
                    showAddUserModalLoader: false
                });
            });
        });
    }

    onDeleteUser = (id) => {
        this.setState({
            showDeleteUserModalLoader: true 
        }, () => {
            deleteUser(id).then(data => {
                this.setState({
                    showDeleteUserModal: false,
                    showDeleteUserModalLoader: false
                }, () => {
                    this.findUsers();
                });
            });
        });
    }

    onAddUserFieldChange = (field) => {
        return (value) => {
            this.setState({
                [field]: value 
            });
        }
    }

    onAddUserTypeChange = (newUserType) => {
        this.setState((state, props) => {
            let newUserId = state.newUserId;

            if (state.newUserType === 'CLIENT' ^ newUserType === 'CLIENT') {
                newUserId = '';
            }
            return {
                newUserType,
                newUserId
            }
        });
    }

    handlePageClick = (e, pageNumber) => {
        this.setState({
            pageNumber
        }, () => {
            this.findUsers();
        });
    }

    render() {
        const { loader, users, categories, newUserType, newUserId } = this.state;
        const { showAddUserModal, showAddUserModalLoader, addFormError } = this.state;
        const { userToDelete, showDeleteUserModal, showDeleteUserModalLoader } = this.state;
        const { pageNumber, totalPages } = this.state;

        let styles = {
            wrapper: {
                boxShadow: ['0 2px 2px 0 rgba(0,0,0,0.14)', '0 3px 1px -2px rgba(0,0,0,0.2)', '0 1px 5px 0 rgba(0,0,0,0.12)'],
                background: '#FFFFFF',
                fontFamily: ['Source Sans Pro', 'sans-serif'],
                fontWeight: '300',
                paddingLeft: '30px',
                paddingRight: '30px',
                overflow: 'scroll'
            },
        };

        return (
            <div>
                <Title>Administrar Usuarios</Title>
                <div style={styles.wrapper}>
                    <HeaderBar onAddUserClick={this.onAddUserClick} />
                    <AddUser 
                        categoryItems={categories} 
                        newUserId={newUserId} 
                        newUserType={newUserType} 
                        isOpen={showAddUserModal} toggle={this.toggleAddUserModal} 
                        onAddUserTypeChange={this.onAddUserTypeChange} 
                        onFieldChange={this.onAddUserFieldChange} 
                        onSubmit={this.onAddNewUser} 
                        loader={showAddUserModalLoader}
                        error={addFormError}
                    />
                    <DeleteUserModal
                        userToDelete={userToDelete}
                        isOpen={showDeleteUserModal} toggle={this.toggleDeleteUserModal}
                        loader={showDeleteUserModalLoader}
                        onDeleteClick={this.onDeleteUser} 
                    />
                    <UserList users={users} loader={loader} pageNumber={pageNumber} totalPages={totalPages} handlePageClick={this.handlePageClick} />
                </div>
            </div>
        );
    }
}
