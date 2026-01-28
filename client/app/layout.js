import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// بيانات التطبيق والأيقونات (PWA)
export const metadata = {
  title: "Egy Homes",
  description: "Modern Real Estate in Egypt",
  manifest: "/manifest.json", // ملف تعريف التطبيق
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  themeColor: "#1e3a8a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 min-h-screen flex flex-col">
        {/* النافبار يظهر في الأعلى دائماً */}
        <Navbar />
        
        {/* هذا هو محتوى الصفحة المتغير */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* الفوتر يظهر في الأسفل دائماً */}
        <Footer />
      </body>
    </html>
  );
}