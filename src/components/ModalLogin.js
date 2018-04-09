import React, {Component} from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import {connect} from 'react-redux';


import * as userActions from '../actions/user';


class ModalLogin extends Component {

    static propTypes = {
        modalVisible: PropTypes.bool.isRequired,
        toggleModal: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired

    };

    state = {
        textInputEmail: "lopezredd@gmail.com",
        textInputPassword: "123456",
        textInputEmailError: false,
        textInputPasswordError: false,
        showLoading: false,
        errorMessage: null

    };

    _handleInputChange = (index, value) => {
        this.setState({
            [index]: value
        });

    };

    _handleOnSubmit = (event) => {
        event.preventDefault();


        const {onSubmit, toggleModal} = this.props;
        const {textInputEmail, textInputPassword} = this.state;

        this.setState({
            showLoading: true
        });

        this.props.loginUser(textInputEmail, textInputPassword).then(result => {
            if (result.error) {
                this.setState({
                    showLoading: false,
                    errorMessage: result.error.message
                });
                return;
            }
            toggleModal();
        });
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            textInputEmail: "lopezredd@gmail.com",
            textInputPassword: "123456",
            textInputEmailError: false,
            textInputPasswordError: false,
            showLoading: false,
            errorMessage: null
        })
    }

    render() {
        const {modalVisible, toggleModal, onSubmit} = this.props;
        const {textInputEmail, textInputPassword, errorMessage, showLoading} = this.state;
        return (
            <Modal
                className="modal modal-login"
                overlayClassName="overlay"
                isOpen={modalVisible}
                onRequestClose={toggleModal}
                contentLabel="Modal">

                {showLoading ?
                    <div className="center">
                        <ReactLoading delay={0} type={"spinningBubbles"} color={"red"}/>
                    </div> :
                    <div>
                        <a onClick={toggleModal} className="close-modal"> Close </a>

                        <div className="login-modal-body">
                            <label className="header-app-name">Interactive Wall</label>

                            {errorMessage && (
                                <div style={{marginTop: 15}} className="error-box">
                                    <label>{errorMessage}</label>
                                </div>
                            )}

                            <form onSubmit={this._handleOnSubmit} className="login-form">
                                <div className="create-contact-details">
                                    <input
                                        required
                                        value={textInputEmail}
                                        type="text"
                                        name="email"
                                        placeholder="Email Address"
                                        onChange={(event) => this._handleInputChange("textInputEmail", event.target.value)}/>
                                    <input
                                        required
                                        value={textInputPassword}
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={(event) => this._handleInputChange("textInputPassword", event.target.value)}/>

                                    <button className="btn-primary">Login</button>
                                </div>
                            </form>

                        </div>
                    </div>}

            </Modal>
        );
    }
}

function mapStateToProps({user}) {
    return {
        user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginUser: (email, password) => dispatch(userActions.loginUser(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogin);
