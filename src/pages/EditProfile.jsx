import React from 'react';
import "./EditProfile.css";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { connect } from 'react-redux';
import { setBottomSheet, setPage, setSidenav } from '../actions/uiAction';
import { setUser } from '../actions/userAction';
import axios from 'axios';
import { useHistory } from 'react-router';
const FormControl = ({value,setValue,label,type})=>{
    
    return (<div className="edit__form__control">
    <label htmlFor={label}>{label}</label>
    <input type={type} name={label} id={label} value={value} onChange={(e)=>setValue(e.target.value)}/>
</div>)
}

function EditProfile(props) {

    const [name,setName] = React.useState(props.user && props.user.fullName);
    const [uname,setUname] = React.useState(props.user && props.user.user);
    const [website,setWebsite] = React.useState(props.user && props.user.website);
    const [bio,setBio] = React.useState(props.user && props.user.bio);
    const history = useHistory();



    const handleProfilePicture = async (img)=>{
        try{
            const r = await axios.put(`https://secure-woodland-04703.herokuapp.com/auth/add/avatar`,{img:img,id:props.user!=null&&props.user.id});
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
                
                const {user} = data;
                props.setUser(user);
            }).catch((err)=>{
                console.log(err);
            })
          }, false);
        
        
        if (file) {
            reader.readAsDataURL(file);
          }
    }


    const handleEdit = async ()=>{
        try{
            const r = await axios.put(`http://localhost:5000/auth/update/${props.user && props.user.id}`,{name,website,uname,bio});
            return r.data;
        }
        catch(e){
            if(e.response && e.response.data){
                return e.response.data;
            }
        }
    }

    const handleUpdate = ()=>{
        handleEdit().then((data)=>{
            if(data){
                const {user} = data;
                props.setUser(user);
                history.push(`/${props.user && props.user.user}/profile`);
            }
        }).catch((e)=>{
            console.log(e);
        })
    }

    const closeScreen = () =>{
        history.push(`/${props.user && props.user.user}/profile`);
    }



    return (
        <div className="editProfile">
            <div className="edit__profile__header">
                <div className="header__left">
                <button onClick={closeScreen}><CloseIcon/></button>
                <h3>Edit Profile</h3>
                </div>
                <div className="header__right" onClick={handleUpdate}>
                    <CheckIcon/>
                </div>
            </div>

            <div className="edit__profile__top">
                <div className="edit__avatar">
                    {props.user!=null?props.user.avatar?<img src={props.user.avatar} alt="user__avatar"/>:props.user.fullName[0]:null}
                </div>
                <form enctype="multipart/form-data">
                <div className="edit__form__control_file">
                    <label htmlFor="photo">Add profile photo</label>
                    <input type="file" name="photo" id="photo" onChange={handleFileUpload}/>
                </div>
            </form>
            </div>
            <div className="edit__profile__form">
                <FormControl label="Name" value={name} setValue={setName}/>
                <FormControl label="Username" value={uname} setValue={setUname}/>
                <FormControl label="Website" value={website} setValue={setWebsite}/>
                <FormControl label="Bio" value={bio} setValue={setBio}/>
            </div>
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
export default connect(mapStateToProps,mapDispatchToProps)(EditProfile)
