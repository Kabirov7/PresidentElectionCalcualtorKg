import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import StartPageC from "./Components/StartPage/StartPageC";
import React from "react";

function App() {
  return (
    <div className="App">
      <Router>
				<Route exact path={"/PresidentElectionCalcualtorKg"}>
					<StartPageC/>
				</Route>
			</Router>
    </div>
  );
}

export default App;
