import axios from "axios";
const API_URLS = process.env.REACT_APP_API;
export const getAllGuestsAPI = async (
  page,
  search = "",
  filter = ""
) => {
  const res = axios.get(
    `${API_URLS}/guests?page=${page}${
      search ? "&search=" + search : ""
    }${filter !== "All Guests" ? "&filterCriteria=" + filter : ""}`
  );
  return res;
};
export const createGuestAPI = async (data) => {
  const res = axios.post(`${API_URLS}/guests`, data);
  return res;
};
export const getDetailGuestByIdAPI = async (id) => {
  const res = axios.get(`${API_URLS}/guests/${id}`);
  return res;
};

export const updateGuestAPI = async (id, data) => {
  const res = axios.put(`${API_URLS}/guests/${id}`, data);
  return res;
};
export const deleteGuestAPI = async (id) => {
  const res = axios.delete(`${API_URLS}/guests/${id}`);
  return res;
};
