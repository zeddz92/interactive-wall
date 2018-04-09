import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as postActions from '../actions/posts';
import * as categoriesActions from '../actions/categories';
import * as userActions from '../actions/user';
import ModalNewPost from './ModalNewPost';
import ModalLogin from './ModalLogin';
import Post from './Post';


class Main extends Component {

    state = {
        newPostModalVisible: false,
        loginModalVisible: false,
        posts: []
    };


    componentDidMount() {
        this.props.fetchPosts();
        this.props.fetchCategories();

    }

    _handleToggleNewPostModal = () => {
        this.setState((state) => ({
            newPostModalVisible: !state.newPostModalVisible
        }))
    };

    _handleToggleLoginModal = () => {
        this.setState((state) => ({
            loginModalVisible: !state.loginModalVisible
        }))
    };

    _handleFilterByCategory = (id) => {
        this.props.filterPostsByCategory(id);
    };



    render() {
        const {newPostModalVisible, loginModalVisible} = this.state;
        const {posts, categories, user} = this.props;

        return (
            <div>

                <div className="header">

                    <div style={{float: 'left'}}>
                        <label className="header-app-name">Interactive Wall</label>

                    </div>

                    {user.id !== null ?

                        <div style={{float: 'right'}} className="center-vertically">
                            <label className="header-username">{user.data.username}</label>
                            <img src={"http://svgur.com/i/65U.svg"} className="header-profile-picture" alt="logo"/>
                            <a onClick={this.props.logoutUser} className="logout-action header-username">Logout</a>

                        </div>
                        :

                        <div style={{float: 'right'}} className="unregistered-actions center-vertically">
                            <a onClick={this._handleToggleLoginModal} className="login-action header-username">Login</a>
                            <Link className="header-username" to={{pathname: "signup"}}>Sign Up</Link>

                        </div>
                    }

                </div>

                <div className="container">

                    <div className="categories-section">
                        <a className="category-title">Categories</a>

                        <a onClick={() => this._handleFilterByCategory(0)} className="category-sub">All</a>

                        {categories.map((c) => (
                            <a onClick={() => this._handleFilterByCategory(c.id)} key={c.name}
                               className="category-sub">{c.name}</a>
                        ))}


                    </div>

                    <div style={{marginLeft: 30, minWidth: 556}}>
                        {user.id !== null && (
                            <div onClick={this._handleToggleNewPostModal} className="new-post">
                                <img src={"http://svgur.com/i/65U.svg"} className="header-profile-picture" alt="logo"/>
                                <label>Post something</label>
                            </div>
                        )}

                        <div className={"post-list"}>
                            {posts.map((p) => (
                                <Post key={p.id} data={p}/>
                            ))}
                        </div>

                        <div>
                            <button className="load-more-button">
                                Load more
                            </button>
                        </div>
                    </div>

                </div>

                <ModalNewPost modalVisible={newPostModalVisible} toggleModal={this._handleToggleNewPostModal}/>
                <ModalLogin modalVisible={loginModalVisible} toggleModal={this._handleToggleLoginModal}/>

            </div>
        )

    }

}

function mapStateToProps({post, category, user}) {
    return {
        posts: post.filtered ? post.filtered : [],
        categories: category,
        user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: () => dispatch(postActions.fetchPosts()),
        createPost: (userId, post) => dispatch(postActions.createPost(userId, post)),
        fetchCategories: () => dispatch(categoriesActions.fetchCategories()),
        filterPostsByCategory: (categoryId) => dispatch(postActions.filterPostsBy(categoryId)),
        loginUser: (email, password) => dispatch(userActions.loginUser(email, password)),

        logoutUser: () => dispatch({
            type: "USER_LOGOUT",
            payload: {}
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

