import { toast } from "react-toastify";
import axios from "./AxiosConfig.js";

export const CreatePropertyService = async (data) => {
  try {
    const res = await axios.post("/property/create", data);
    toast.success(res.data.message);
    return res;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const GetAllPropertyService = async () => {
  try {
    const res = await axios.get("/property/allview");
    // toast.success(res.data.message);
    return res;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};


export const GetPropertyDetailsService = async (id) => {
    try {
      const res = await axios.get(`/property/view/${id}`);
      toast.success(res.data.message);
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
    }
};

export const UpdatePropertyService = async (id, data) => {
  try {
    const res = await axios.put(`/property/update/${id}`, data);
    toast.success(res.data.message);
    return res;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const DeletePropertyService = async (id) => {
  try {
    const res = await axios.delete(`/property/delete/${id}`);
    toast.success(res.data.message);
    return res;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};


export const GetAllPropertySearchService = async (searchData) => {
  try {
    const res = await axios.post("/property/search", searchData);
    toast.success(res.data.message);
    return res.data.Searchdata;
  } catch (error) {
    toast.error(error.response?.data?.message || "Search failed");
    throw error;
  }
};
