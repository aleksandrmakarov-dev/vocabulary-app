import { GenericErrorResponse, PagedResponse } from "@/lib/api";
import folderService from "@/lib/services/folderService";
import { Folder } from "@prisma/client";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type QueryParams = {
  page?: number;
  limit?: number;
};

export const folderKeys = {
  folders: {
    root: ["folders"],
    query: (query: QueryParams) => [...folderKeys.folders.root, query],
  },
  folder: {
    root: ["folder"],
    id: (id: string) => [...folderKeys.folder.root, id],
  },
  mutations: {
    create: () => [...folderKeys.folder.root, "create"],
    update: () => [...folderKeys.folder.root, "update"],
    delete: () => [...folderKeys.folder.root, "delete"],
  },
};

type UseFoldersQuery = UseQueryOptions<
  PagedResponse<Folder>,
  AxiosError<GenericErrorResponse>,
  PagedResponse<Folder>,
  unknown[]
>;

type UseFoldersOptions = Omit<UseFoldersQuery, "queryFn" | "queryKey">;

export const useFolders = (
  params: QueryParams,
  options?: UseFoldersOptions
) => {
  return useQuery({
    queryKey: folderKeys.folders.query(params),
    queryFn: async () => {
      return await folderService.getList(params);
    },
    ...options,
  });
};

type UseFolderByIdQuery = UseQueryOptions<
  Folder,
  AxiosError<GenericErrorResponse>,
  Folder,
  unknown[]
>;

type UseFolderByIdOptions = Omit<UseFolderByIdQuery, "queryFn" | "queryKey">;

export const useFolderById = (id: string, options?: UseFolderByIdOptions) => {
  return useQuery({
    queryKey: folderKeys.folder.id(id),
    queryFn: async () => {
      return await folderService.getById(id);
    },
    ...options,
  });
};
