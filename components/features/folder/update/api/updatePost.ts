import { folderKeys } from "@/components/entities/folder";
import { GenericErrorResponse } from "@/lib/api";
import { EditFolderDto } from "@/lib/dto/folderDto";
import folderService from "@/lib/services/folderService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type UseUpdaPostByIdQuery = {
  id: string;
  values: EditFolderDto;
};

export const useUpdatePostById = () => {
  return useMutation<
    null,
    AxiosError<GenericErrorResponse>,
    UseUpdaPostByIdQuery,
    unknown
  >({
    mutationKey: folderKeys.mutations.update(),
    mutationFn: async (data: UseUpdaPostByIdQuery) => {
      const response = await folderService.updateById(data.id, data.values);
      return response;
    },
  });
};
