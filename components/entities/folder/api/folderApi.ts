import { GenericErrorResponse, PagedResponse } from "@/lib/api";
import folderService from "@/lib/services/folderService";
import { Folder } from "@prisma/client";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type QueryParams = {
  page: number;
  limit: number;
};

export const folderKeys = {
  folders: {
    root: ["folders"],
    query: (query: QueryParams) => ["folders", query],
  },
  folder: {
    root: ["folder"],
    id: (id: string) => ["folder", id],
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