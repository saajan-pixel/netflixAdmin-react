// GET USERS
export const getUsersStart = () => ({ type: "GET_USER_START" });
export const getUsersSuccess = (users) => ({
  type: "GET_USER_SUCCESS",
  payload: users,
});
export const getUsersFailure = () => ({ type: "GET_USER_FAILURE" });

// uPDATE USERS
export const updateUsersStart = () => ({ type: "UPDATE_USER_START" });

export const updateUsersSuccess = (user) => ({
  type: "UPDATE_USER_SUCCESS",
  payload: user,
});

export const updateUsersFailure = () => ({ type: "UPDATE_USER_FAILURE" });

// delete user
export const deleteUserStart = () => ({ type: "DELETE_USER_START" });

export const deleteUserSuccess = (id) => ({
  type: "DELETE_USER_SUCCESS",
  payload: id,
});

export const deleteUserFailure = () => ({ type: "DELETE_USER_FAILURE" });
