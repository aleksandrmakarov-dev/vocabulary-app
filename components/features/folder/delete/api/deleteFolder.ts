import { folderKeys } from "@/components/entities/folder";
import { GenericErrorResponse } from "@/lib/api";
import folderService from "@/lib/services/folderService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeleteFolderById = () => {
  return useMutation<null, AxiosError<GenericErrorResponse>, string, unknown[]>(
    {
      mutationKey: folderKeys.mutations.delete(),
      mutationFn: async (id: string) => {
        const respose = await folderService.deleteById(id);
        return respose;
      },
    }
  );
};
