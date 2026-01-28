import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: "Egy Homes | Modern Real Estate",
  description: "Find your dream home in Egypt. Buy, Rent, and Sell properties easily.",
  manifest: "/manifest.json",
  icons: { icon: "/icon.png", apple: "/icon.png" },
  themeColor: "#10b981", // Emerald Green
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-zinc-950 min-h-screen flex flex-col font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}