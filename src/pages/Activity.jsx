import React from 'react';
import { useHistory } from 'react-router';
import "./Activity.css"
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HomeIcon from '../assets/HomeIcon';
import { connect } from 'react-redux';
import { setUser } from '../actions/userAction';
import { setPage } from '../actions/uiAction';
import FavoriteIcon from '@material-ui/icons/Favorite';



function FollowActivity({type}){
    return (
    <div className="follow__activity">
            <div className="follow__avatar"></div>
            <div className="follow__text">This person who might know is on instagram</div>
            <button className="follow_btn">Follow</button>
    </div>
    
    )
}


function PostActivity(){
    return (
        <div className="post__activity">
            <div className="post__avatar"></div>
            <div className="post__activity__text"></div>
            <div className="post__thumb"></div>
        </div>
    )
}

function Activity(props) {

    React.useEffect(()=>{
        props.setPage("activity");
    },[]);
    const history = useHistory();
    const handleNav = (link) =>{
        history.push(link);
    }
    return (
        <div className="activity">

            <div className="screen__name">
                <div className="screen__name__wrapper">
                <h3>Activity</h3>
                </div>
                
            </div>
            <div className="activity__wrapper">
                <div className="current__activity">
                    <div className="activity__title">Today</div>
                    <div className="current__activity__lists">
                    <FollowActivity/>
                    <FollowActivity/>
                    </div>
                </div>
                <div className="yesterday__activity"></div>
                <div className="week__activity"></div>
                <div className="month__activity"></div>
                <div className="earlier__activity"></div>
            </div>
            <div className="bottom__navbar">
            <div className="bottom__navbar__wrapper">
                <button onClick={()=>handleNav('/')}><HomeIcon fill={props.activePage==="home" && true}/></button>
                <button onClick={()=>handleNav('/search')}><SearchIcon/></button>
                <button onClick={()=>handleNav('/activity')}>{props.activePage!=="activity"?<FavoriteBorderIcon/>:<FavoriteIcon/>}</button>
                <button onClick={()=>handleNav(`/${props.user && props.user.user}/profile`)}>
                    <div className="bottom__avatar">
                    {props.user!=null ?props.user.avatar?<img src={props.user.avatar} alt="avatar__img"/>: props.user.fullName[0]:null}
                    </div>
                </button>
            </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>({
    user: state.userReducer.user,
   
    activePage:state.UIReducer.activePage,
})

const mapDispatchToProps = (dispatch)=>({
    setUser:(user)=>dispatch(setUser(user)),
   
    setPage:(activePage)=>(dispatch(setPage(activePage))),
})



export default connect(mapStateToProps,mapDispatchToProps)(Activity)
