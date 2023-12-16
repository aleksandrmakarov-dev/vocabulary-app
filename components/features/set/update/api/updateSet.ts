import { GenericErrorResponse } from "@/lib/api";
import { EditSetDto } from "@/lib/dto/setDto";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Set } from "@prisma/client";
import { setKeys } from "@/components/entities/set";
import setService from "@/lib/services/setService";

type UseUpdateSetByIdQuery = {
  id: string;
  values: EditSetDto;
};

export const useUpdateSetById = () => {
  return useMutation<
    null,
    AxiosError<GenericErrorResponse>,
    UseUpdateSetByIdQuery,
    unknown[]
  >({
    mutationKey: setKeys.mutations.update(),
    mutationFn: async (data) => {
      const response = await setService.updateById(data.id, data.values);
      return response;
    },
  });
};
