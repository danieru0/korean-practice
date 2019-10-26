import React from 'react';
import './App.css';
import { withFirestore } from 'react-redux-firebase';
import { test123 } from './actions/test';
import { connect } from 'react-redux';

function App({test123, firestore}) {
	const test = () => {
		test123(firestore);
	}
  return (
    <div className="App">
		<button onClick={test}>click</button>
    </div>
  );
}

export default connect(null, {test123})(withFirestore(App));