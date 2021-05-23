import React from 'react'
import Navbar from '../components/Navbar'
import "./Inbox.css"


function Chat({type,message}){
        return  <>{type==="me" ? <div className="chat chat__me">
        <div className="bubble__me chat__main">
            {message}
        </div>
    </div>:<div className="chat chat__from">
                                    <div className="chat__wrapper">
                                        <div className="chat__from__avatar"></div>
                                    <div className="bubble__from chat__main">
                                        {message}
                                    </div>
                                    </div>
                                </div>
    }</>
}


function BlankChatList(){
    return <div className="blank__chat__list">
            <div className="chat__list__avatar"></div>
            <div className="blank__chat__content">
                <span className="chat__list__line1"></span>
                <span className="chat__list__line2"></span>
            </div>
    </div>
}

function Inbox() {
    return (
        <div className="Inbox">
            <Navbar/>
            <div className="inbox__body">
                <div className="inbox__wrapper">
                    <div className="inbox__main">
                        <div className="inbox__sidebar">
                                <div className="sidebar__header">
                                    <div className="sidebar__header__center">
                                        <div className="sidebar__username">Sumit Bighaniya</div>
                                        <span style={{display: "inline-block",transform: "rotate(180deg)"}}><svg aria-label="Down Chevron Icon" class="_8-yf5 " fill="#262626" height="20" viewBox="0 0 48 48" width="20"><path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path></svg></span>
                                    </div>
                                    <div className="sidebar__header__left">
                                        <button className="new_chat_btn">
                                        <svg aria-label="New Message" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 44 44" width="24"><path d="M33.7 44.12H8.5a8.41 8.41 0 01-8.5-8.5v-25.2a8.41 8.41 0 018.5-8.5H23a1.5 1.5 0 010 3H8.5a5.45 5.45 0 00-5.5 5.5v25.2a5.45 5.45 0 005.5 5.5h25.2a5.45 5.45 0 005.5-5.5v-14.5a1.5 1.5 0 013 0v14.5a8.41 8.41 0 01-8.5 8.5z"></path><path d="M17.5 34.82h-6.7a1.5 1.5 0 01-1.5-1.5v-6.7a1.5 1.5 0 01.44-1.06L34.1 1.26a4.45 4.45 0 016.22 0l2.5 2.5a4.45 4.45 0 010 6.22l-24.3 24.4a1.5 1.5 0 01-1.02.44zm-5.2-3h4.58l23.86-24a1.45 1.45 0 000-2l-2.5-2.5a1.45 1.45 0 00-2 0l-24 23.86z"></path><path d="M38.2 14.02a1.51 1.51 0 01-1.1-.44l-6.56-6.56a1.5 1.5 0 012.12-2.12l6.6 6.6a1.49 1.49 0 010 2.12 1.51 1.51 0 01-1.06.4z"></path></svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="sidebar__body">
                                <BlankChatList/>
                                <BlankChatList/>
                                <BlankChatList/>
                                <BlankChatList/>
                                </div>
                        </div>
                        <div className="inbox__blank">
                            {/* <div className="inbox__body__main__header">
                                <div className="inbox__body__header__left">
                                    <div className="inbox__header__avatar"></div>
                                    <span>abhay_gudihal</span>
                                </div>
                                <button className="chat__person__info">
                                <svg aria-label="View Thread Details" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path><circle clip-rule="evenodd" cx="24" cy="14.8" fill-rule="evenodd" r="2.6"></circle><path d="M27.1 35.7h-6.2c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h6.2c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"></path><path d="M24 35.7c-.8 0-1.5-.7-1.5-1.5V23.5h-1.6c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5H24c.8 0 1.5.7 1.5 1.5v12.2c0 .8-.7 1.5-1.5 1.5z"></path></svg>
                                </button>
                            </div> */}

                            {/* <div className="chats__body">
                               <Chat type="me" message="This is the message from me"/>
                               <Chat type="from" message="Waise check kar ek tune bheja kya hai"/>
                               <Chat type="me" message="Haha Ek story haina"/>
                               <Chat type="me" message="Bhai is message ko ignore marna just main check kar raha hu ki instagram ki chat may chat ki total width kitan hota hai"/>
                               <Chat type="from" message="This is the another message from that side"/>
                               <Chat type="from" message="This is the another message from that side"/>
                               <Chat type="from" message="This is the another message from that side"/>
                               <Chat type="from" message="This is the another message from that side"/>
                               <Chat type="from" message="This is the another message from that side"/>
                               <Chat type="from" message="This is the another message from that side"/>
                                
                            </div> */}

                            <div className="blank__body">
                                <span className="message__icon"></span>
                                <div className="blank__body__title">Your Messages</div>
                                <div className="blank__body__subtitle">
                                Send private photos and messages to a friend or group.Send Message
                                </div>
                                <button className="send__message__btn">Send Message</button>
                            </div>

                            {/* <div className="inbox__main__footer">
                                <div className="main__footer__wrapper">

                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inbox
