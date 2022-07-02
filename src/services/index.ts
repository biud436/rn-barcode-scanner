import {config} from '../config';
import {
  createApi,
  //   FetchArgs,
  fetchBaseQuery,
  //   FetchBaseQueryError,
  //   FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: config.API_URL,
});

// const baseQueryWithInterceptor = async (
//   args: string | FetchArgs,
//   api: BaseQueryApi,
//   extraOptions: any,
// ) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     // warn log
//     console.warn('Unauthorized');
//   }

//   return;
// };

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
});
