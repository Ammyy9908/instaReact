import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router';
import Toast from '../components/Toast';
import "./Verify.css"

function Verify({email}) {
    const [code,setCode] = React.useState('');
    const [error,setError] = React.useState(false);
    const history = useHistory();
    const verify = async ()=>{
        try{
            const r = await axios.post(`https://secure-woodland-04703.herokuapp.com/auth/verify`,{email:email,verifyCode:code});
            return r.data;
        }
        catch(e){
            if(e.response && e.response.data){
                return e.response.data;
            }
        }
    }


    const resendCode = async ()=>{
        try{
            const r = await axios.put(`https://secure-woodland-04703.herokuapp.com/auth/sendcode`,{email:email});
            return r.data;
        }
        catch(e){
            if(e.response && e.response.data){
                return e.response.data;
            }
        }
    }

    const resend = ()=>{
        resendCode().then((data)=>{
            if(!data.code){
                alert(data.message);
                return setError(data.message);
            }
            console.log(data.message);
        })
    }

    const verifyCode = ()=>{
       if(code){
        verify().then((data)=>{
            if(!data.code){
               setError(data.message);
               return setCode('');
            }



            history.push(`/`);
            
            
        })
       }
    }
    return (
        <div className="VerifyScreen">
            <Toast error={error} setError={setError}/>
            <div className="verify__body">
                <div className="verify__header">
                <h3>Enter Confirmation code</h3>
                <p>Enter the confirmation code we sent to {email}.<button onClick={resend}>Resend Code.</button></p>
                </div>
                <div className="verify__form">
                    <div className="form__control">
                        <input type="text" name="code" id="code" placeholder="Code" value={code} onChange={(e)=>setCode(e.target.value)}/>
                    </div>
                    <button type="submit" onClick={verifyCode}>Verify</button>
                </div>

            </div>
        </div>
    )
}

export default Verify
