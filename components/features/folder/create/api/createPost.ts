import { folderKeys } from "@/components/entities/folder";
import { GenericErrorResponse } from "@/lib/api";
import { EditFolderDto } from "@/lib/dto/folderDto";
import folderService from "@/lib/services/folderService";
import { Folder } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreatePost = () => {
  return useMutation<
    Folder,
    AxiosError<GenericErrorResponse>,
    EditFolderDto,
    unknown[]
  >({
    mutationKey: folderKeys.mutations.create(),
    mutationFn: async (data) => {
      const response = await folderService.create(data);
      return response;
    },
  });
};
