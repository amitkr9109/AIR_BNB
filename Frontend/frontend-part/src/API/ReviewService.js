import { toast } from "react-toastify";
import axios from "./AxiosConfig.js";

export const CreateReviewService = async (data) => {
  try {
    const res = await axios.post(`/review/create`, data);
    toast.success(res.data.message);
    return res;
  } catch (error) {
    console.log("error", error);
    toast.error(error.response.data.message);
  }
};

export const AllReadReviewService = async (id) => {
  try {
    const res = await axios.get(`/review/allread/${id}`);
    // toast.success(res.data.message);
    return res;
  } catch (error) {
    console.log("error", error);
    toast.error(error.response.data.message);
  }
};

export const ReadReviewService = async (id) => {
  try {
    const res = await axios.get(`/review/read/${id}`);
    // toast.success(res.data.message);
    return res;
  } catch (error) {
    console.log("error", error);
    toast.error(error.response.data.message);
  }
};

export const UpdateReviewService = async (id, data) => {
  try {
    const res = await axios.put(`/review/update/${id}`, data);
    toast.success(res.data.message);
    return res;
  } catch (error) {
    console.log("error", error);
    toast.error(error.response.data.message);
  }
};


export const DeleteReviewService = async (id) => {
  try {
    const res = await axios.delete(`/review/delete/${id}`);
    toast.success(res.data.message);
    return res;
  } catch (error) {
    console.log("error", error);
    toast.error(error.response.data.message);
  }
};