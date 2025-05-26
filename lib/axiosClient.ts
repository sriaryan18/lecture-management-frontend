import axios from "axios";

const getBaseURL = () => {
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
  return process.env.NEXT_PUBLIC_API_BASE_URL;
};

const axiosClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
