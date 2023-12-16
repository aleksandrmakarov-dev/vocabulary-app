interface FullScreenWrapperProps {
  children: React.ReactNode;
}

export default function FullScreenWrapper(props: FullScreenWrapperProps) {
  const { children } = props;

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      {children}
    </div>
  );
}
