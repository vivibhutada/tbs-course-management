import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import "./globals.css";
import { DataProvider } from "@/context/DataProvider";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <DataProvider>
          <div className="w-screen h-screen flex flex-col bg-neutral-100 overflow-hidden">
            <div className="w-full h-20 shadow-md relative z-1">
              <Navbar />
            </div>
            <div className="w-full h-full flex flex-row overflow-hidden">
              <Sidebar />
              <div className="w-full lg:w-5/6 px-5 py-3 min-h-0 overflow-y-auto custom-scrollbar scroll-smooth">
                {children}
              </div>
            </div>
          </div>
        </DataProvider>
      </body>
    </html>
  );
}
