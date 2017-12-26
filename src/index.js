import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ProductList from '../src/components/productList/';
import registerServiceWorker from './registerServiceWorker';
import props from './data.json';

ReactDOM.render(<ProductList {...props}/>, document.getElementById('root'));
registerServiceWorker();
