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
import Settings from './components/Settings/Settings';

import Alphabet from './components/Alphabet/Alphabet';
import Blocks from './components/Alphabet/Blocks/Blocks';
import Letters from './components/Alphabet/Letters/Letters';
import Consonants from './components/Alphabet/Letters/Consonants/Consonants';
import Vowels from './components/Alphabet/Letters/Vowels/Vowels';

import Words from './components/Words/Words';
import Categories from './components/Words/Nouns/Categories';
import Nouns from './components/Words/Nouns/Nouns';
import Verbs from './components/Words/Verbs/Verbs';
import Adjectives from './components/Words/Adjectives/Adjectives';

function App({auth}) {
	if (!isLoaded(auth)) {
		return <BrowserRouter><MainLoader show /></BrowserRouter>
	}
	
	return (
		<BrowserRouter>
		    <div className="App">
				<ToastContainer position="bottom-left" autoClose={5000} closeOnClick/>
				<MainLoader/>
				<Nav />
				<Switch>
					<Route exact path="/" component={Hello}/>
					<Route path="/register" component={withoutAuth(Register)}/>
					<Route path="/login" component={withoutAuth(Login)}/>
					<Route path="/faq" component={Faq}/>
					<Route path="/home" component={withAuth(Home)}/>
					<Route path="/settings" component={withAuth(Settings)}/>
					<Route path="/alphabet/blocks" component={Blocks}/>
					<Route path="/alphabet/letters/vowels" component={Vowels}/>
					<Route path="/alphabet/letters/consonants" component={Consonants}/>
					<Route path="/alphabet/letters" component={Letters}/>
					<Route path="/alphabet" component={Alphabet}/>
					<Route path="/words/adjectives" component={Adjectives}/>
					<Route path="/words/verbs" component={Verbs}/>
					<Route path="/words/nouns/categories" component={Categories}/>
					<Route path="/words/nouns/:category" component={Nouns}/>
					<Route path="/words" component={Words}/>
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