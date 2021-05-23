// import './debug.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Auth from './pages/Auth';
import Verify from './pages/Verify';
import Home from './pages/Home';
import Profile from "./pages/Profile";
import ConfirmPhone from "./pages/ConfirmPhone";
import Inbox from "./pages/Inbox";

function App() {
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
 



<Route exact path="/auth/:type" render={(props) => {
   const type = props.match.params.type;
    return <Auth type={type} />
}}  />

<Route exact path="/:uname/profile" render={(props) => {
   const uname = props.match.params.uname;
    return <Profile uname={uname} />
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

export default App;
