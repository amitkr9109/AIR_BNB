import { toast } from "react-toastify";
import axios from "./AxiosConfig.js";

export const PropertyBookingService = async (data) => {
  try {
    const res = await axios.post(`/booking/create`, data);
    toast.success(res.data.message);
    return res;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const PropertyBookingCanceledService = async (id) => {
  try {
    const res = await axios.delete(`/booking/delete/${id}`);
    toast.success(res.data.message);
    return res;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};