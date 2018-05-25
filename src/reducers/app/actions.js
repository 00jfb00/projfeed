import * as types from './actionTypes';
import getUser from "../../services/user";

export function getData() {
  return {type: types.FETCH_DATA_PENDING}
}

export function getDataSuccess(root, payload) {
  return {type: types.FETCH_DATA_FULFILLED, root, payload}
}

export function getDataFailure() {
  return {type: types.FETCH_DATA_REJECTED}
}

export function navigate(root, params) {
  return (dispatch) => {
    dispatch(getData())
    if (root == "SignedOut") {
      dispatch(getDataSuccess(root, {}))
    } else {
      getUser(params).then((data) => {
        dispatch(getDataSuccess(root, data))
      }).catch((err) => dispatch(getDataFailure()))
    }
  }
}
