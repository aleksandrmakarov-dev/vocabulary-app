import axios from "axios";
import { FileDto } from "../dto/fileDto";

const baseUrl = "/api/files";

async function upload(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<FileDto>(`${baseUrl}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export default {
  upload,
};
