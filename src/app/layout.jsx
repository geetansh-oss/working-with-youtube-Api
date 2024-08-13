import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "../styles/globals.css"
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Youtube Upload Api",
  description: "Here we are going to work with the youtube V3 Api",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <main className="app">
            <Navbar />
            {children}
          </main>
        </body>
      </Provider>
    </html>
  );
}
