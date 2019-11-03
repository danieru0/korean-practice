import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';

import MainLoader from './shared/MainLoader/MainLoader';
import Nav from './components/Nav/Nav';
import Hello from './components/Hello/Hello';
import Register from './components/Auth/Register/Register';
import Login from './components/Auth/Login/Login';

function App() {
	return (
		<BrowserRouter>
		    <div className="App">
				<ToastContainer position="bottom-left" autoClose={5000} closeOnClick pauseOnVisibilityChange={false}/>
				<MainLoader/>
				<Nav />
				<Switch>
					<Route exact path="/" component={Hello}/>
					<Route path="/register" component={Register}/>
					<Route path="/login" component={Login}/>
				</Switch>
			</div>
		</BrowserRouter>
  	);
}

export default App;