import Cookies from 'js-cookie';
import React from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import Navbar from '../components/Navbar';
import "./Profile.css";

function Profile(props) {
    const history = useHistory();
    // check is user authenticated or not
    React.useEffect(()=>{
        
        if(!Cookies.get("AUTH_TOKEN")){
            history.push(`/auth/login`);
        }
    },
     // eslint-disable-next-line
    [])
    return (
        <div className="profile__page">
            <Navbar/>
            <div className="profile__page__wrapper">
                <div className="profile__top">
                    
                    <div className="user__avatar__big">
                    {props.user && props.user.fullName.slice(0,2)}
                    </div>
                    <div className="user__profile__details">
                            <div className="detail__first">
                                <h3>{props.user && props.user.user}</h3>
                                <button className="profile__edit__btn">Edit Profile</button>
                                <button className="setting__btn">
                                <svg aria-label="Options" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5 0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6 0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5 1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1 1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1 1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1 4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3 1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3 6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z" fill-rule="evenodd"></path></svg>
                                </button>
                            </div>
                            <div className="detail__second">
                                <span>0 posts</span>
                                <span>1 followers</span>
                                <span>3 followings</span>
                            </div>
                            <div className="detail__third">
                                <span>{props.user && props.user.fullName}</span>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>({
    user: state.userReducer.user,
})
export default connect(mapStateToProps,null)(Profile)
