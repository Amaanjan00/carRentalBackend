import Sidebar from "@/components/Sidebar";
import "./globals.css";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-blue-50 w-full h-full flex`}>
        <header className="sticky top-0 left-0 w-77 h-[100vh] p-2">
          <Sidebar />
        </header>
        <main className="w-full overflow-x-hidden m-4 bg-white shadow-md rounded-2xl p-2">{children}</main>
      </body>
    </html>
  );
}
