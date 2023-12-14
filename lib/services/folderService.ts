import axios from "axios";
import { EditFolderDto, GetFolderListDto } from "../dto/folderDto";
import { PagedResponse } from "../api";
import { Folder } from "@prisma/client";

const baseUrl = "/api/folders";

async function getList(
  params: GetFolderListDto
): Promise<PagedResponse<Folder>> {
  const response = await axios.get<PagedResponse<Folder>>(baseUrl, { params });
  return response.data;
}

async function create(values: EditFolderDto) {
  const response = await axios.post<Folder>(baseUrl, values);
  return response.data;
}

async function updateById(id: string, values: EditFolderDto) {
  const response = await axios.put<null>(`${baseUrl}/${id}`, values);
  return response.data;
}

async function getById(id: string) {
  const response = await axios.get<Folder>(`${baseUrl}/${id}`);
  return response.data;
}

async function deleteById(id: string) {
  const response = await axios.delete<null>(`${baseUrl}/${id}`);
  return response.data;
}

export default { getList, create, updateById, getById, deleteById };
