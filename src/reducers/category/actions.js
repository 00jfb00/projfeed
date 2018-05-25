import * as types from './actionTypes';
import getCategories from "../../services/categories";

export function getData() {
  return {type: types.FETCH_DATA_PENDING}
}

export function getDataSuccess(payload) {
  return {type: types.FETCH_DATA_FULFILLED, payload}
}

export function getDataFailure() {
  return {type: types.FETCH_DATA_REJECTED}
}

export function getAll(params) {
  return (dispatch) => {
    dispatch(getData())
    getCategories(params).then((data) => {
      dispatch(getDataSuccess(data))
    }).catch((err) => dispatch(getDataFailure()))
  }
}
