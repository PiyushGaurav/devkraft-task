import {ADD_USERS, COUNTER,CURRENT_USERS} from '../../utils/constants';

export const registerUser = (users) => {
  return {
    type: ADD_USERS,
    payload: users,
  };
};

export const updateCurrentUser = (user) => {
  return {
    type: CURRENT_USERS,
    payload: user,
  };
};

export const updateCounter = (counter) => {
  return {
    type: COUNTER,
    payload: counter,
  };
};
