import { termKeys } from "@/components/entities/term";
import { GenericErrorResponse } from "@/lib/api";
import { EditTermDto } from "@/lib/dto/termDto";
import termService from "@/lib/services/termService";
import { Term } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateTerm = () => {
  return useMutation<
    Term,
    AxiosError<GenericErrorResponse>,
    EditTermDto,
    unknown[]
  >({
    mutationKey: termKeys.mutations.create(),
    mutationFn: async (data) => {
      const response = await termService.create(data);
      return response;
    },
  });
};
