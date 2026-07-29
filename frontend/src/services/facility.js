import api from "./api";


export const getFacilities = async () => {
  const response = await api.get("/facilities");
  return response.data;
};


export const getFacilityById = async (id) => {
  const response = await api.get(`/facilities/${id}`);
  return response.data;
};


export const searchFacilities = async (query) => {
  const response = await api.get(
    `/facilities/search?q=${query}`
  );

  return response.data;
};