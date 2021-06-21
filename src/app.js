import React from 'react';
import Header from './header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './login';
import BestBooks from './BestBooks';
import MyFavoriteBooks from './myFavoriteBooks';
import Profile from './Profile';
import { withAuth0 } from '@auth0/auth0-react';
// const { user,isAuthenticated } = withAuth0;
// const {isAuthenticated,auth0,} = withAuth0();

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Books: [],
      useremail: '',
      showUserComponent: false,
      server: process.env.REACT_APP_SERVER_URL,
    }
  }

  render() {
    // const { isAuthenticated } = this.props.auth0;
    console.log('app', this.props)
    return(
      <>
                      

        <Router>
          <IsLoadingAndError>
            <Header />
              <Switch>
              <Route exact path="/">
              {/* <Profile />
              <Login /> */}
                {/* TODO: if the user is logged in, render the `MyFavoriteBooks` component, if they are not, render the `Login` component */}
                {this.props.auth0.isAuthenticated 
                  ? <MyFavoriteBooks />
                  : <Login />
                }
                {console.log(this.props.auth0.user)}
              </Route>
              <Route exact path="/profile">
                 {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}

                {this.props.auth0.isAuthenticated
                  ?  <BestBooks useremail={this.props.auth0.user.email}/>
                  : null
                }
              </Route>
              </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    )
  }
}

export default withAuth0(App);