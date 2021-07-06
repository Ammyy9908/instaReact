import React from 'react'
import { connect } from 'react-redux';
import "./NewPostModal.css"
import axios from 'axios';
import { setNewPost } from '../actions/uiAction';



function Switch({isComment,setComment}){

   return <div className="toggle-switch">
       <input type="checkbox" className="toggle-switch-checkbox" name="toggleSwitch" id="toggleSwitch" onChange={()=>setComment(!isComment)} />
  <label className="toggle-switch-label" htmlFor="toggleSwitch">
    <span className="toggle-switch-inner"></span>
    <span className="toggle-switch-switch"></span>
  </label>
   </div>
}
function NewPostModal(props) {
   const [image,setImage] = React.useState(null);
   const [isCompose,setCompose] = React.useState(false);
   const [isSetting,setSetting] = React.useState(false);
   const [isAccess,setAccess] = React.useState(false);
   const [alt,setAlt] = React.useState('');
   const [isComment,setComment] = React.useState(false);
   const [location,setLocation] = React.useState('');
   const [caption,setCaption] = React.useState('');


   const handleImageSelect = (e)=>{
      const file = e.target.files[0];
      const reader = new FileReader();
      if(file){
     
      if(file.size/1024>2048){
         return alert("File is too big");
      }

      reader.addEventListener("load", function () {
         // convert image file to base64 string
         // console.log(reader.result);
         setImage(reader.result);
         setCompose(true);
       }, false);
      reader.readAsDataURL(file);
   }
}



const handleShare = ()=>{
   axios.post(`https://secure-woodland-04703.herokuapp.com/post/add`,{image,commentOff:isComment,altText:alt,location,caption,user:{name:props.user.fullName,id:props.user.id,avatar:props.user.avatar},uploadAt:new Date().getTime()})
   .then((response)=>{

      if(response.status===200){
         props.setNewPost(false);
         setImage(null);
         setCaption('');
         setComment(false);
         setLocation('');
         setCompose(false);
         setSetting(false);
         setAccess(false);
         setAlt('');
      }
   })
}

const handleClose = (e)=>{
   if(e.target.classList.contains("newPostModal")){
      props.setNewPost(false);
         setImage(null);
         setCaption('');
         setComment(false);
         setLocation('');
         setCompose(false);
         setSetting(false);
         setAccess(false);
         setAlt('');
   }
}

const ModalClose = ()=>{
         props.setNewPost(false);
         setImage(null);
         setCaption('');
         setComment(false);
         setLocation('');
         setCompose(false);
         setSetting(false);
         setAccess(false);
         setAlt('');
}

const handleBack = ()=>{
   setImage(null);
   setCaption('');
   setComment(false);
   setLocation('');
   setCompose(false);
   setSetting(false);
   setAccess(false);
   setAlt('');
}



console.log(isComment);
   return (
      <div className="newPostModal" onClick={handleClose}>
         <div className="new__post_popup">
            <div className="new_post__popup__header">
               {isCompose && <button className="back__button" onClick={handleBack}><svg aria-label="Back" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path></svg></button>}
               <div className="header__heading">
                  <h3>{!isCompose?"New Post":"Compose"}</h3>
               </div>
               <button className="close_popup" onClick={ModalClose}>
               <svg aria-label="Close" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M41.1 9.1l-15 15L41 39c.6.6.6 1.5 0 2.1s-1.5.6-2.1 0L24 26.1l-14.9 15c-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1l14.9-15-15-15c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l15 15 15-15c.6-.6 1.5-.6 2.1 0 .6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path></svg>
               </button>
            </div>
            {!isCompose ?<div className="post__popup__body">
               <div className="post__popup__body__wrapper">
               <svg aria-label="Icon to represent media such as images or videos" class="_8-yf5 " fill="#262626" height="77" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"></path></svg>
               <div className="post__popup__body__subheading">Select photos and videos here.</div>
               <div className="photo__browse__button">
                  <label htmlFor="photo">Select from computer</label>
                  <input type="file" name="photo" id="photo" accept="image/jpeg,image/jpg" onChange={handleImageSelect}/>
               </div>
               </div>
            </div>:
            <div className="post_compose_body">
               <div className="post__preview">
                  <img src={image} alt={alt.length>0?alt:"alt__text"}/>
               </div>
               <div className="post_compose__controls">
               <div className="post_compose__control__header">
                  <div className="user__avatar">
                     <img src={props.user.avatar} alt="" />
                  </div>
                  <span>Sumit Bighaniya</span>
               </div>
               <textarea placeholder="Write a caption" value={caption} onChange={(e)=>setCaption(e.target.value)}/>
               <div className="location__input">
                  <input type="text" name="location" id="location" placeholder="Add Location..." value={location} onChange={(e)=>setLocation(e.target.value)}/>
                  <button><svg aria-label="Add Location..." class="_8-yf5 " fill="#8e8e8e" height="16" viewBox="0 0 48 48" width="16"><path clip-rule="evenodd" d="M24 22.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" fill-rule="evenodd"></path><path d="M24 3c8.8 0 16 7.1 16 15.9 0 9.6-9.8 20.5-16 25.8-6.2-5.3-16-16.2-16-25.8C8 10.1 15.2 3 24 3m0-3C13.5 0 5 8.5 5 18.9 5 31.3 18.4 44 22.7 47.5c.4.3.8.5 1.3.5s.9-.2 1.3-.5C29.6 44 43 31.3 43 18.9 43 8.5 34.5 0 24 0z"></path></svg></button>
               </div>
               <div className="post__dropdowns">
                  <div className="accessibility__dropdown">
                     <div className="dropdown__header">
                        <h3>Accessibility</h3>
                        <button onClick={()=>setAccess(!isAccess)}><span><svg aria-label="Up Chevron Icon" class={`${!isAccess&&"disabled__arrow"}`} fill="#262626" height="16" viewBox="0 0 48 48" width="16"><path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path></svg></span></button>
                     </div>
                     {isAccess && <div className="accessibility__body">
                        <p>Alt text describes your photos for people with visual impairments.</p>
                        <div className="accessibility__inputs">
                           <img src={image} alt="access__thumb" />
                           <div className="alt__input"><input type="text" name="alt" id="alt" placeholder="Write alt text..." value={alt} onChange={(e)=>setAlt(e.target.value)}/></div>
                        </div>
                     </div>}
                  </div>
                  <div className="setting__dropdown">
                  <div className="dropdown__header">
                        <h3>Advanced Settings</h3>
                        <button onClick={()=>setSetting(!isSetting)}><span><svg aria-label="Up Chevron Icon" class={`${!isSetting&&"disabled__arrow"}`} fill="#262626" height="16" viewBox="0 0 48 48" width="16"><path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path></svg></span></button>
                     </div>
                  </div>
                  {isSetting && <div className="settings__body">
                     <div className="comment_controls">
                        <span>Turn Off Commenting</span>
                        <Switch setComment={setComment} isComment={isComment}/>
                     </div>
                  </div>}

                  <button className={`share__btn ${caption.length>0&&"share__enable"}`} onClick={caption.length>6 && handleShare}>Share</button>
               </div>
               </div>
               </div>}
         </div>
      </div>
   )
}

const mapStateToProps = (state) =>({
   user: state.userReducer.user,
})
const mapdDispatchToProps =(dispatch)=>({
   setNewPost:(isNewPost)=>(dispatch(setNewPost(isNewPost))),
})
export default connect(mapStateToProps,mapdDispatchToProps)(NewPostModal)
