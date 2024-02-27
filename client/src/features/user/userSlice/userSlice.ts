import { User } from '../../../types';
import { createAppSlice } from '../../../app/createAppSlice';
import { userApiEndpoints } from '../../../services';

interface InitialState {
  user: User | null;
  isAuthenticated: boolean;
  users: User[] | null;
  current: User | null;
  token?: string;
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
  users: null,
  current: null,
};

export const userSlice = createAppSlice({
  name: 'user',
  initialState,
  selectors: {
    selectIsAuthenticated(state) {
      return state.isAuthenticated;
    },

    selectCurrent(state) {
      return state.current;
    },

    selectUser(state) {
      return state.user;
    },

    selectUsers(state) {
      return state.users;
    },
  },
  reducers: (create) => ({
    logout: create.reducer(() => initialState),

    register: create.reducer((state) => {
      state.user = null;
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addMatcher(userApiEndpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addMatcher(userApiEndpoints.current.matchFulfilled, (state, action) => {
        state.current = action.payload;
        state.isAuthenticated = true;
      })
      .addMatcher(userApiEndpoints.getUserById.matchFulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { actions: userSliceActions, selectors: userSliceSelectors } = userSlice;
