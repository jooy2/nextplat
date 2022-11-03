import { createAction, handleActions } from 'redux-actions';
import { createMemo } from '../../api/memo';

const SET_MEMO_CONTENT = 'siteConfig/SET_MEMO_CONTENT';

const initialState = {
  tempContent: '',
};

export const setMemoContent = createAction(SET_MEMO_CONTENT, createMemo);

export default handleActions(
  {
    [SET_MEMO_CONTENT]: (state, action) => ({
      ...state,
      tempContent: action.payload,
    }),
  },
  initialState,
);
