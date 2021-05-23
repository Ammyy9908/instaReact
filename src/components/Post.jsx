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

TimeAgo.addDefaultLocale(en)

function Post({keyword,likes}) {

    const [isEmoji,setIsEmoji] = React.useState(false);
    const [emoji,setEmoji] = React.useState(null);
    const [comment,setComment] = React.useState('');
    const [like,setLike] = React.useState(false);
    const [likeCount,setLikeCount] = React.useState(likes);
    const [liked,setLikedFlag] = React.useState(false);
    const [isModal,setModal] = React.useState(false);

    const onEmojiClick = (event, emojiObject) => {
        setEmoji(emojiObject);
        setComment(comment+emoji.emoji+" ");
      };


      const setLiked = async ()=>{
            setLike(true);
            return true;
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
            setLikedFlag(false);
            setLikeCount(likeCount-1);
          }
          else{
              setLikedFlag(true);
              setLikeCount(likeCount+1);
          }
          
      }
    return (
        <>
       {isModal &&  <PostModal setModal={setModal}/>}
        <div className="post">

            <div className="post__header">
                <div className="post_header__left">
                    <div className="post__user__avatar">

                    </div>
                    <div className="post__username">
                        Sumit Kumar
                    </div>
                </div>
                <span className="more__icon" onClick={()=>setModal(true)}></span>

            </div>
            <div className="post__image" onDoubleClick={handleLike}>
                <img src={`https://source.unsplash.com/random?${keyword}`} alt="post__image" />
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
                    <div className="post__control__right">
                        <BookMarkIcon/>
                    </div>
                </div>
                <div className="post__views">
                    {likeCount} likes
                </div>
                <div className="post__comments">
                    <span className="post__comment"><strong>Amit Kumar</strong> This is an comment</span>
                </div>
                <div className="post__timestamp">
                <span><ReactTimeAgo date={parseInt(new Date().getTime())} locale="en-US" timeStyle="round-minute"/></span>
                </div>
                
            </div>
            <div className="post__footer">
                <div className="post__footer__wrapper">
                    <div className="smily" onClick={()=>setIsEmoji(!isEmoji)}>
                    <SmilyIcon/>
                    </div>
                    
                    <div className="block"></div>
                    <input type="text"  placeholder="Add a comment…"  autocomplete="off" autocorrect="off" value={comment} onChange={(e)=>setComment(e.target.value)}/>
                    <div className="comment_send_btn">
                        Post
                    </div>
                </div>
                    {isEmoji && <Picker  onEmojiClick={onEmojiClick}/>}
                  
            </div>
        </div>
        </>
    )
}

export default Post
