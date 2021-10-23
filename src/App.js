import logo from './logo.svg';
import './App.css';
import React from 'react'
import AllUsers from './components/users-list';
import Home from './components/home';
import AddUser from './components/add-user';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import EditUser from './components/edit-user';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Menu style={{ backgroundColor: "rgb(0, 0, 66)" }}>
          <Menu.Item>
            <img src={logo} />
          </Menu.Item>
          <Menu.Item name="Home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item name="List Of Users">
            <Link to="/list">List of Users</Link>
          </Menu.Item>
          <Menu.Item name="Add new User">
            <Link to="/add">Add new User</Link>
          </Menu.Item>
        </Menu>

        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/list" component={AllUsers} exact />
          <Route path="/add" component={AddUser} exact />
          <Route path="/edit/:id" component={EditUser}  />
        </Switch>

      </BrowserRouter>
    )
  }
}

export default App;
