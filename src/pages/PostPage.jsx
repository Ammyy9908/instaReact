import React from 'react'
import Navbar from '../components/Navbar';
import BookMarkIcon from '../assets/BookMarkIcon';
import CommentIcon from '../assets/CommentIcon';
import LikeIcon from '../assets/LikeIcon';
import SendIcon from '../assets/SendIcon';
import SmilyIcon from '../assets/SmilyIcon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import "./PostPage.css";
import axios from "axios";
import { connect } from 'react-redux';
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo';

function Comment({comment,name,avatar,timestamp}){
   return <div className="comment">
      <div className="comment__info">
         <div className="comment__avatar">
            <img src={avatar} alt="comment__avatar" />
         </div>
         <span><strong>{name}</strong>~{comment.length>20?comment.slice(0,19)+"...":comment}</span>
      </div>
      <span className="comment__timestamp">
      <ReactTimeAgo date={parseInt(timestamp)} locale="en-US" timeStyle="round-minute"/>
      </span>
   </div>
}
function PostPage(props) {

   const [post,setPost] = React.useState(null);
   const [comments,setComments] = React.useState(null);
   const [comment,setComment] = React.useState('');
   const [liked,setLiked] = React.useState(false);
   const [likes,setLikes] = React.useState(0);

   React.useEffect(() =>{

      const fetchPost = async ()=>{
try{
   const r = await axios.get(`https://secure-woodland-04703.herokuapp.com/post/${props.id}`)
   return r.data.post;
}
catch(e){
   if(e){
      return e.message;
   }
}
      }


      const fetchComments = async (post)=>{
         console.log("Incoming post: ",post);
         try{
            const r = await axios.get(`https://secure-woodland-04703.herokuapp.com/photo/fetch/${post._id}`)
            console.log("Fetched comments",r.data);
            return r.data.comments;
         }
         catch(e){
            if(e){
               return e.message;
            }
         }
      }

      fetchPost().then((post)=>{
         setPost(post);
         if(post.likes.filter((person)=>person.id===props.user.id).length>0){
            setLiked(true);
          }
          setLikes(post.likes.length);
         fetchComments(post).then((comments)=>{
            setComments(comments);
         })


      })
     


      
      

      // axios.get(`http://localhost:5000/photo/fetch/${id}`).then((r)=>{
      //    console.log("comments",r.data);
      //    setComments(r.data.comments);
      //    })
   },
   // eslint-disable-next-line
   [])


  


   const handleComment = ()=>{
      axios.post(`https://secure-woodland-04703.herokuapp.com/photo/comment`,{photo_id:post._id,comment:comment,user:{name:props.user.fullName,id:props.user.id,avatar:props.user.avatar},timestamp:new Date().getTime()}).then((r)=>{
         console.log(r.data);
         setComments([r.data,...comments]);
         setComment('');
     })
   }


   const handleLike = ()=>{
      axios.put(`https://secure-woodland-04703.herokuapp.com/post/like/${post._id}`,{user:{name:props.user.fullName,id:props.user.id}})
      .then((response)=>{
          if(response.status===200){
              setLiked(true);
              setLikes(likes+1);
              return true;
          }
      })
   }

   const handleDislike = ()=>{
      axios.put(`https://secure-woodland-04703.herokuapp.com/post/unlike/${post._id}`,{user:{id:props.user.id}})
      .then((response)=>{
          if(response.status===200){
              setLiked(false);
              setLikes(likes-1);
              
          }
      })
   }

 

   return (
      <div className="post-page">
         <Navbar/>
         {post && <div className="post-page-body">
            <div className="post-page-wrapper">
               <div className="post-page-main">
                  <img src={post.image.url} alt="" />
               </div>
               <div className="post-page-info">
                  <div className="post-page__header">
                     <div className="header__left">
                        <div className="post__avatar">
                           <img src={post.upload_by.avatar} alt="" />
                        </div>
                        <span>{post.upload_by.name}</span>
                     </div>
                     <span className="more_mobile">
                <MoreVertIcon/>
                    
                </span>

                <span className="more__desktop">
                    <MoreHorizIcon/>
                </span>
                  </div>
                 {post.commentOff && <div className="blank__comments">
                     The comments for this post is Turned off
                  </div>}
                  {!post.commentOff && <div className="post__comments__Section">
                      
                     

                        {
                           comments && comments.map((comment,i)=>{
                              return    <Comment key={i} comment={comment.comment} name={comment.comment_by.name} avatar={comment.comment_by.avatar} timestamp={comment.timestamp} />
                           })
                        }
                     
                  </div>}
                  <div className="post__controls__page">
                     <div className="post__buttons">
                     <div className="controls__left">
                        <button onClick={liked?handleDislike:handleLike}><LikeIcon fill={liked && liked}/></button>
                        <button><CommentIcon/></button>
                        <button><SendIcon/></button>
                     </div>
                     <div className="control__right">
                        <button><BookMarkIcon/></button>
                     </div>
                     </div>
                     <span className="like__counts">{likes} likes</span>
                     <time className="post__timestamp"><ReactTimeAgo date={parseInt(post.uploadAt)} locale="en-US" timeStyle="round-minute"/></time>
                     {!post.commentOff && <div className="post__comment__input">
                        <SmilyIcon/>
                        <input type="text" name="comment" id="comment" placeholder="Add a comment..." value={comment} onChange={(e)=>setComment(e.target.value)}/>
                        <button onClick={handleComment}>Post</button>
                     </div>}
                  </div>
               </div>
            </div>
         </div>}
      </div>
   )
}


const mapStateToProps = (state) =>({
   user: state.userReducer.user,
})
export default connect(mapStateToProps,null)(PostPage)
