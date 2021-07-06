import React from 'react';
import { useHistory } from 'react-router';
import "./StartCard.css"
import axios from 'axios';
import { setUser, updateAvatar } from '../actions/userAction';
import { setDrop, setPage } from '../actions/uiAction';
import { connect } from 'react-redux';

function StartCard({title,subtitle,button,Icon,link,type,user,setUser}) {
    


    const history = useHistory();

    const handler = ()=>{
        history.push(link);
    }

    const handleProfilePicture = async (img)=>{
        try{
            const r = await axios.put(`http://localhost:5000/auth/add/avatar`,{img:img,id:user!=null&&user.id});
            return r.data;
        }
        catch(e){
            if(e.response && e.response.data){
                return e.response.data;
            }
        }
    }

    const handleFileUpload = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        
        const {size} = file;
        if(size>1555555){
            return alert("File is too big to upload a profile picture!");
        }

       


        reader.addEventListener("load", function () {
            // convert image file to base64 string
           
            handleProfilePicture(reader.result&& reader.result).then((data)=>{
                console.log(data);
                const {user} = data;
                setUser(user);
            }).catch((err)=>{
                console.log(err);
            })
          }, false);
        
        
        if (file) {
            reader.readAsDataURL(file);
          }
    }

  
    return (
        <div className="startCard">
            <div className="card__top">
            <div className="start__card__icon">
                <Icon/>
            </div>
            <h3>{title}</h3>
            <p>{subtitle}</p>
            </div>
            {type==="photo"?<form enctype="multipart/form-data">
                <div className="form__control_file">
                    <label htmlFor="photo">Add profile photo</label>
                    <input type="file" name="photo" id="photo" onChange={handleFileUpload}/>
                </div>
            </form>:<button className="card__button" onClick={handler}>
                {button}
            </button>}
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
    updateAvatar:(avatar)=>(dispatch(updateAvatar(avatar)))
})



export default connect(mapStateToProps,mapDispatchToProps)(StartCard)

/**
 * 
 * url(/static/bundles/es6/sprite_glyphs_55fdcdb93af0.png/55fdcdb93af0.png)
 */