import  apiSlice  from "./APISlice";
const USERS_URL = '/api/users';

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data
      })
    }),
    logout : builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method : 'POST',
      })
    }),
    registerUser : builder.mutation({
      query : (data) => ({
        url: `${USERS_URL}/register`,
        method : 'POST',
        body : data
      })
    }),
    updateUserProfile : builder.mutation({
      query : (data) => ({
        url : `${USERS_URL}/profile`,
        method : 'PUT',
        body : data
      })
    }),
    createOrder : builder.mutation({
      query : (data) => ({
        // Fn for saving created order to the database
      })
    })
  })
});

export const { useLoginMutation , useLogoutMutation, useRegisterUserMutation, useUpdateUserProfileMutation, useCreateOrderMutation } = usersApiSlice;
