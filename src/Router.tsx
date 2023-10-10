import { BrowserRouter, Route, Switch } from "react-router-dom";
import StartLogin from "./components/Login/StartLogin";
import RestaurantJoin from "./components/restaurant/RestaurantJoin";
import Homelist from "./components/user/Home";
import Companyset from "./components/Login/Companyset";
import Detail from "./components/user/Detail";
import Menu from "./components/user/Menu";
import Waiting from "./components/user/waiting";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={StartLogin}/>
        <Route path='/restaurantJoin' component={RestaurantJoin}/>
        <Route path='/waitingUser' component={StartLogin}/>
        <Route path='/user/company' component={Companyset}/>
        <Route path='/user/main' component={Homelist}/>
        <Route path='/user/detail' component={Detail}/>
        <Route path='/user/menu' component={Menu}/>
        <Route path='/user/waiting' component={Waiting}/>
      </Switch>
    </BrowserRouter>
  );
} 

export default Router;