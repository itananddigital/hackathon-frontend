import { axiosInstance } from "@/lib/api/axios";
import useSWRMutation from "swr/mutation"

export type UploadArg = {
  formData: FormData;
};

const postFetcher = async (url: string, { arg }: { arg: FormData }) => {
    const response = await axiosInstance.post(url, arg, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: "application/json",

      },
    });
    return response.data;
  };

export function useUpload() {

    const { trigger, error, isMutating } = useSWRMutation(
        '/api/method/upload_file', 
        postFetcher
    )

    return {
        trigger,
        error,
        isMutating
    }
}