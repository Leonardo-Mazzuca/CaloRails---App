import { QueryClient } from "@tanstack/react-query";
import axios from 'axios'

export const queryClient = new QueryClient();


export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
});