import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from "./Auth.module.css";
import axios from "axios";
import "./Auth.css"
import Cookies from "js-cookie"
import Toast from '../components/Toast';
import GoogleLogin from 'react-google-login';

function TextField({placeholder,type,value,setValue,id}){
    return <div className={styles.form__control} id={id}>
    <input type={type} name="email_or_phone" id="emailPhone" placeholder={placeholder} value={value} onChange={(e)=>setValue(e.target.value)}/>
</div>
}

function Auth({type}) {
    const history = useHistory();
    const [email,setEmail] = React.useState('');
    const [username,setUsername] = React.useState('');
    const [fullName,setFullName] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [error,setError] = React.useState(false);
    const [avatar,setAvatar] = React.useState('');

    React.useEffect(() => {
            setUsername('');
            setFullName('');
            setPassword('');
            setEmail('');
    },[type])


    async function handleSignUp(){
        if(username && password && email && fullName){
            const data = {
                full_name:fullName,
                username,
                password,
                email,
                avatar,
            
            }
            try{
                const r = await axios.post('https://secure-woodland-04703.herokuapp.com/auth/reg',data);
                return r.data;
            }
            catch(e){
                if(e.response && e.response.data){
                    return e.response.data;
                }
            }
        }
    }


    async function handleLogin(){
        if(email && password){
            const data = {
               
                email,
                password
            
            }
            try{
                const r = await axios.post('https://secure-woodland-04703.herokuapp.com/auth/login',data);
                return r.data;
            }
            catch(e){
                if(e.response && e.response.data){
                    return e.response.data;
                }
            }
        }
    }

    const checkSignUp = ()=>{
        handleSignUp().then((data)=>{
            if(data.errors.length>0){

                
                return setError(data.errors[0].msg)
            }

            if(!data.code){
                    
                    return setError(data.message)
            }

            const {token} = data;

            Cookies.set('AUTH_TOKEN', token);
            history.push(`/auth/verify/${email}`);
           
           
        })
        .catch((e)=>{
            console.log(e);
        })
    }


    const checkLogin = ()=>{
        handleLogin().then((data)=>{
            if(data.errors.length>0){
                setEmail('');
                setPassword('');
                return setError(data.errors[0].msg)
            }

            if(!data.code){
                setEmail('');
                setPassword('');
                    return setError(data.message);
            }

            const {token} = data;
            Cookies.set('AUTH_TOKEN', token);
            history.push(`/`);
        }).catch((e)=>{
            console.error(e);
        })
    }
    const responseGoogle = (response) => {
        if(response.error){
            return alert("Eroor");
        }
        else{
            console.log("lOGIN WORKING");
            console.log(response);
        }

        const {name,imageUrl,email} = response.profileObj;

        setFullName(name);
        setAvatar(imageUrl);
        setEmail(email);
        checkSignUp().then((data)=>{
            console.log(data);
        })
        

      }
    return (
        <div className={styles.authScreen}>
            <Toast error={error} setError={setError}/>
            <div className={styles.authBody}>
                <h1>React Gram</h1>
                {type==="reg" && <h3>Sign up to see photos and videos from your friends.</h3>}
                <div className={styles.auth__form}>
               {type==="reg" && <>
                <TextField placeholder="Email" type="text" value={email} setValue={setEmail} id={"email"}/>
                <TextField placeholder="Full Name" type="text" value={fullName} setValue={setFullName} id={"name"}/>
                <TextField placeholder="Username" type="text" value={username} setValue={setUsername} id={"uname"}/>
                <TextField placeholder="Password" type="password" value={password} setValue={setPassword} id={"password"}/>
                </>}
               {type==="login"&& <>
                <TextField placeholder="Email" type="email" value={email} setValue={setEmail}/>
                <TextField placeholder="Password" type="password" value={password} setValue={setPassword} id={password}/>
                </>}
                
                <button type="submit" onClick={type==="reg"?checkSignUp:checkLogin}>{type==="login"? "Login":"Sign Up"}</button>
               {type==="reg" &&<GoogleLogin
    clientId="688025704310-mal2da29j49vmat22s1ad156fg6a93f8.apps.googleusercontent.com"
    buttonText="Login"
    render={renderProps => (
        <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="google__btn">Sign up  with Google</button>
      )}
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />}
                </div>
            </div>

            <div className={styles.auth__switcher}>
                <span className={styles.auth__heading}>{type==="login"?"Don't have an account?":"Have an account?"}  </span><Link to={`/auth/${type==="reg"?"login":"reg"}`}> {type==="login"?"Sign Up":"Login"}</Link>
            </div>
            
        </div>
    )
}

export default Auth
