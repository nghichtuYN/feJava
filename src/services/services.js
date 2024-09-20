import axios from "axios";
const API_URLS = process.env.REACT_APP_API;
export const getAllServicesAPI = async (page, search = "", filter = "") => {
  const res = axios.get(
    `${API_URLS}/services?page=${page}${search ? "&search=" + search : ""}${
      filter !== "All Services" ? "&filterCriteria=" + filter : ""
    }`
  );
  return res;
};
export const createServiceAPI = async (data) => {
  const res = axios.post(`${API_URLS}/services`, data);
  return res;
};
export const getDetailServiceByIdAPI = async (id) => {
  const res = axios.get(`${API_URLS}/services/${id}`);
  return res;
};

export const updateServiceAPI = async (id, data) => {
  const res = axios.put(`${API_URLS}/services/${id}`, data);
  return res;
};
export const deleteServiceAPI = async (id) => {
  const res = axios.delete(`${API_URLS}/services/${id}`);
  return res;
};

export const getAllServiceNoPanination = async (search = "") => {
  const res = axios.get(
    `${API_URLS}/services/available${search ? "?search=" + search : ""}`
  );
  return res;
};
