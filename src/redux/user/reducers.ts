import { types } from './actions';
import userDefault from '../../assets/user-default.png';

interface IUserData {
  administrator?: boolean;
  avatar: string;
  email: string;
  id: string;
  name: string;
}

const initialState: IUserData = {
  administrator: false,
  avatar: userDefault,
  email: '',
  id: '',
  name: '',
};

interface IAction {
  type: string;
  payload: {
    user: IUserData;
  };
}

export function user(state = initialState, action: IAction) {
  switch (action.type) {
    case types.UPDATE_USER:
      return action.payload.user;
    case types.REMOVE_USER:
      return initialState;
    case types.UPDATE_USER_AVATAR:
      return { ...state, avatar: action.payload.user.avatar };
    default:
      return state;
  }
}
