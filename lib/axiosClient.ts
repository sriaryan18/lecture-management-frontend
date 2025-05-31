import axios from "axios";

export const getBaseURL = () => {
  return process.env.NEXT_PUBLIC_API_BASE_URL;
};

const axiosClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosClient;
