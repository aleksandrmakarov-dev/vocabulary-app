import { useUploadFile } from "@/hooks/upload-file/useUploadFile";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, CircularProgress, IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";

interface ImageUploadProps {
  value: string | null;
  onChange: (value: string | null) => void;
  className?: string;
}

export function ImageUpload(props: ImageUploadProps) {
  const { value, onChange, className } = props;

  const [image, setImage] = useState<string | null>(value);

  const { mutate, isPending, isError, error } = useUploadFile();

  useEffect(() => {
    setImage(value);
  }, [value]);

  const setImageUrl = (url: string | null) => {
    setImage(url);
    onChange(url);
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files.item(0);
      if (file) {
        mutate(file, {
          onSuccess: (data) => {
            setImageUrl(data.url);
          },
        });
      }
    }
  };

  return (
    <div className={className}>
      <div className="block relative overflow-clip w-full h-full rounded-md border border-gray-400 border-dashed bg-white">
        {image ? (
          <>
            <Image
              className="object-cover object-center"
              alt="img"
              src={image}
              fill
            />
            <Button
              className="absolute top-2 left-2"
              size="small"
              variant="contained"
              disableElevation
              onClick={() => setImageUrl(null)}
            >
              <DeleteIcon fontSize="small" />
            </Button>
          </>
        ) : (
          <label>
            <div className="w-full h-full flex flex-col items-center justify-center absolute bg-white cursor-pointer">
              {isPending ? (
                <CircularProgress size={28} />
              ) : (
                <AddPhotoAlternateIcon />
              )}
            </div>
            <input type="file" className="hidden" onChange={onFileSelect} />
          </label>
        )}
      </div>
    </div>
  );
}
