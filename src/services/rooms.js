import axios from "axios";
const API_URLS = process.env.REACT_APP_API;
export const getAllroomsAPI = async (
  page,
  search = "",
  filter = ""
) => {
  const res = axios.get(
    `${API_URLS}/rooms?page=${page}${
      search ? "&search=" + search : ""
    }${filter !== "All Rooms" ? "&filterCriteria=" + filter : ""}`
  );
  return res;
};
export const createRoomAPI = async (data) => {
  const res = axios.post(`${API_URLS}/rooms`, data);
  return res;
};
export const getDetailRoomByIdAPI = async (id) => {
  const res = axios.get(`${API_URLS}/rooms/${id}`);
  return res;
};

export const updateRoomAPI = async (id, data) => {
  const res = axios.put(`${API_URLS}/rooms/${id}`, data);
  return res;
};
export const deleteRoomAPI = async (id) => {
  const res = axios.delete(`${API_URLS}/rooms/${id}`);
  return res;
};

export const getRoomByTypeAndAvailable=async(type)=>{
  const res = axios.get(
    `${API_URLS}/rooms/available?type=${type}`
  );
  return res
}

