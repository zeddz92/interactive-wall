import React, {Component} from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Select from 'react-select';
import firebase from 'firebase';
import ReactLoading from 'react-loading';


import * as postActions from '../actions/posts';

import picture from '../assets/picture.svg';

class ModalNewPost extends Component {

    static propTypes = {
        modalVisible: PropTypes.bool.isRequired,
        toggleModal: PropTypes.func.isRequired,

    };

    state = {
        inputTitle: "",
        inputBody: "",
        selectCategory: "",
        showLoading: false,
        errorMessage: null
    };


    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            inputTitle: "",
            inputBody: "",
            selectCategory: "",
            showLoading: false,
            errorMessage: null
        });
    }



    _handleInputChange = (index, value) => {
        this.setState({
            [index]: value
        });

    };


    _handleCategoryOnChange = (category) => {
        this.setState({
            selectCategory: category.value
        });

    };

    _handleOnSubmit = (event) => {
        event.preventDefault();
        const {toggleModal, user} = this.props;
        const {inputTitle, inputBody, selectCategory} = this.state;

        this.setState({
            showLoading: true
        });

        const post = {
            title: inputTitle,
            body: inputBody,
            category_id: selectCategory,
            user_id: user.id,
            username: user.data.username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        this.props.createPost(user.id, post).then(result => {
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


    render() {
        const {modalVisible, toggleModal, categories} = this.props;
        const {inputTitle, inputBody, selectCategory, showLoading} = this.state;

        return (
            <Modal
                className="modal modal-post"
                overlayClassName="overlay"
                isOpen={modalVisible}
                onRequestClose={toggleModal}
                contentLabel="Modal">

                {showLoading ?
                    <div className="center">
                        <ReactLoading delay={0} type={"spinningBubbles"} color={"red"}/>
                    </div> :

                <form onSubmit={this._handleOnSubmit}>
                    <a onClick={toggleModal} className="close-modal"> Close </a>


                    <div className="new-post-modal-body">
                        <div className="modal-post-section">

                            <img src={"http://svgur.com/i/65U.svg"} className="header-profile-picture"
                                 alt="logo"/>
                            <div className="post-form">
                                <Select
                                    required={true}
                                    className="category-select"
                                    style={{maxWidth: 200}}
                                    name="form-field-name"
                                    onChange={this._handleCategoryOnChange}
                                    value={selectCategory}
                                    placeholder={"Select a category"}
                                    options={
                                        categories.map((c) => (
                                            {value: c.id, label: c.name}
                                        ))

                                    }
                                />
                                <input value={inputTitle}
                                       onChange={(event) => this._handleInputChange("inputTitle", event.target.value)}
                                       placeholder="Title" required/>
                                <textarea value={inputBody} rows={3}
                                          onChange={(event) => this._handleInputChange("inputBody", event.target.value)}
                                          placeholder="Post Something" required>
                            </textarea>
                            </div>

                        </div>

                    </div>

                    <div className="modal-footer post-actions">
                        <img className="post-action" src={picture}/>
                        <button className="post-action post-action-save">Post</button>
                    </div>
                </form>}


            </Modal>
        );
    }
}

function mapStateToProps({category, user}) {
    return {
        categories: category,
        user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createPost: (userId, post) => dispatch(postActions.createPost(userId, post)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalNewPost);