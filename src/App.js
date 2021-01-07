import React, { Component } from 'react';
import { HashRouter, Route, Switch , Redirect } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user :false
    }
  }

  componentWillMount(){
    let user =  localStorage.getItem("user");
    user = user && user.length> 0 &&   window.atob(user.slice(13));
    if(user && user === "imranusmanics"){
      this.setState({user : true})
    }else{
      this.setState({user : false})
    }
   
  }
  render() {
    console.log("user" , this.state.user);
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.state.user
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
    )
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              {/* <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} /> */}
              <PrivateRoute path="/" component={()=> <TheLayout {...this.props}/>} />
              {/* <Route path="/" name="Home" render={props => <TheLayout {...props}/>} /> */}
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
