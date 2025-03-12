import { User } from "shared";
import {
  SET_TOKEN,
  CLEAR_TOKEN,
  SET_USERS,
  SET_USER,
  SET_USER_LOADING,
  SET_USER_ERROR,
  CLEAR_USER,
} from "./actions";

interface AuthState {
  token: string | null;
}

const initialAuthState: AuthState = {
  token: null,
};

export const authReducer = (
  state = initialAuthState,
  action: any
): AuthState => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case CLEAR_TOKEN:
      return { ...state, token: null };
    default:
      return state;
  }
};

interface UserState {
  users: User[];
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialUserState: UserState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

export const userReducer = (
  state = initialUserState,
  action: any
): UserState => {
  // Check if we're on the client-side
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case CLEAR_USER:
      return { ...state, user: null, loading: false, error: null };
    case SET_USER_LOADING:
      return { ...state, loading: action.payload };
    case SET_USER_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
