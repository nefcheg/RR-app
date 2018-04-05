import {SET_LIVESEARCH, SET_TAG, GET_DATA_SUCCESS, GET_DATA_REQUEST, GET_DATA_FAIL, GET_TAGLIST} from "../constants";

const initialState = {
  currentTag: null,
  tagList: [],
  liveSearchString: "",
  dataObject: [],
  filteredData: [],
  isWaiting: false,
  error: false
};

export const articleList = (state = initialState, action) => {
  switch (action.type) {
    case SET_TAG: {
      return {...state, currentTag: action.payload};
    }

    case SET_LIVESEARCH: {
      return {...state, liveSearchString: action.payload};
    }

    case GET_DATA_REQUEST: {
      return {...state, isWaiting: true}
    }

    case GET_DATA_SUCCESS: {
      return {...state, isWaiting: false, error: false,  dataObject: action.payload}
    }

    case GET_DATA_FAIL: {
      return {...state, isWaiting: false, error: true}
    }

    case GET_TAGLIST: {
      return {...state, tagList: action.payload}
    }

    default: return state;
  }
};