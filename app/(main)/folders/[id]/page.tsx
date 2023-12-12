interface FolderPageContext {
  params: {
    id: string;
  };
}

export default function Folder(ctx: FolderPageContext) {
  return (
    <div>
      <h1>Folder - {ctx.params.id}</h1>
    </div>
  );
}
