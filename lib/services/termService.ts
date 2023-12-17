import axios from "axios";
import { EditTermDto } from "../dto/termDto";
import { Term } from "@prisma/client";

const baseUrl = "/api/terms";

async function create(data: EditTermDto): Promise<Term> {
  const response = await axios.post<Term>(baseUrl, data);
  return response.data;
}

async function updateById(id: string, data: EditTermDto): Promise<null> {
  const response = await axios.put<null>(`${baseUrl}/${id}`, data);
  return response.data;
}

async function deleteById(id: string): Promise<null> {
  const response = await axios.delete<null>(`${baseUrl}/${id}`);
  return response.data;
}

export default {
  create,
  updateById,
  deleteById,
};
