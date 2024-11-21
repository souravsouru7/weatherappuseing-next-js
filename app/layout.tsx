import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weather Forecast App",
  description: "Professional weather forecast application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed w-full z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="flex items-center space-x-3">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  <span className="text-xl font-bold text-gray-800">WeatherCast</span>
                </a>
              </div>
              <div className="flex items-center space-x-6">
                <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Home</a>
                <a href="/search" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">Search Weather</a>
              </div>
            </div>
          </div>
        </nav>
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
