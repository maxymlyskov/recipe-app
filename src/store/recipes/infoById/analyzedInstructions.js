import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH } from "../../constants";

export const analyzedInstructionsApi = createApi({
  reducerPath: "analyzedInstructionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spoonacular.com/recipes/" + AUTH,
  }),
  endpoints: (builder) => ({
    getAnalyzedInstructionsById: builder.query({
      query: (analyzedInstructions) =>
        `analyzedInstructions?${analyzedInstructions}/analyzedInstructions`,
    }),
  }),
});
export const { useGetAnalyzedInstructionsByIdQuery } = analyzedInstructionsApi;
