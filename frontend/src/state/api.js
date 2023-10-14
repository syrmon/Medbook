import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_URL }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Appointments", "Customers", "Receipes", "Statistics"],
  endpoints: (build) => ({
    getAppointments: build.query({
      query: (payload) => {
        return {
          url: "/appointments/",
          params: { date: payload },
        };
      },
      providesTags: ["Appointments"],
    }),
    getCustomers: build.query({
      query: () => "/customer/",

      providesTags: ["Customers"],
    }),
    addAppointment: build.mutation({
      query(payload) {
        return {
          url: "/appointments/",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Customers"],
    }),
    addReceipe: build.mutation({
      query(payload) {
        return {
          url: "/receipes/",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Customers"],
    }),
    getReceipes: build.query({
      query: (payload) => {
        return {
          url: "/receipes/",
          params: { date: payload },
        };
      },
      providesTags: ["Receipes"],
    }),
    getStatistics: build.query({
      query: (payload) => {
        return {
          url: "/statistics/",
          params: { date: payload.date, filter: payload.filter },
        };
      },
      providesTags: ["Statistics"],
    }),
    addCustomer: build.mutation({
      query(payload) {
        return {
          url: "/customer/",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Customers"],
    }),
    updateAppointment: build.mutation({
      query(payload) {
        return {
          url: "/appointments/",
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Appointments"],
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useGetStatisticsQuery,
  useGetReceipesQuery,
  useGetCustomersQuery,
  useAddAppointmentMutation,
  useAddCustomerMutation,
  useUpdateAppointmentMutation,
  useAddReceipeMutation,
} = api;
