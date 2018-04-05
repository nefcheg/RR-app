import {GET_ARTICLE_REQUEST, GET_ARTICLE_SUCCESS, GET_ARTICLE_FAIL} from "../constants";
import { importArticle }  from '../GetData'

export function getArticle(id) {
  return (dispatch) => {
    dispatch({
      type: GET_ARTICLE_REQUEST,
    });

    return importArticle(id).then((data) => {
      dispatch({
        type: GET_ARTICLE_SUCCESS,
        payload: data
      });
    }).catch((error) => {
        dispatch({
          type: GET_ARTICLE_FAIL,
          payload: error
        })
      });
  }
}
