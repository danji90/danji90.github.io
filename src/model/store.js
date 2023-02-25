import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createDebounce from 'redux-debounced';
import portfolio from './portfolio/reducers';
import pedaltrips from './pedaltrips/reducers';

const getStore = () => {
  const store = createStore(
    combineReducers({
      portfolio,
      pedaltrips,
    }),
    compose(applyMiddleware(createDebounce(), thunk)),
  );

  return store;
};

export default getStore;
