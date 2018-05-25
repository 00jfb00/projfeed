import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({data: [], dataFetched: false, isFetching: false, error: false, root: undefined})

export default function app(state = initialState, action = {}) {

  switch (action.type) {
    case types.FETCH_DATA_PENDING:
      return {
        ...state,
        type: types.FETCH_DATA_PENDING,
        data: [],
        dataFetched: false,
        root: undefined,
        error: false,
        isFetching: true
      };
    case types.FETCH_DATA_FULFILLED:
      return {
        ...state,
        type: types.FETCH_DATA_FULFILLED,
        isFetching: false,
        dataFetched: true,
        error: false,
        root: action.root,
        data: action.payload
      };
    case types.FETCH_DATA_REJECTED:
      return {
        ...state,
        type: types.FETCH_DATA_REJECTED,
        dataFetched: false,
        root: undefined,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
}
