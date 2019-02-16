import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import Portis from '@portis/web3';
//import Web3 from 'web3';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

// PORTIS
//const portis = new Portis("8979ee0a-562d-413e-b83f-915f682cfa1b", "rinkeby", { scope: ["email"]  });  
//const web3 = new Web3(portis.provider);

// web3.eth.getAccounts((error, accounts) => {
//     console.log(accounts);
//   });


// portis.onLogin((walletAddress, email) => {
//     console.log(walletAddress, email);
// });

serviceWorker.unregister();
