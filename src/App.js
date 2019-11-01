import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav/Nav';
import Hello from './components/Hello/Hello';

function App() {
	return (
		<BrowserRouter>
		    <div className="App">
				<Nav />
				<Switch>
					<Route exact path="/" component={Hello}/>
				</Switch>
			</div>
		</BrowserRouter>
  	);
}

export default App;