import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouteWithSubRoutes from './RouteWithSubRoutes';
import axios from 'axios'
import UrlHelper from './Helper/UrlHelper';
import SnackBar from './Components/SnackBar';
import Register from './Pages/Register/Register';

const instance = axios.create({
  baseURL: UrlHelper.siteUrl,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});


function App() {
  return (
    <>
      <SnackBar />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <RouteWithSubRoutes
          path="/app"
          baseComponent={Dashboard}
          subRoutes={[
            '/app',
            '/app/product'
          ]}
        />
      </Switch>
    </>
  );
}

export default App;
