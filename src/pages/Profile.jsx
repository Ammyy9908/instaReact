import Cookies from 'js-cookie';
import React from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { setBottomSheet, setPage, setSidenav } from '../actions/uiAction';
import Navbar from '../components/Navbar';
import "./Profile.css";
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { setUser } from '../actions/userAction';

import BottomNavbar from '../components/BottomNavbar';
import Sidenav from '../components/Sidenav';

function Profile(props) {
    
    React.useEffect(()=>{
        props.setPage('profile');
    },
     // eslint-disable-next-line
    []);


    const history = useHistory();
    // check is user authenticated or not
    React.useEffect(()=>{
        
        if(!Cookies.get("AUTH_TOKEN")){
            history.push(`/auth/login`);
        }
    },
     // eslint-disable-next-line
    [])


    const handleSheetClose = (e)=>{
        if(e.target.classList.contains('bottom__sheet')){
            props.setBottomSheet(false);
        }
    }


  
  


    const handleSidenavClose =(e)=>{
        console.log(e.target);
        if(!e.target.classList.contains("hamburger__btn")){
            props.setSidenav(false);
        }
    }


    const handleEditNav = () =>{
        history.push(`/${props.user!=null&&props.user.user}/profile/edit`);
    }
    return (
        <div className="profile__page">
            <Navbar/>

            <Sidenav is_enable={props.sidenav&&props.sidenav}/>
            <div className="profile__page__wrapper">
                <div className="profile__top">
                    
                    <div className="user__avatar__big">
                    {props.user!=null ? props.user.avatar?<img src={props.user.avatar} alt="avatar__img"/>:props.user.fullName.slice(0,2):null}
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

            <div className="profile__mobile" onClick={handleSidenavClose}>
                <div className="profile__mobile__nav">
                    <div className="profile__nav__wrapper">
                    <div className="profile__username" onClick={()=>props.setBottomSheet(true)}>{props.user && props.user.user} <ExpandMoreIcon/></div>
                    <div className="profile__nav__controls">
                        <button className="proifle__add"><AddIcon/></button>
                        <button className="hamburger__btn" onClick={()=>props.setSidenav(true)}>
                            <MenuIcon/>
                        </button>
                    </div>
                    </div>
                </div>

                <div className="profile__mobile__top">
                    <div className="profile__mobile__wrapper">
                    <div className="profile__mobile__avatar">
                        {props.user!=null ?props.user.avatar?<img src={props.user.avatar} alt="avatar__img"/>:props.user.fullName[0]:null}
                    </div>
                    <div className="profile__mobile__textual">
                        <span>3<div>Posts</div></span><span>90<div>Followers</div></span><span>236<div>Following</div></span>
                    </div>
                    </div>

                    <div className="profile__basic__info">
                        <span className="basic__uname">{props.user && props.user.fullName}</span>
                        <span className="caption">{props.user && props.user.bio}</span>
                        <a className="user_website" href="/">{props.user && props.user.website}</a>
                    </div>
                    <div className="edit__profile__wrapper">
                        <button onClick={handleEditNav}>Edit Profile</button>
                        <div className="btn__arrow__down">
                            <ExpandMoreIcon/>
                        </div>
                    </div>
                </div>



                

                {props.bottomSheet && <div className={`bottom__sheet`} onClick={handleSheetClose}>
                    <div className={`bottom__sheet__body ${!props.bottomSheet && "bottom__sheet__down"}`}>
                    <div className="bottom__sheet__top__tile">
                        <span className="sheet__closer" onClick={()=>props.setBottomSheet(false)}></span>
                    </div>
                    <div className="sheet__accounts">
                        <div className="account_list">
                            <div className="list__left">
                            <div className="account__avatar">
                                {props.user!=null ?props.user.avatar?<img src={props.user.avatar} alt="user__avatar"/>:props.user.fullName[0]:null}
                            </div>
                            <span className="account__name">{props.user && props.user.user}</span>
                            </div>
                            <div className="custom__radio">
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div className="add__account__list">
                        <div className="list__left">
                        <button className="new_account__btn"><AddIcon/></button>
                        <span>Add account</span>
                        </div>
                    </div>
                    </div>
                </div>}
            </div>
            <BottomNavbar/>
        </div>
    )
}

const mapStateToProps = (state) =>({
    user: state.userReducer.user,
   
    activePage:state.UIReducer.activePage,
    bottomSheet:state.UIReducer.bottomSheet,
    sidenav:state.UIReducer.sidenav,
})

const mapDispatchToProps = (dispatch)=>({
    setUser:(user)=>dispatch(setUser(user)),
   
    setPage:(activePage)=>(dispatch(setPage(activePage))),
    setBottomSheet:(bottomSheet)=>(dispatch(setBottomSheet(bottomSheet))),
    setSidenav:(sidenav)=>(dispatch(setSidenav(sidenav)))
})
export default connect(mapStateToProps,mapDispatchToProps)(Profile)
