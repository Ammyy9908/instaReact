import React from 'react';
import BookMarkIcon from '../assets/BookMarkIcon';
import CommentIcon from '../assets/CommentIcon';
import LikeIcon from '../assets/LikeIcon';
import SendIcon from '../assets/SendIcon';
import SmilyIcon from '../assets/SmilyIcon';
import "./Post.css"
import en from 'javascript-time-ago/locale/en'
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import Picker from 'emoji-picker-react';
import PostModal from './PostModal';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { connect } from 'react-redux';
import axios from 'axios';


TimeAgo.addDefaultLocale(en)

function Post({id,likes,image,upload_by,user,likedArray,time,commentOff,altText}) {
    const [comments,setComments] = React.useState(null);


    React.useEffect(() => {
        console.log("running....")
            axios.get(`https://secure-woodland-04703.herokuapp.com/photo/fetch/${id}`).then((r)=>{
                console.log("comments fetched!");
            setComments(r.data.comments);
            })
    },
    // eslint-disable-next-line
    [])
    const [isEmoji,setIsEmoji] = React.useState(false);
    const [emoji,setEmoji] = React.useState(null);
    const [comment,setComment] = React.useState('');
    const [like,setLike] = React.useState(false);
    const [likeCount,setLikeCount] = React.useState(likes);
    const [liked,setLikedFlag] = React.useState(false);
    const [isModal,setModal] = React.useState(false);
    const [isSaved,setSavedFlag] = React.useState(false)

    const onEmojiClick = (event, emojiObject) => {
        setEmoji(emojiObject);
        setComment(comment+emoji.emoji+" ");
      };


      React.useEffect(() => {
          if(likedArray.filter((person)=>person.id===user.id).length>0){
            setLikedFlag(true);
          }
      },
      // eslint-disable-next-line
      [])


      const setLiked = async ()=>{

        axios.put(`https://secure-woodland-04703.herokuapp.com/post/like/${id}`,{user:{name:user.fullName,id:user.id}})
        .then((response)=>{
          
            if(response.status===200){
                setLike(true);
                return true;
            }
        })

            
      }

      const setUnlike = async ()=>{
       
        setLike(false);
          setLikedFlag(true);
          if(!liked){
            setLikeCount(likeCount+1);
          }
          return false;
          
      }

      const handleLike = ()=>{
        setLiked().then((data)=>{
            setUnlike().then((data)=>{
                setLike(true);
            })
        })
          
      }


      const handleDisliked = ()=>{
          if(liked){
            axios.put(`https://secure-woodland-04703.herokuapp.com/post/unlike/${id}`,{user:{id:user.id}})
            .then((response)=>{
                if(response.status===200){
                    setLikedFlag(false);
                    setLikeCount(likeCount-1);
                }
            })
            
          }
          else{
                setLiked()
              setLikedFlag(true);
              setLikeCount(likeCount+1);
          }
          
      }


    const handlePostSave = ()=>{
        axios.put(`https://secure-woodland-04703.herokuapp.com/auth/save/${user.id}`,{postid:id}).then((r)=>{
        console.log(r.data);
        if(!r.data.error){
            setSavedFlag(true)
        }
        })
    }


    const handleComment = ()=>{
       
            axios.post(`https://secure-woodland-04703.herokuapp.com/photo/comment`,{photo_id:id,comment:comment,user:{name:user.fullName,id:user.id,avatar:user.avatar},timestamp:new Date().getTime()}).then((r)=>{
                console.log(r.data);
                setComments([r.data,...comments]);
                setComment('');
            })
        
    }

   
  // eslint-disable-next-line
      
    return (
        <>
       {isModal &&  <PostModal setModal={setModal} id={id}/>}
        <div className="post">

            <div className="post__header">
                <div className="post_header__left">
                    <div className="post__user__avatar">
                        <img src={`https://secure-woodland-04703.herokuapp.com/auth/avatar/${upload_by.id}`} alt="upload__by__avatar" />
                    </div>
                    <div className="post__username">
                        {upload_by.name}
                    </div>
                </div>
                <span onClick={()=>setModal(true)} className="more_mobile">
                <MoreVertIcon/>
                    
                </span>

                <span className="more__desktop" onClick={()=>setModal(true)}>
                    <MoreHorizIcon/>
                </span>

            </div>
            <div className="post__image" onDoubleClick={handleLike}>
                <img src={image} alt={altText} />
                {like && <div className="like__heart">
                <svg aria-label="Activity Feed" class="_8-yf5 " fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                </div>}
            </div>
            <div className="post__body">
                <div className="post__controls">
                    <div className="post__control__left">
                        <span onClick={handleDisliked}><LikeIcon fill={liked && liked}/></span>
                        <CommentIcon/>
                        <SendIcon/>
                    </div>
                    {!user.saved_posts.includes(id) && <div className="post__control__right">
                        <button onClick={handlePostSave}><BookMarkIcon fill={isSaved && true}/></button>
                    </div>}
                </div>
                <div className="post__views">
                    {likeCount} likes
                </div>
              
                {!commentOff && <span className="view__all">View all comments</span>}
                {!commentOff && <div className="post__comments">
                    {comments && comments.slice(0,3).map((comment,i)=>{
                        return <span className="post__comment"><strong>{comment.comment_by.id===user.id ? "You":comment.comment_by.name}</strong> {comment.comment}</span>
                    })}
                </div>}
                <div className="post__timestamp">
                <span><ReactTimeAgo date={parseInt(time)} locale="en-US" timeStyle="round-minute"/></span>
                </div>
                
            </div>
           {!commentOff && <div className="post__footer">
                <div className="post__footer__wrapper">
                    <div className="smily" onClick={()=>setIsEmoji(!isEmoji)}>
                    <SmilyIcon/>
                    </div>
                    
                    <div className="block"></div>
                    <input type="text"  placeholder="Add a comment…"  autocomplete="off" autocorrect="off" value={comment} onChange={(e)=>setComment(e.target.value)}/>
                    <div className="comment_send_btn" onClick={handleComment}>
                        Post
                    </div>
                </div>
                    {isEmoji && <Picker  onEmojiClick={onEmojiClick}/>}
                  
            </div>}
        </div>
        </>
    )
}

const mapStateToProps = (state) =>({
    user: state.userReducer.user,
})

export default connect(mapStateToProps,null)(Post)
