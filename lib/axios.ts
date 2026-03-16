import { ENV } from "@/constants/env";
import axios from "axios";

export const apiClient = axios.create({
    baseURL: ENV.BASEURL
})
