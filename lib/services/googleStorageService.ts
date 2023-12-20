import { Storage } from "@google-cloud/storage";
import path from "path";
import { buffer } from "stream/consumers";
import { v4 as uuid } from "uuid";

const bucketName = "vocabulary-app";

let storage: Storage | undefined = undefined;

function getSingletonStorage(): Storage {
  if (!storage) {
    storage = new Storage({
      keyFilename: path.join(
        process.cwd(),
        "vocabulary-app-408522-9fc35af17c48.json"
      ),
      projectId: "vocabulary-app-408522",
    });
  }

  return storage;
}

async function upload(
  fileName: string,
  buffer: ArrayBuffer | Uint8Array,
  destination: string
) {
  const name = uuid().replace(/-/g, "");
  const ext = path.extname(fileName);

  const storage = getSingletonStorage();
  const bucket = storage.bucket(bucketName);

  const blob = bucket.file(`${destination}/${name}${ext}`);

  await new Promise<void>((resolve) => {
    const writeStream = blob.createWriteStream();

    writeStream
      .on("error", (err) => {
        throw err;
      })
      .on("finish", () => {
        return resolve();
      })
      .end(Buffer.from(buffer));
  });

  await blob.makePublic();

  return blob.publicUrl();
}

async function move(target: string, destination: string) {
  const storage = getSingletonStorage();
  const bucket = storage.bucket(bucketName);
  await bucket.file(target).move(destination);
}

async function deleteByName(name: string) {
  const storage = getSingletonStorage();
  const bucket = storage.bucket(bucketName);
  await bucket.file(name).delete();
}

export default {
  upload,
  deleteByName,
  move,
};
