import React from 'react';
import Navbar from '../components/Navbar';
import "./ConfirmPhone.css"
import PhoneIcon from '@material-ui/icons/Phone';

function ConfirmPhone() {
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
                            <input type="text" name="phone" id="phone" />
                            
                        </div>
                        <input type="submit" value="Add phone number" />
                            <p>You may receive an email from Reactgram and can opt out at anytime</p>
                    </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ConfirmPhone
