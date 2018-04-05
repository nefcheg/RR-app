import {GET_ARTICLE_REQUEST, GET_ARTICLE_FAIL, GET_ARTICLE_SUCCESS} from "../constants";

const initialState = {
  isWaiting: false,
  currentArticle: {},
  error: false
};

export const articleItem = (state = initialState, action) => {
  switch (action.type) {

    case GET_ARTICLE_REQUEST: {
      return { ...state, isWaiting: true };
    }

    case GET_ARTICLE_SUCCESS: {
      return { ...state, isWaiting: false, error:false, currentArticle: action.payload };
    }

    case GET_ARTICLE_FAIL: {
      return { ...state, isWaiting: false, error: true };
    }

    default: return state;
  }
};