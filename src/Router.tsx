import { BrowserRouter, Redirect, Route, RouteProps, Switch } from "react-router-dom";
import StartLogin from "./components/Login/StartLogin";
import Homelist from "./components/user/Home";
import Companyset from "./components/Login/Companyset";
import Detail from "./components/user/Detail";
import Menu from "./components/user/Menu";
import Waiting from "./waiting/waiting";
import WaitingCheck from "./waiting/WaitingCheck";
import WaitingOk from "./waiting/WaitingOK";
import Mypage from "./components/user/mypage/MyPage";
import EditProfile from "./components/user/mypage/EditProfile";
import Review from "./components/review/Review";
import { loginState } from "./recoil/atom";
import { useRecoilValue } from "recoil";
import History from "./components/user/mypage/History";
import EditCompany from "./components/user/mypage/EditCompany";

interface PrivateRouteProps extends RouteProps {
  component: any;
  isLogged: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, isLogged, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLogged ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

function Router() {
  const isLogged = useRecoilValue(loginState);

  return (
    <BrowserRouter>
      <Switch>
        {isLogged ? (
          <>
            <Route path='/' exact render={() => <Redirect to="/user/main" />} />
            <Route path='/user/company' component={() => <Redirect to="/user/main" />} />
            <PrivateRoute path='/user/main' component={Homelist} isLogged={isLogged} />
            <PrivateRoute path='/user/detail' component={Detail} isLogged={isLogged} />
            <PrivateRoute path='/user/menu' component={Menu} isLogged={isLogged} />
            <PrivateRoute path='/user/waiting' component={Waiting} isLogged={isLogged} />
            <PrivateRoute path='/user/waitingCheck' component={WaitingCheck} isLogged={isLogged} />
            <PrivateRoute path='/user/waitingok' component={WaitingOk} isLogged={isLogged} />
            <PrivateRoute path='/user/mypage' component={Mypage} isLogged={isLogged} />
            <PrivateRoute path='/user/companyset' component={Companyset} isLogged={isLogged} />
            <PrivateRoute path='/user/editprofile' component={EditProfile} isLogged={isLogged} />
            <PrivateRoute path='/user/review' component={Review} isLogged={isLogged} />
            <PrivateRoute path='/user/history' component={History} isLogged={isLogged} />
            <PrivateRoute path='/user/editcompany' component={EditCompany} isLogged={isLogged} />
          </>
        ) : (
          <>
            <Route exact path='/' component={StartLogin} />
            <Route path='/user/company' component={Companyset} />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;