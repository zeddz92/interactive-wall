import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

function Post(props) {
    const {data, user} = props;

    return (
        <div className="post">

            <div className="post-info">
                <div className="post-header">
                    <img src={"http://svgur.com/i/65U.svg"} className="header-profile-picture"
                         alt="logo"/>
                    <label>{data.username}</label>
                </div>
                <div className="divider"/>
                {data.image_url && (
                    <img style={{marginRight: 15}} src={data.image_url}
                         className="post-image" alt="logo"/>
                )}

                <div className="post-body">
                    <label className="post-title">{data.title}</label>
                    <p className="post-message">{data.body}</p>
                </div>
            </div>


            {/*{user.id !== null && (
                <div className="comment-section">
                    <img src={"http://svgur.com/i/65U.svg"} className="header-profile-picture"
                         alt="logo"/>
                    <input placeholder="Comment"/>
                </div>
            )}*/}
        </div>
    )

}

Post.propTypes = {
    data: PropTypes.object.isRequired,
};

function mapStateToProps({user}) {
    return {
        user
    }
}

export default connect(mapStateToProps)(Post);