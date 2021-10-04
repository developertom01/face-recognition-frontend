import "./App.css";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import HomePage from "./ui/home_page/HomePage";
import LoginPage from "./ui/login_page/LoginPage";


function App() {

  return <Router>
    <Switch>
      <Route path = "/login" component = {LoginPage} />
      <Route path = "/" component = {HomePage} />
    </Switch>
  </Router>;
}

export default App;
