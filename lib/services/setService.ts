import axios from "axios";
import { GetSetListDto } from "../dto/setDto";
import { PagedResponse } from "../api";
import { Set } from "@prisma/client";

const baseUrl = "/api/sets";
const foldersUrl = "/api/folders";

async function getByFolderId(
  folderId: string,
  params: Omit<GetSetListDto, "folderId">
): Promise<PagedResponse<Set>> {
  const response = await axios.get<PagedResponse<Set>>(
    `${foldersUrl}/${folderId}/sets`
  );
  return response.data;
}

async function getList(
  params: Omit<GetSetListDto, "folderId">
): Promise<PagedResponse<Set>> {
  const response = await axios.get<PagedResponse<Set>>(baseUrl, { params });
  return response.data;
}

export default { getList, getByFolderId };
