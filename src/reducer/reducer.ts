interface State {
  loading: boolean;
  userData: Record<string, any>;
  postsData: any[];
  sortByComments: boolean;
  sortByTitles: boolean;
}

const initialState: State = {
  loading: true,
  userData: {},
  postsData: [],
  sortByComments: false,
  sortByTitles: false,
};

type Action =
  | { type: 'FETCH_USER_DATA'; payload: Record<string, any> }
  | { type: 'FETCH_USER_POSTS'; payload: any[]; loading: boolean }
  | { type: 'TOGGLE_SORT' }
  | { type: 'TOGGLE_SORT_BY_TITLE' }
  | { type: 'SORT_POSTS'; payload: any[] };

const rootReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'FETCH_USER_DATA':
      return { ...state, userData: action.payload };
    case 'FETCH_USER_POSTS':
      return { ...state, postsData: action.payload, loading: false };
    case 'TOGGLE_SORT':
      return { ...state, sortByComments: !state.sortByComments };
    case 'TOGGLE_SORT_BY_TITLE':
      return { ...state, sortByTitles: !state.sortByTitles };
    case 'SORT_POSTS':
      return { ...state, postsData: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
