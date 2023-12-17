import { termKeys } from "@/components/entities/term";
import { GenericErrorResponse } from "@/lib/api";
import termService from "@/lib/services/termService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeleteTermById = () => {
  return useMutation<null, AxiosError<GenericErrorResponse>, string, unknown[]>(
    {
      mutationKey: termKeys.mutations.delete(),
      mutationFn: async (id: string) => {
        const respose = await termService.deleteById(id);
        return respose;
      },
    }
  );
};
