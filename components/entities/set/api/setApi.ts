import { GenericErrorResponse, PagedResponse } from "@/lib/api";
import { Set } from "@prisma/client";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import setService from "@/lib/services/setService";

type QueryParams = {
  page: number;
  limit: number;
};

export const setKeys = {
  sets: {
    root: ["sets"],
    query: (query: QueryParams) => [...setKeys.sets.root, query],
  },
  set: {
    root: ["set"],
    id: (id: string) => [...setKeys.set.root, id],
  },
  mutations: {
    create: () => [...setKeys.set.root, "create"],
    update: () => [...setKeys.set.root, "update"],
    delete: () => [...setKeys.set.root, "delete"],
  },
};

type UseSetsQuery = UseQueryOptions<
  PagedResponse<Set>,
  AxiosError<GenericErrorResponse>,
  PagedResponse<Set>,
  unknown[]
>;

type UseSetsOptions = Omit<UseSetsQuery, "queryFn" | "queryKey">;

export const useSets = (params: QueryParams, options?: UseSetsOptions) => {
  return useQuery({
    queryKey: setKeys.sets.query(params),
    queryFn: async () => {
      return await setService.getList(params);
    },
    ...options,
  });
};

type UseSetsByFolderIdQuery = UseQueryOptions<
  PagedResponse<Set>,
  AxiosError<GenericErrorResponse>,
  PagedResponse<Set>,
  unknown[]
>;

type UseSetsByFolderIdOptions = Omit<
  UseSetsByFolderIdQuery,
  "queryFn" | "queryKey"
>;

type UseSetsByFolderIdParams = {
  folderId: string;
} & QueryParams;

export const useSetsByFolderId = (
  params: UseSetsByFolderIdParams,
  options?: UseSetsByFolderIdOptions
) => {
  return useQuery({
    queryKey: setKeys.sets.query(params),
    queryFn: async () => {
      return await setService.getByFolderId(params.folderId, {
        page: params.page,
        limit: params.limit,
      });
    },
    ...options,
  });
};
