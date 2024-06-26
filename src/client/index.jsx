import * as React from 'react';
import * as ReactDom from 'react-dom';
import { App } from '../app';

window.addEventListener('load', () => {
  ReactDom.hydrate(<App />, document.getElementById('root'));
});
