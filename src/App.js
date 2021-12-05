import logo from './logo.svg';
import MnistModel from './Mnist/MnistModel';
import {BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import IncomeModel from './Income/IncomeModel';
import MyNavbar from './Navbar';


function App() {
  return (
    <div className="App">
      <Router>
	  		<MyNavbar />
            <Switch>

                <Route path="/income_model">
                    <IncomeModel />
                </Route>

                <Route path="/">
                    <MnistModel />
                </Route>

            </Switch>
        </Router>
    </div>
  );
}

export default App;
