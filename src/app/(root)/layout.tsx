import { NavBar } from "@/components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="font-work-sans">
      <NavBar />
      {children}
    </main>
  );
}
