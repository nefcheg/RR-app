import {SET_TAG, SET_LIVESEARCH, GET_DATA_REQUEST, GET_DATA_SUCCESS, GET_DATA_FAIL, GET_TAGLIST} from "../constants";
import importData from "../GetData"

export const setTag = (tag) => ({
  type: SET_TAG,
  payload: tag
});

export const setLivesearch = (liveSearchString) => ({
  type: SET_LIVESEARCH,
  payload: liveSearchString
});

export const getTagList = (tagList) => ({
  type: GET_TAGLIST,
  payload: tagList
});

export function getData() {
  return (dispatch) => {
    dispatch({
      type: GET_DATA_REQUEST,
    });

    return importData().then((data) => {
      dispatch({
        type: GET_DATA_SUCCESS,
        payload: data
      });
    }).catch((error) => {
      dispatch({
        type: GET_DATA_FAIL,
        payload: error
      })
    })
  }
}
