import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Todo from "./todo";
import Register from './Register';
import Login from './Login';

function App() {
  
  return (
    <>
     <Router>
    <Switch>
          <Route path="/todo" exact={true}>
            <Todo />
          </Route>
          <Route path="/register" exact={true}>
            <Register/>
          </Route>
          <Route path="/login" exact={true}>
            <Login />
          </Route>
        </Switch>
    </Router>

    </>
  );
}

export default App;
