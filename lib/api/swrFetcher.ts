import { axiosInstance } from "./axios";

export const fetcher = async (url: string) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export const postFetcher = <T>(url: string, { arg }: { arg: T }) =>
  axiosInstance.post(url, arg).then((res) => res.data || arg);