import React from 'react';
import Navbar from '../components/Navbar';
import "./ConfirmPhone.css"
import PhoneIcon from '@material-ui/icons/Phone';
import axios from 'axios';
import { setUser } from '../actions/userAction';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

function ConfirmPhone(props) {

const [phone,setPhone] =React.useState('');
    const handlePhoneAdd = async ()=>{
        try{
            const r = await axios.put(`http://localhost:5000/auth/add/phone`,{phone:phone,uid:props.user && props.user.id});
            return r.data;
        }
        catch(e){
            if(e.response && e.response.data){
                return e.response.data;
            }
        }
    }


    const history = useHistory();

    const handlePhone = ()=>{
        const mobile_rex = /^(\+|\d)[0-9]{7,16}$/;
       if(mobile_rex.test(phone)){
        handlePhoneAdd().then((data)=>{
            if(!data.code){
                return alert(data.message);
            }
            history.push('/');
            
        })
       }
       else{
           alert("Not a Valid Phone Number");
       }
    }
    return (
        <div className="confirmPhone">
            <Navbar/>
            <div className="accounts__body">
                <div className="confirm__phone__body__wrapper">
                    <div className="confirm__phone__main">
                    <div className="account__setup__icon">
                        <PhoneIcon/>
                    </div>
                    <h3>Add phone number</h3>
                    <p>Adding your number will help you log in more easily, recover your account, and find people to follow.</p>
                    <div className="form__account__setup">
                        <div className="form__control__phone">
                            <input type="text" name="phone" id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                            
                        </div>
                        <input type="button" value="Add phone number" onClick={handlePhone}/>
                            <p>You may receive an email from Reactgram and can opt out at anytime</p>
                    </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>({
    user: state.userReducer.user,
})

const mapDispatchToProps = (dispatch)=>({
    setUser:(user)=>dispatch(setUser(user)),
})



export default connect(mapStateToProps,mapDispatchToProps)(ConfirmPhone)
