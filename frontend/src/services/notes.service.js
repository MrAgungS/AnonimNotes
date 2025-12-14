import api from "@/lib/axiosInstance";

export const getNotes = async () => {
  const res = await api.get("/notes");
  return res.data; 
};
