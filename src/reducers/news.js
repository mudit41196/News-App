import * as TYPES from '../actions/news';
const INITIAL_STATE={
    newsheadlines: null,
    loading:true,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case TYPES.FETCH_NEWS_SUCCESS:
        return { ...state, loading:false, newsheadlines: action.data };
      case TYPES.FETCH_NEWS_FAILED:
        return { ...state, newsError: true, newsheadlines: null };
      default:
        return state;
    }
  };


