import { toast } from "react-toastify";
import axios from "./AxiosConfig.js";

export const SignUpService = async (anyname) => {
    try {
       const res = await axios.post("/user/register", anyname);
       toast.success(res.data.message);
       return res;  
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

export const LoginService = async (anyname) => {
    try {
        const res = await axios.post("/user/login", anyname);
        toast.success(res.data.message);
        return anyname;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

export const CurrentUserService = async () => {
    try {
        const {data} = await axios.get("/user/current-user");
        toast.success(data.message);
        return data;
    } catch (error) {
        throw error;
    }
};


export const LogOutService = async () => {
    try {
        const {data} = await axios.post("/user/logout");
        toast.success(data.message);
        return data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Logout failed");
        throw error;
    }
};