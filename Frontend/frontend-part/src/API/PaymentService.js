import { toast } from "react-toastify";
import axios from "./AxiosConfig";

export const VerifyPaymentService = async (data) => {
  try {
    const res = await axios.post("/payment/verify", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success(res.data.message);
    return res;
  } catch (error) {
    const msg = error.response?.data?.message || "Server Error";
    toast.error(msg);
    return { error: true, message: msg };
  }
};