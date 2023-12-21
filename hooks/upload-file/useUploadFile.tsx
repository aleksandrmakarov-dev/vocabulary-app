import { GenericErrorResponse } from "@/lib/api";
import { FileDto } from "@/lib/dto/fileDto";
import fileService from "@/lib/services/fileService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useUploadFile = () => {
  return useMutation<
    FileDto,
    AxiosError<GenericErrorResponse>,
    File,
    unknown[]
  >({
    mutationKey: ["upload-file"],
    mutationFn: async (file: File) => {
      return await fileService.upload(file);
    },
  });
};
