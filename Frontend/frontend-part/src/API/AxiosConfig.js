import axios from "axios";

const Instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export default Instance;
