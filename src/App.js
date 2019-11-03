import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import { isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';

import WithAuth from './hocs/withAuth';

import MainLoader from './shared/MainLoader/MainLoader';
import Nav from './components/Nav/Nav';
import Hello from './components/Hello/Hello';
import Register from './components/Auth/Register/Register';
import Login from './components/Auth/Login/Login';

function App({auth}) {
	if (!isLoaded(auth)) {
		return <BrowserRouter><MainLoader show /></BrowserRouter>
	}
	
	return (
		<BrowserRouter>
		    <div className="App">
				<ToastContainer position="bottom-left" autoClose={5000} closeOnClick pauseOnVisibilityChange={false}/>
				<MainLoader/>
				<Nav />
				<Switch>
					<Route exact path="/" component={Hello}/>
					<Route path="/register" component={WithAuth(Register)}/>
					<Route path="/login" component={WithAuth(Login)}/>
				</Switch>
			</div>
		</BrowserRouter>
  	);
}

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth
	}
}

export default connect(mapStateToProps, null)(App);