import axios from "axios";
const API_URLS = process.env.REACT_APP_API;
export const getAllBookingsAPI = async (
  page,
  search = "",
  filter = ""
) => {
  const res = axios.get(
    `${API_URLS}/bookings?page=${page}${
      search ? "&search=" + search : ""
    }${filter !== "All Bookings" ? "&filterCriteria=" + filter : ""}`
  );
  return res;
};
export const createBookingAPI = async (data) => {
  const res = axios.post(`${API_URLS}/bookings`, data);
  return res;
};
export const getDetailBookingByIdAPI = async (id) => {
  const res = axios.get(`${API_URLS}/bookings/${id}`);
  return res;
};

export const updateBookingAPI = async (id, data) => {
  const res = axios.put(`${API_URLS}/bookings/${id}`, data);
  return res;
};
export const deleteBookingAPI = async (id) => {
  const res = axios.delete(`${API_URLS}/bookings/${id}`);
  return res;
};
