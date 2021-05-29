import React from 'react'
import { useHistory } from 'react-router';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HomeIcon from '../assets/HomeIcon';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
import { setUser } from '../actions/userAction';
import { setDrop, setPage } from '../actions/uiAction';

function BottomNavbar(props) {


    const history = useHistory();
    const handleNav = (link) =>{
        history.push(link);
    }
    return (
        <div className="bottom__navbar">
            <div className="bottom__navbar__wrapper">
                <button onClick={()=>handleNav('/')}><HomeIcon fill={props.activePage==="home" && true}/></button>
                <button onClick={()=>handleNav('/search')}><SearchIcon/></button>
                <button onClick={()=>handleNav('/activity')}>{props.activePage==="activity"?<FavoriteIcon/>:<FavoriteBorderIcon/>}</button>
                <button onClick={()=>handleNav(`/${props.user && props.user.user}/profile`)}>
                    <div className="bottom__avatar">
                    {props.user!=null ?props.user.avatar?<img src={props.user.avatar} alt="avatar__img"/>: props.user.fullName[0]:null}
                    </div>
                </button>
            </div>
            </div>
    )
}

const mapStateToProps = (state) =>({
    user: state.userReducer.user,
    drop: state.UIReducer.drop,
    activePage:state.UIReducer.activePage,
})

const mapDispatchToProps = (dispatch)=>({
    setUser:(user)=>dispatch(setUser(user)),
    setDrop:(drop)=>(dispatch(setDrop(drop))),
    setPage:(activePage)=>(dispatch(setPage(activePage))),
})



export default connect(mapStateToProps,mapDispatchToProps)(BottomNavbar)
