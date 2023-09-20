import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://asdfghjklmnbvcxz.vercel.app/" }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Appointments", "Customers", "Recipes"],
  endpoints: (build) => ({
    getAppointments: build.query({
      query: () => "/customer/appointments/",
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
  useGetCustomersQuery,
  useAddAppointmentMutation,
  useAddCustomerMutation,
  useUpdateAppointmentMutation,
} = api;
