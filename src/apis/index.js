import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const today = new Date();
const month = today.getMonth() + 1;
const day = today.getDate();

export const onThisDayApi = createApi({
  reducerPath: 'onThisDayApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_ON_THIS_DAY_API_URL
  }),
  endpoints: (builder) => ({
    getBirthdays: builder.query({
      query: () => ['births', month, day].join('/'),
    }),
  }),
})


export default onThisDayApi;
