import { User } from "shared";
import api from "./axiosConfig";

export const fetchUserData = async () => {
  const response = await api.get(`fetch-user-data`);
  return response.data as User[];
};

export const updateUserData = async (user: User) => {
  const response = await api.post(`update-user-data`, user);
  return response.data;
};
