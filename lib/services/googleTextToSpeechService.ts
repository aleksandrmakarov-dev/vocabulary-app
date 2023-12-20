import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { google } from "@google-cloud/text-to-speech/build/protos/protos";
import path from "path";

let client: TextToSpeechClient | undefined = undefined;

function getSingletonClient(): TextToSpeechClient {
  if (!client) {
    client = new TextToSpeechClient({
      keyFilename: path.join(
        process.cwd(),
        "vocabulary-app-408522-9fc35af17c48.json"
      ),
      projectId: "vocabulary-app-408522",
    });
  }
  return client;
}

interface VoiceFile {
  name: string;
  buffer: Uint8Array;
}

async function voice(text: string, lang: string): Promise<VoiceFile | null> {
  const client = getSingletonClient();

  console.log("text", text);

  const request: google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
    input: {
      text: text,
    },
    voice: {
      languageCode: lang,
      ssmlGender: "FEMALE",
    },
    audioConfig: {
      audioEncoding: "MP3",
    },
  };

  const [response] = await client.synthesizeSpeech(request);

  if (response.audioContent instanceof Uint8Array) {
    return {
      name: `${Date.now()}.mp3`,
      buffer: response.audioContent,
    };
  }

  return null;
}

async function getVoices(): Promise<
  google.cloud.texttospeech.v1.IVoice[] | null | undefined
> {
  const client = getSingletonClient();

  const [response] = await client.listVoices();

  return response.voices;
}

export default {
  voice,
  getVoices,
};
