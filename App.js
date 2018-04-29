import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import HomeScreen from './src/components/Home/home';
import sagas from  './src/sagas';
import newsstore from './src/reducers';

const sagaMiddleware= createSagaMiddleware();

const store=createStore(newsstore, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

const App = () => (
    <Provider store={store} >
        <HomeScreen />
    </Provider>
);
export default App;
