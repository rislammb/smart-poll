import React from 'react';
import ReactDOM from 'react-dom';
import { PollProvider } from './context/poll';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

ReactDOM.render(<PollProvider />, document.getElementById('root'));
