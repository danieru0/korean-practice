import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import { isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';

import withAuth from './hocs/withAuth';
import withoutAuth from './hocs/withoutAuth';

import MainLoader from './shared/MainLoader/MainLoader';
import Nav from './components/Nav/Nav';
import Hello from './components/Hello/Hello';
import Register from './components/Auth/Register/Register';
import Login from './components/Auth/Login/Login';
import Faq from './components/Faq/Faq';
import Home from './components/Home/Home';

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
					<Route path="/register" component={withoutAuth(Register)}/>
					<Route path="/login" component={withoutAuth(Login)}/>
					<Route path="/faq" component={Faq}/>
					<Route path="/home" component={withAuth(Home)}/>
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