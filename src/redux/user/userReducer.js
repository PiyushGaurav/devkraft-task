import {ADD_USERS, COUNTER, CURRENT_USERS} from '../../utils/constants';

const initialState = {
  users: [],
  currentUser: null,
  counter: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USERS:
      return {
        ...state,
        users: [...state.users, ...action.payload],
      };
    case CURRENT_USERS:
      return {
        ...state,
        currentUser: action.payload,
      };
    case COUNTER:
      return {
        counter: state.counter + action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
