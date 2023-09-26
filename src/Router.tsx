import { BrowserRouter, Route, Switch } from "react-router-dom";
import StartLogin from "./components/Login/StartLogin";
import RestaurantJoin from "./components/restaurant/RestaurantJoin";
import Header from "./components/Header";
import Homelist from "./components/user/Home";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={StartLogin}/>
        <Route path='/restaurantJoin' component={RestaurantJoin}/>
        <Route path='/waitingUser' component={StartLogin}/>
        <Route path='/user/main' component={Homelist}/>
      </Switch>
    </BrowserRouter>
  );
} 

export default Router;