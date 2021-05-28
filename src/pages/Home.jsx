import axios from 'axios';
import Cookies from 'js-cookie'
import React from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { setDrop } from '../actions/uiAction';
import { setUser } from '../actions/userAction';
import Navbar from '../components/Navbar';
import StartCard from '../components/StartCard';
// import Stories from '../components/Stories';
import Suggestion from '../components/Suggestion';
import "./Home.css"
import PhoneIcon from '@material-ui/icons/Phone';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Post from '../components/Post';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HomeIcon from '../assets/HomeIcon';

function Home(props) {

    console.log("user Props are",props)
const [browser,setBorwser] = React.useState('');
    async function getBrowser(){
        var navUserAgent = navigator.userAgent;
var browserName  = navigator.appName;
var browserVersion  = ''+parseFloat(navigator.appVersion); 
// var majorVersion = parseInt(navigator.appVersion,10);
var tempNameOffset,tempVersionOffset,tempVersion;


if ((tempVersionOffset=navUserAgent.indexOf("Opera"))!==-1) {
 browserName = "Opera";
 browserVersion = navUserAgent.substring(tempVersionOffset+6);
 if ((tempVersionOffset=navUserAgent.indexOf("Version"))!==-1) 
   browserVersion = navUserAgent.substring(tempVersionOffset+8);
} else if ((tempVersionOffset=navUserAgent.indexOf("MSIE"))!==-1) {
 browserName = "Microsoft Internet Explorer";
 browserVersion = navUserAgent.substring(tempVersionOffset+5);
} else if ((tempVersionOffset=navUserAgent.indexOf("Chrome"))!==-1) {
 browserName = "Chrome";
 browserVersion = navUserAgent.substring(tempVersionOffset+7);
} else if ((tempVersionOffset=navUserAgent.indexOf("Safari"))!==-1) {
 browserName = "Safari";
 browserVersion = navUserAgent.substring(tempVersionOffset+7);
 if ((tempVersionOffset=navUserAgent.indexOf("Version"))!==-1) 
   browserVersion = navUserAgent.substring(tempVersionOffset+8);
} else if ((tempVersionOffset=navUserAgent.indexOf("Firefox"))!==-1) {
 browserName = "Firefox";
 browserVersion = navUserAgent.substring(tempVersionOffset+8);
} else if ( (tempNameOffset=navUserAgent.lastIndexOf(' ')+1) < (tempVersionOffset=navUserAgent.lastIndexOf('/')) ) {
 browserName = navUserAgent.substring(tempNameOffset,tempVersionOffset);
 browserVersion = navUserAgent.substring(tempVersionOffset+1);
 if (browserName.toLowerCase()===browserName.toUpperCase()) {
  browserName = navigator.appName;
 }
}

// trim version
if ((tempVersion=browserVersion.indexOf(";"))!==-1)
   browserVersion=browserVersion.substring(0,tempVersion);
if ((tempVersion=browserVersion.indexOf(" "))!==-1)
   browserVersion=browserVersion.substring(0,tempVersion);

return browserName;
    }

    const history = useHistory();
    React.useEffect(() =>{
        
        //check authentication status
        if(!Cookies.get("AUTH_TOKEN")){
            return history.push("/auth/login");
        }
        async function getUser() {
                try{
                    const r = await axios.get('https://secure-woodland-04703.herokuapp.com/auth/user',{headers:{
                        "Authorization":"Bearer " +Cookies.get("AUTH_TOKEN"),
                        "Content-Type":"application/json"
                    }})

                    return r.data;
                }
                catch(e) {
                    if(e.response && e.response.data){
                        return e.response.data;
                    }
                }
        }

        async function getLocation(){
            try{
                const r = await axios.get('https://ipinfo.io/json?token=6aac6eda5b818a');
                return r.data;
            }
            catch(e){
                if(e.response && e.response.data){
                    return e.response.data;
                }
            }
        }
        getBrowser().then((data)=>{
            console.log(data);
            setBorwser(data);
        })
       

        getUser().then((data) => {
            console.log("User data",data);
            props.setUser(data.user);
        }).then(()=>{
            getLocation().then((data)=>{
                console.log(data);
                try{
                    const r = axios.put("https://secure-woodland-04703.herokuapp.com/auth/updateActivity",{data,browser:browser && browser,email: props.user && props.user.email});
                    console.log(r.data)
                }
                catch(e){
                    console.log(e);
                }
            }).catch((e)=>{
                console.error("Location error",e);
            })
        })
        .catch((err) => {
            console.error(err)
        })

    
    },
     // eslint-disable-next-line
    [])

    // move the user to profile page
    const handleProfileNav =()=>{
        history.push(`/${props.user && props.user.user}/profile`);
    }


    function MessageIcon(){
        return <svg aria-label="Messenger" class="_8-yf5 " fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path d="M36.2 16.7L29 22.2c-.5.4-1.2.4-1.7 0l-5.4-4c-1.6-1.2-3.9-.8-5 .9l-6.8 10.7c-.7 1 .6 2.2 1.6 1.5l7.3-5.5c.5-.4 1.2-.4 1.7 0l5.4 4c1.6 1.2 3.9.8 5-.9l6.8-10.7c.6-1.1-.7-2.2-1.7-1.5zM24 1C11 1 1 10.5 1 23.3 1 30 3.7 35.8 8.2 39.8c.4.3.6.8.6 1.3l.2 4.1c0 1 .9 1.8 1.8 1.8.2 0 .5 0 .7-.2l4.6-2c.2-.1.5-.2.7-.2.2 0 .3 0 .5.1 2.1.6 4.3.9 6.7.9 13 0 23-9.5 23-22.3S37 1 24 1zm0 41.6c-2 0-4-.3-5.9-.8-.4-.1-.8-.2-1.3-.2-.7 0-1.3.1-2 .4l-3 1.3V41c0-1.3-.6-2.5-1.6-3.4C6.2 34 4 28.9 4 23.3 4 12.3 12.6 4 24 4s20 8.3 20 19.3-8.6 19.3-20 19.3z"></path></svg>
    }
    return (
        <div className="home__container">

         
            <Navbar/>

            <div className="navbar__mobile">
                <div className="navbar__mobile__left"><button><AddIcon/></button></div>
                <div className="navbar__mobile__center">
                <img alt="Instagram" class="s4Iyt" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" srcset="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png 2x"/>
                </div>
                <div className="navbar__mobile__right">
                    <button><MessageIcon/></button>
                </div>
            </div>
           <div className="body__container" onClick={()=>props.drop && props.setDrop(false)}>
           <div className="blank"></div>
            <div className="home__body">
                <div className="body__main__wrapper">
                <div className="posts">
                    {/* <Stories/> */}
                    <div className="getting__started">
                      {props.user!=null ? !props.user.phone &&  <div className="getting__started__header">
                           Getting Started
                       </div>:null}

                       <div className="start__cards">
                       {props.user && !props.user.phone && <StartCard title="Add Phone Number" subtitle="Add your phone number so you can reset your password, find friends and more." button="Add Phone Number" Icon={PhoneIcon} link="/accounts/confirm-phone"/>}
                        {props.user && !props.user.avatar && <StartCard title="Add Profile Photo" subtitle="Add a profile photo so your friends know it's you." button="Add Profile Photo" Icon={PhotoCameraIcon} link="/accounts/profile-picture"/> }
                       </div>

                    </div>

                    <div className="users__posts">
                        <Post keyword={"mountain"} likes={250}/>
                        <Post keyword={"grass"} likes={120}/>
                        <Post keyword={"night"} likes={50}/>
                        <Post keyword={"party"} likes={65}/>
                       
                    </div>
                </div>
                <div className="bottom__navbar">
            <div className="bottom__navbar__wrapper">
                <button><HomeIcon/></button>
                <button><SearchIcon/></button>
                <button><FavoriteBorderIcon/></button>
                <button>
                    <div className="bottom__avatar">
                    {props.user!=null ?props.user.avatar?<img src={props.user.avatar} alt="avatar__img"/>: props.user.fullName[0]:null}
                    </div>
                </button>
            </div>
            </div>
                </div>
                <div className="home__profile">
                    <div className="home__profile__header" onClick={handleProfileNav}>
                        <div className="user_avatar">
                        {props.user!=null ?props.user.avatar?<img src={props.user.avatar} alt="avatar__img"/>: props.user.fullName[0]:null}
                        </div>
                        <div className="user__textual__info">
                            <span>{props.user && props.user.fullName}</span>
                            <p>{props.user && props.user.user}</p>
                        </div>
                        <div className="account_switcher">
                            <span>Switch</span>
                        </div>
                    </div>
                    <div className="suggesstions">
                        <div className="suggesstion__header">
                            <span className="textual__left">
                                Suggesstions for you
                            </span>
                            <div className="sell_all">
                                See all
                            </div>
                        </div>
                        <div className="suggesstions__container">
                            <Suggestion name="Amit Kumar"/>
                            <Suggestion name="Amit Kumar"/>
                            <Suggestion name="Amit Kumar"/>
                            <Suggestion name="Amit Kumar"/>
                            <Suggestion name="Amit Kumar"/>
                          
                        </div>
                    </div>
                </div>
            </div>

           
            <div className="blank"></div>
           </div>
        </div>
    )
}

const mapStateToProps = (state) =>({
    user: state.userReducer.user,
    drop: state.UIReducer.drop
})

const mapDispatchToProps = (dispatch)=>({
    setUser:(user)=>dispatch(setUser(user)),
    setDrop:(drop)=>(dispatch(setDrop(drop)))
})



export default connect(mapStateToProps,mapDispatchToProps)(Home)
