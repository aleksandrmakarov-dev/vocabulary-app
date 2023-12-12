interface PageHeaderProps {
  title: string;
}

export default function PageHeader(props: PageHeaderProps) {
  const { title } = props;

  return <h1 className="text-3xl font-semibold mb-5">{title}</h1>;
}
