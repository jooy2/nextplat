import { createAction, handleActions } from 'redux-actions';

const SET_MEMO_CONTENT = 'siteConfig/SET_MEMO_CONTENT';

const initialState = {
  tempContent: '',
};

export const setMemoContent = createAction(SET_MEMO_CONTENT);

export default handleActions({
  [SET_MEMO_CONTENT]: (state, action) => ({
    ...state,
    tempContent: action.payload,
  }),
}, initialState);
