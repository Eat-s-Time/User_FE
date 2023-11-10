import { BrowserRouter, Route, Switch } from "react-router-dom";
import StartLogin from "./components/Login/StartLogin";
import Homelist from "./components/user/Home";
import Companyset from "./components/Login/Companyset";
import Detail from "./components/user/Detail";
import Menu from "./components/user/Menu";
import Waiting from "./components/user/waiting";
import WaitingCheck from "./components/user/WaitingCheck";
import WaitingOk from "./components/user/WaitingOK";
import Mypage from "./components/user/mypage/MyPage";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={StartLogin}/>
        <Route path='/waitingUser' component={StartLogin}/>
        <Route path='/user/company' component={Companyset}/>
        <Route path='/user/main' component={Homelist}/>
        <Route path='/user/detail' component={Detail}/>
        <Route path='/user/menu' component={Menu}/>
        <Route path='/user/waiting' component={Waiting}/>
        <Route path='/user/waitingCheck' component={WaitingCheck}/>
        <Route path='/user/waitingok' component={WaitingOk}/>
        <Route path='/user/mypage' component={Mypage}/>
        <Route path='/user/companyset' component={Companyset}/>
      </Switch>
    </BrowserRouter>
  );
} 

export default Router;