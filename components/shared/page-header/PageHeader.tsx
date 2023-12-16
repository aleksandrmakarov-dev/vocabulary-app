import { cn } from "@/lib/utils";
import { Skeleton } from "@mui/material";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  isLoading?: boolean;
  actions?: React.ReactNode;
}

export default function PageHeader(props: PageHeaderProps) {
  const { title, isLoading, actions, className, ...other } = props;

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:justify-between items-center mb-5",
        className
      )}
      {...other}
    >
      {isLoading ? (
        <Skeleton variant="text" height="3.5rem" className="w-1/2" />
      ) : (
        <>
          <h1 className="text-3xl font-semibold">{title}</h1>
          <div className="flex flex-col gap-y-1 gap-x-3 w-full sm:w-auto mt-5 sm:mt-0 sm:flex-row">
            {actions}
          </div>
        </>
      )}
    </div>
  );
}
