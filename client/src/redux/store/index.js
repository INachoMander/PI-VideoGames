import { applyMiddleware, createStore, compose } from 'redux';
import thunk from "redux-thunk";
import reducer from '../reducer/index';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta línea sirve para conectar nuestra App con la extensión REDUX DEVTOOLS DEL NAVEGADOR

export const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunk))
);
