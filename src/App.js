// import './debug.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import React from "react"
import Auth from './pages/Auth';
import Verify from './pages/Verify';
import Home from './pages/Home';
import Profile from "./pages/Profile";
import ConfirmPhone from "./pages/ConfirmPhone";
import Inbox from "./pages/Inbox";
import Activity from "./pages/Activity";
import EditProfile from "./pages/EditProfile";
import {socket} from './context/context';
import { connect } from "react-redux";
import { addPost } from "./actions/uiAction";
import PostPage from "./pages/PostPage";
function App(props) {
  React.useEffect(()=>{
   
    
    socket && socket.on("newPost", data => {
      
      console.log("New Post",data);
      props.addPost(data.post);
     
    });
  });
  return (
    <Router>
  <div>
  
  
  <Switch>
  <Route exact path="/">
    <Home/>
    </Route>
    <Route exact path="/direct/inbox">
    <Inbox/>
    </Route>

    <Route exact path="/activity">
    <Activity/>
    </Route>
 
    <Route exact path="/:uname/profile/edit" render={(props) => {
   const uname = props.match.params.uname;
    return <EditProfile uname={uname} />
}}  />



<Route exact path="/auth/:type" render={(props) => {
   const type = props.match.params.type;
    return <Auth type={type} />
}}  />

<Route exact path="/:uname/profile" render={(props) => {
   const uname = props.match.params.uname;
    return <Profile uname={uname} />
}}  />

<Route exact path="/p/:id" render={(props) => {
   const id = props.match.params.id;
    return <PostPage id={id} />
}}  />


<Route exact path="/accounts/:type" render={(props) => {
   const type = props.match.params.type;
    return <ConfirmPhone type={type} />
}}  />

<Route exact path="/auth/verify/:email" render={(props) => {
   const email = props.match.params.email;
    return <Verify email={email} />
}}  />

  </Switch>
</div>
</Router>
  );
}


const mapdDispatchToProps =(dispatch)=>({
  addPost:(post)=>dispatch(addPost(post))
})
export default connect(null,mapdDispatchToProps)(App);
