import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_URL }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Appointments", "Customers", "Receipes"],
  endpoints: (build) => ({
    getAppointments: build.query({
      query: (payload) => {
        return {
          url: "/customer/appointments/",
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
          url: "/customer/appointments/",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Customers"],
    }),
    addReceipe: build.mutation({
      query(payload) {
        return {
          url: "/customer/receipe/",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Customers"],
    }),
    getReceipes: build.query({
      query: (payload) => {
        return {
          url: "/customer/receipes/",
          params: { date: payload },
        };
      },
      providesTags: ["Appointments"],
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
          url: "/customer/appointments/",
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
  useGetReceipesQuery,
  useGetCustomersQuery,
  useAddAppointmentMutation,
  useAddCustomerMutation,
  useUpdateAppointmentMutation,
  useAddReceipeMutation,
} = api;
