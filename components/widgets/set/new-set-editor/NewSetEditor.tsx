"use client";
import { SetEditor } from "@/components/entities/set";
import { useCreateSet } from "@/components/features/set";
import { EditSetDto } from "@/lib/dto/setDto";
import Routing from "@/lib/routing";
import { useRouter } from "next/navigation";

interface NewSetEditorProps {
  folderId: string;
}

export function NewSetEditor(props: NewSetEditorProps) {
  const { folderId } = props;
  const router = useRouter();
  const { mutate, isPending, isError, error } = useCreateSet();

  const onSubmit = (data: EditSetDto) => {
    mutate(data, {
      onSuccess: (created) => {
        router.push(Routing.sets.edit(created.id));
      },
      onError: () => {
        console.log("error");
      },
    });
  };

  return (
    <SetEditor
      folderId={folderId}
      submit={onSubmit}
      isLoading={isPending}
      isError={isError}
      error={error?.response?.data}
    />
  );
}
