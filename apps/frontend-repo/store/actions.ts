import { User } from "shared";

// src/store/actions/authActions.ts
export const SET_TOKEN = "SET_TOKEN";
export const CLEAR_TOKEN = "CLEAR_TOKEN";

export const setToken = (token: string) => ({
  type: SET_TOKEN,
  payload: token,
});
export const clearToken = () => ({ type: CLEAR_TOKEN });

// src/store/actions/userActions.ts
export const SET_USERS = "SET_USERS";
export const SET_USER = "SET_USER";
export const SET_USER_LOADING = "SET_USER_LOADING";
export const SET_USER_ERROR = "SET_USER_ERROR";
export const CLEAR_USER = "CLEAR_USER";

export const setUsers = (users: User[]) => ({
  type: SET_USERS,
  payload: users,
});
export const setUser = (user: User) => ({ type: SET_USER, payload: user });
export const setUserLoading = (loading: boolean) => ({
  type: SET_USER_LOADING,
  payload: loading,
});
export const setUserError = (error: string | null) => ({
  type: SET_USER_ERROR,
  payload: error,
});
export const clearUser = () => ({ type: CLEAR_USER });
