export const types = {
  UPDATE_USER: 'UPDATE_USER',
  REMOVE_USER: 'REMOVE_USER',
  UPDATE_USER_AVATAR: 'UPDATE_USER_AVATAR',
};

export function updateUser() {
  return { type: types.UPDATE_USER };
}

export function removeUser() {
  return { type: types.REMOVE_USER };
}

export function updateUserAvatar() {
  return { type: types.UPDATE_USER_AVATAR };
}
