import axios from "axios";
import { EditSetDto, GetSetListDto } from "../dto/setDto";
import { PagedResponse } from "../api";
import { Set } from "@prisma/client";
import { SetWithTerms } from "../prisma";

const baseUrl = "/api/sets";
const foldersUrl = "/api/folders";

async function getByFolderId(
  folderId: string,
  params: Omit<GetSetListDto, "folderId">
): Promise<PagedResponse<Set>> {
  const response = await axios.get<PagedResponse<Set>>(
    `${foldersUrl}/${folderId}/sets`,
    { params }
  );
  return response.data;
}

async function getList(
  params: Omit<GetSetListDto, "folderId">
): Promise<PagedResponse<Set>> {
  const response = await axios.get<PagedResponse<Set>>(baseUrl, { params });
  return response.data;
}

async function create(data: EditSetDto): Promise<Set> {
  const response = await axios.post<Set>(baseUrl, data);
  return response.data;
}

async function updateById(id: string, data: EditSetDto): Promise<null> {
  const response = await axios.put<null>(`${baseUrl}/${id}`, data);
  return response.data;
}

async function getById(id: string): Promise<SetWithTerms> {
  const response = await axios.get<SetWithTerms>(`${baseUrl}/${id}`);
  return response.data;
}

async function deleteById(id: string): Promise<null> {
  const response = await axios.delete<null>(`${baseUrl}/${id}`);
  return response.data;
}

export default {
  getList,
  getByFolderId,
  create,
  updateById,
  getById,
  deleteById,
};
