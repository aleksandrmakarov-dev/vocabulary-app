import { setKeys } from "@/components/entities/set";
import { GenericErrorResponse } from "@/lib/api";
import folderService from "@/lib/services/folderService";
import setService from "@/lib/services/setService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeleteSetById = () => {
  return useMutation<null, AxiosError<GenericErrorResponse>, string, unknown[]>(
    {
      mutationKey: setKeys.mutations.delete(),
      mutationFn: async (id: string) => {
        const respose = await setService.deleteById(id);
        return respose;
      },
    }
  );
};
