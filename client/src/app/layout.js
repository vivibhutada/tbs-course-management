import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import "./globals.css";
import { DataProvider } from "@/context/DataProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DataProvider>
          <div className="w-screen h-screen grid grid-rows-20_1fr grid-cols-6 bg-neutral-100 overflow-hidden">
            <div className="row-span-1 col-span-6 h-20">
              <Navbar />
            </div>
            <div className="row-span-1 col-span-1 ps-3 py-3">
              <Sidebar />
            </div>
            <div className="col-span-5 p-3 min-h-0 overflow-y-auto custom-scrollbar">{children}</div>
          </div>
        </DataProvider>
      </body>
    </html>
  );
}
