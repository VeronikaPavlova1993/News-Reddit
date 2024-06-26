import { Reducer, ActionCreator } from 'redux';
import {
  ME_REQUEST,
  ME_REQUEST_ERROR,
  ME_REQUEST_SUCCESS,
  MeRequestAction,
  MeRequestErrorAction,
  MeRequestSuccessAction,
} from './me/actions';
import { MeState, meReducer } from './me/reducer';
import { tokenReducer } from './token/reducer';

export type RootState = {
  token: string;
  me: MeState;
  commentText: string;
};
const initialState: RootState = {
  token: '',
  me: {
    loading: false,
    error: '',
    data: {},
  },
  commentText: 'Привет, Skillbox!',
};
const SET_TOKEN = 'SET_TOKEN';
type setTokenAction = {
  type: typeof SET_TOKEN;
  token: string;
};
const UPDATE_COMMENT = 'UPDATE_COMMENT';

type updateCommentAction = {
  type: typeof UPDATE_COMMENT;
  text: string;
};

export const updateComment: ActionCreator<updateCommentAction> = (text) => ({
  type: UPDATE_COMMENT,
  text,
});
export const setToken: ActionCreator<setTokenAction> = (token) => ({
  type: SET_TOKEN,
  token,
});

export type MyAction =
  | setTokenAction
  | MeRequestAction
  | MeRequestSuccessAction
  | MeRequestErrorAction
  | updateCommentAction;
export const rootReducer: Reducer<RootState, MyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return {
        ...state,
        commentText: action.text,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: tokenReducer(state.token, action),
      };
    case ME_REQUEST:
    case ME_REQUEST_SUCCESS:
    case ME_REQUEST_ERROR:
      return {
        ...state,
        me: meReducer(state.me, action),
      };
    default:
      return state;
  }
};
