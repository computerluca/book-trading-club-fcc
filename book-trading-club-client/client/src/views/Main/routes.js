import React from 'react'
import {Route, IndexRedirect} from 'react-router'
import AuthService from '../../utils/AuthService'
import Container from './Container'
import Home from './Home/Home'
import Login from './Login/Login'
import ProfileEdit from './Home/ProfileEdit';
import NewBook from './Books/NewBook';
import AllBooks from './Books/AllBooks';
import MyBooks from './Books/MyBooks';
const auth = new AuthService('your_client_id', 'your_domain_id');

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} onEnter={requireAuth} />
      <Route path="login" component={Login} />
      <Route path="edit"  component={ProfileEdit} onEnter={requireAuth} />
      <Route path="newbook" component={NewBook} onEnter={requireAuth} />
      <Route path="allbooks" component={AllBooks} onEnter={requireAuth} />
      <Route path="mybooks" component={MyBooks} onEnter={requireAuth} />
      <Route path="access_token=:token" component={Login} /> //to prevent router errors
    </Route>
  )
}

export default makeMainRoutes
