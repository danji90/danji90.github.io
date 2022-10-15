import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createDebounce from 'redux-debounced';
import portfolio from './portfolio/reducers';
import pedaltripper from './pedaltripper/reducers';

const getStore = () => {
  const store = createStore(
    combineReducers({
      portfolio,
      pedaltripper,
    }),
    compose(applyMiddleware(createDebounce(), thunk)),
  );

  return store;
};

export default getStore;
