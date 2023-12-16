import { GenericErrorResponse } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Set } from "@prisma/client";
import { setKeys } from "@/components/entities/set";
import setService from "@/lib/services/setService";
import { EditSetDto } from "@/lib/dto/setDto";

export const useCreateSet = () => {
  return useMutation<
    Set,
    AxiosError<GenericErrorResponse>,
    EditSetDto,
    unknown[]
  >({
    mutationKey: setKeys.mutations.create(),
    mutationFn: async (data) => {
      const response = await setService.create(data);
      return response;
    },
  });
};
