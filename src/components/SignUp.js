import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import ReactLoading from 'react-loading';

import * as userActions from '../actions/user';

import smoked from '../assets/smoked.svg';

class SignUp extends Component {
    state = {
        inputEmail: "lopezredd@gmail.com",
        inputFirstName: "Edward",
        inputLastName: "Reyes",
        inputUserName: "zuko",
        inputPassword: "123456",
        showLoading: false,
        errorMessage: null
    };

    _handleSignUpFormSubmit = (e) => {
        e.preventDefault();
        const {history} = this.props;
        const {inputEmail, inputFirstName, inputLastName, inputUserName, inputPassword} = this.state;

        const user = {
            email: inputEmail,
            password: inputPassword,
            first_name: inputFirstName,
            last_name: inputLastName,
            username: inputUserName
        };

        this.setState({
            showLoading: true
        });

        this.props.registerNewUser(user).then(result => {
            if (result.error) {
                this.setState({
                    showLoading: false,
                    errorMessage: result.error.message
                });
            } else {
                history.replace("/");
            }

        });
    };

    _handleInputChange = (index, value) => {
        this.setState({
            [index]: value
        });
    };

    render() {
        const {inputEmail, inputFirstName, inputLastName, inputUserName, inputPassword, errorMessage, showLoading} = this.state;
        return (
            <div className="page">
                {showLoading ? (
                    <div style={{marginTop: 50}}>
                        <ReactLoading delay={0}  type={"spinningBubbles"} color={"red"}  />
                    </div>)
                    :(
                        <div className="sign-up-screen">

                            <img src={smoked}/>
                            <div>

                                {errorMessage && (
                                    <div className="error-box">
                                        <label>{errorMessage}</label>
                                    </div>
                                )}


                                <h1>Get started with an account</h1>
                                <p>Create a free Interactive Wall account to post everything about anything, like, share and who
                                    knows... </p>

                                <form className="sign-up-form" onSubmit={this._handleSignUpFormSubmit}>
                                    <div>
                                        <label>Email</label>
                                        <input type="email" value={inputEmail}
                                               onChange={(event) => this._handleInputChange("inputEmail", event.target.value)}
                                               required/>
                                    </div>

                                    <div>
                                        <label>First Name</label>
                                        <input type="text" value={inputFirstName}
                                               onChange={(event) => this._handleInputChange("inputFirstName", event.target.value)}
                                               required/>
                                    </div>

                                    <div>
                                        <label>Last Name</label>
                                        <input type="text" value={inputLastName}
                                               onChange={(event) => this._handleInputChange("inputLastName", event.target.value)}
                                               required/>
                                    </div>

                                    <div>
                                        <label>Username</label>
                                        <input type="text" value={inputUserName}
                                               onChange={(event) => this._handleInputChange("inputUserName", event.target.value)}
                                               required/>
                                    </div>

                                    <div>
                                        <label>Password</label>
                                        <input type="password" value={inputPassword}
                                               onChange={(event) => this._handleInputChange("inputPassword", event.target.value)}
                                               required/>
                                    </div>

                                    <div className="sign-up-form-footer">
                                        <button className="sign-up-action">Get Started!</button>
                                        <p>By clicking this button, you agree to Interactive Wall's Policy & Terms of use.</p>
                                    </div>


                                </form>

                            </div>
                        </div>
                    )

                }
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        registerNewUser: (user) => dispatch(userActions.registerNewUser(user)),
    }
}

export default connect(null, mapDispatchToProps)(withRouter(SignUp));
