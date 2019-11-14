import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { enableBatching } from 'redux-batched-actions';
// import undoable from 'redux-undo';
import * as reducers from 'app/reducers/reducers';
// import undoReducer from 'app/reducers/undoReducer';

import rootSagas from 'app/sagas';

const sagaMiddleWare = createSagaMiddleware();

export default {

    getInstantiate(initialState, history) {

        const reducer = combineReducers({
            ...reducers,
            routing: routerReducer
        });

        const instance = compose(
            applyMiddleware(routerMiddleware(history), sagaMiddleWare),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        );

        const store = createStore(enableBatching(reducer), initialState, instance);

        sagaMiddleWare.run(rootSagas);

        console.log('store----', store.getState());
        return store;

    }

};
