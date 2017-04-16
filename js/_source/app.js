/* @flow */

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import CRUDStore from './flux/CRUDStore';
import schema from './schema';
import Logo from './components/Logo';
import Whinepad from './components/Whinepad';

CRUDStore.init(schema);

ReactDOM.render(
  <div>
    <h1 className="app-header">
      <Logo /> Whilepadにようこそ！
    </h1>
    <Whinepad schema={schema} initialData={CRUDStore.getData()} />
  </div>,
  document.getElementById('app')
);
