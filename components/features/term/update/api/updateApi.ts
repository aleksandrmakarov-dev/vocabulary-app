import { termKeys } from "@/components/entities/term";
import { GenericErrorResponse } from "@/lib/api";
import { EditTermDto } from "@/lib/dto/termDto";
import termService from "@/lib/services/termService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type UseUpdateTermByIdQuery = {
  id: string;
  values: EditTermDto;
};

export const useUpdateTermById = () => {
  return useMutation<
    null,
    AxiosError<GenericErrorResponse>,
    UseUpdateTermByIdQuery,
    unknown[]
  >({
    mutationKey: termKeys.mutations.update(),
    mutationFn: async (data: UseUpdateTermByIdQuery) => {
      const response = await termService.updateById(data.id, data.values);
      return response;
    },
  });
};
