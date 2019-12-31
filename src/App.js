import React, { useEffect } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import { isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';

import { getCounters } from './actions/settingsAction';

import withAuth from './hocs/withAuth';
import withoutAuth from './hocs/withoutAuth';
import withAdminAuth from './hocs/withAdminAuth';

import MainLoader from './shared/MainLoader/MainLoader';
import InfiniteScrollLoader from './shared/InfiniteScrollLoader/InfiniteScrollLoader';
import Nav from './components/Nav/Nav';
import Hello from './components/Hello/Hello';
import Register from './components/Auth/Register/Register';
import Login from './components/Auth/Login/Login';
import Faq from './components/Faq/Faq';
import Home from './components/Home/Home';
import Settings from './components/Settings/Settings';
import Saved from './components/Saved/Saved';
import NotFound from './components/NotFound/NotFound';
import Modal from './containers/Modal/ModalContainer';

import Alphabet from './components/Alphabet/Alphabet';
import Blocks from './components/Alphabet/Blocks/Blocks';
import Letters from './components/Alphabet/Letters/Letters';
import Consonants from './components/Alphabet/Letters/Consonants/Consonants';
import Vowels from './components/Alphabet/Letters/Vowels/Vowels';

import Words from './components/Words/Words';
import Categories from './components/Words/Nouns/Categories';
import WordsContainer from './containers/Words/WordsContainer';

import Conjugation from './components/Conjugation/Conjugation';
import ConjugationContainer from './containers/Conjugation/ConjugationContainer';

import TestTypeOne from './components/TestTypeOne/TestTypeOne';
import TestTypeTwo from './components/TestTypeTwo/TestTypeTwo';

import Sentences from './components/Sentences/Sentences';
import SentencesContainer from './containers/Sentences/SentencesContainer';

import Irregulars from './components/Irregulars/Irregulars';
import IrregularsContainer from './containers/Irregulars/IrregularsContainer';

import Numbers from './components/Numbers/Numbers';

import AdminContainer from './containers/Admin/AdminContainer';

function App({auth, modalActive, getCounters, firestore, counters}) {
	useEffect(() => {
		getCounters(firestore);
	}, [getCounters, firestore])
	
	if (!isLoaded(auth) || counters === null) {
		return <BrowserRouter><MainLoader show /></BrowserRouter>
	}  
	
	return (
		<BrowserRouter>
		    <div className="App">
				<ToastContainer position="bottom-left" autoClose={5000} closeOnClick/>
				<MainLoader/>
				<InfiniteScrollLoader />
				<Nav />
				{modalActive && <Modal />}
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
					<Route path="/words/adjectives" render={props => <WordsContainer type="adjectives" {...props}/>}/>
					<Route path="/words/verbs" render={props => <WordsContainer type="verbs" {...props}/>}/>
					<Route path="/words/adverbs" render={props => <WordsContainer type="adverbs" {...props}/>}/>
					<Route path="/words/nouns/categories" component={Categories}/>
					<Route path="/words/nouns/:category" render={props => <WordsContainer type="nouns" {...props}/>}/>
					<Route path="/words" component={Words}/>
					<Route path="/saved/:category" component={withAuth(Saved)}/>
					<Route path="/conjugation/:category" component={ConjugationContainer}/>
					<Route path="/conjugation" component={Conjugation}/>
					<Route path="/testone/:category" component={TestTypeOne}/>
					<Route path="/testtwo/:category" component={TestTypeTwo}/>
					<Route path="/sentences/:category" component={SentencesContainer}/>
					<Route path="/sentences/" component={Sentences}/>
					<Route path="/admin/:page?" component={withAdminAuth(AdminContainer)}/>
					<Route path="/irregulars/:type" component={IrregularsContainer}/>
					<Route path="/irregulars" component={Irregulars}/>
					<Route path="/numbers/:type?" component={Numbers}/>
					<Route path="/404" component={NotFound}/>
					<Redirect to="/404" />
				</Switch>
			</div>
		</BrowserRouter>
  	);
}

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth,
		modalActive: state.modalReducer.modalActive,
		counters: state.settingsReducer.counters
	}
}

export default connect(mapStateToProps, { getCounters })(withFirestore(App));