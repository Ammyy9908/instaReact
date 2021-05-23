import React from 'react'
import ErrorIcon from '@material-ui/icons/Error';
import './Toast.css';

function Toast({error,setError}) {
    return (
        <div className={`error_toast ${error && "toast__enable"}`} onClick={()=>setError(false)}>
            <div className="toast__icon">
                <ErrorIcon/>
            </div>
            <div className="toast__message">
                {error}
            </div>
        </div>
    )
}

export default Toast
