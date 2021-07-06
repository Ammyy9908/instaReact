import React from 'react';
import { useHistory } from 'react-router-dom';
import "./PostModal.css"

function PostModal({setModal,id}) {
    const history = useHistory();
    const moveToPost = ()=>{
        history.push(`/p/${id}`)
    }
    return (
        <div className="postModal">
            <div className="post__modal__popup">
                <span className="report">Report</span>
                <span className="unfollow">Unfollow</span>
                <span onClick={moveToPost}>Go to post</span>
                <span onClick={()=>setModal(false)}>Cancel</span>
            </div>
        </div>
    )
}

export default PostModal
