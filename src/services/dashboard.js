import axios from "axios";
const API_URLS = process.env.REACT_APP_API;
export const getOccupiedrooms = async (page, search = "") => {
  const res = axios.get(
    `${API_URLS}/dashboard/occupied-rooms?page=${page}${
      search ? "&search=" + search : ""
    }`
  );
  return res;
};
export const getStatsAPI = async () => {
  const res = axios.get(`${API_URLS}/dashboard/stats`);
  return res;
};

export const checkIn=async(data)=>{
  const res = axios.post(`${API_URLS}/dashboard/check-in`,data);
  return res

}

export const addRoomService=async(data)=>{
  const res = axios.post(`${API_URLS}/dashboard/room-service`,data);
  return res
}