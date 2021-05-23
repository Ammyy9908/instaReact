import React from 'react';
import "./PostModal.css"

function PostModal({setModal}) {
    return (
        <div className="postModal">
            <div className="post__modal__popup">
                <span className="report">Report</span>
                <span className="unfollow">Unfollow</span>
                <span>Go to post</span>
                <span onClick={()=>setModal(false)}>Cancel</span>
            </div>
        </div>
    )
}

export default PostModal
