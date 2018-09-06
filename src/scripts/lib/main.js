// importing styles - in production will be extracted to external file at
// compilation
import '../../styles/fonts/fonts.scss';
import '../../styles/lib/main.scss';

// import 'jquery';

console.log('testing message from main.js');

import 'components/nav.js';


//react

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

import registerServiceWorker from 'registerServiceWorker.js';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();