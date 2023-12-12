import axios from "axios";
import { GetFolderListDto } from "../dto/folderDto";
import { PagedResponse } from "../api";
import { Folder } from "@prisma/client";

const baseUrl = "/api/folders";

async function getList(
  params: GetFolderListDto
): Promise<PagedResponse<Folder>> {
  const response = await axios.get<PagedResponse<Folder>>(baseUrl, { params });
  return response.data;
}

export default { getList };
