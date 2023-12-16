import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-screen-xl w-full mx-auto px-4 py-10 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
