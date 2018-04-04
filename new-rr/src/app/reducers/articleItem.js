import {SET_ARTICLE} from "../constants";

const initialState = {
  isWaiting: false,
  currentArticle: {}
};

export const articleItem = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLE: {
      return {...state, currentArticle: action.payload};
    }

    default: return state;
  }
};