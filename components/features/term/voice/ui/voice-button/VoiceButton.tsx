import { IconButton } from "@mui/material";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useAudio } from "@/hooks/audio/useAudio";

interface VoiceButtonProps {
  url: string;
}

export function VoiceButton(props: VoiceButtonProps) {
  const { url } = props;

  const { toggle, playing } = useAudio(url);

  return (
    <IconButton onClick={toggle}>
      {playing ? <VolumeUpIcon /> : <VolumeDownIcon />}
    </IconButton>
  );
}
