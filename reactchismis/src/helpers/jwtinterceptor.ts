import { BASE_URL } from "../config";
import axios, { AxiosInstance } from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = useNavigate()

const useAxiosWithInterceptor = (): AxiosInstance => {
    const jwtAxios = axios.create({ baseURL: API_BASE_URL });
    const navigate = useNavigate();

    jwtAxios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (error.response.status === 403) {
                const goRoot = () => navigate("/")
                goRoot()
            }
        }
    )

    return jwtAxios;
}

export default useAxiosWithInterceptor;
