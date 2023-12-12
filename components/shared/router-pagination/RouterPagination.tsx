import { cn } from "@/lib/utils";
import { Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";

interface RouterPaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  page: number;
  limit: number;
  itemsCount: number;
  pagesCount: number;
  baseUrl: string;
  label?: string;
}

export default function RouterPagination(props: RouterPaginationProps) {
  const {
    page,
    limit,
    itemsCount,
    pagesCount,
    baseUrl,
    label = "Entries",
    className,
    ...other
  } = props;

  const from = (page - 1) * limit + 1;
  const to = page * limit > itemsCount ? itemsCount : page * limit;

  return (
    <div
      className={cn(
        className,
        "flex items-center justify-center sm:justify-between"
      )}
      {...other}
    >
      <span className="text-gray-700 dark:text-gray-400 hidden sm:block">
        Showing <span className="font-semibold text-gray-900 ">{from}</span> to{" "}
        <span className="font-semibold text-gray-900 ">{to}</span> of{" "}
        <span className="font-semibold text-gray-900 ">{itemsCount}</span>{" "}
        {label}
      </span>
      <Pagination
        size="large"
        shape="rounded"
        page={page}
        count={pagesCount}
        showFirstButton
        showLastButton
        renderItem={(item) => {
          const page = item.page ?? "1";
          const url = `${baseUrl}?page=${page}`;
          return <PaginationItem {...item} component={Link} href={url} />;
        }}
      />
    </div>
  );
}
