import { types } from './actions';

interface IAction {
  type?: string;
}

export function drawer(state = false, action: IAction) {
  switch (action.type) {
    case types.OPEN_DRAWER:
      return true;
    case types.CLOSE_DRAWER:
      return false;
    default:
      return state;
  }
}
