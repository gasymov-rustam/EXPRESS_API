import { api } from './api';
import { User } from '../types';
import { API_PATHS } from '../constants';

interface IUpdateUser {
  userData: FormData;
  id: string;
}

interface IRegister {
  email: string;
  password: string;
  name: string;
}

interface ILoginParam {
  email: string;
  password: string;
}

interface ILoginResponse {
  token: string;
}

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginParam>({
      query: (userData) => ({
        url: API_PATHS.LOGIN,
        method: 'POST',
        body: userData,
      }),
    }),

    register: builder.mutation<IRegister, IRegister>({
      query: (userData) => ({
        url: API_PATHS.REGISTER,
        method: 'POST',
        body: userData,
      }),
    }),

    current: builder.query<User, void>({
      query: () => ({
        url: API_PATHS.CURRENT,
        method: 'GET',
      }),
    }),

    getUserById: builder.query<User, string>({
      query: (id) => ({
        url: `${API_PATHS.USERS}/${id}`,
        method: 'GET',
      }),
    }),

    updateUser: builder.mutation<User, IUpdateUser>({
      query: ({ userData, id }) => ({
        url: `${API_PATHS.USERS}/${id}`,
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCurrentQuery,
  useLazyCurrentQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
} = userApi;

export const { endpoints: userApiEndpoints } = userApi;
