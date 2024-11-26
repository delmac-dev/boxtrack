import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BoxTrack",
  description: "Intuitively track realtime changes to the status of boxes in the company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="w-full h-14 border-b border-neutral-300 flex">
          <div className="px-10 h-full flex items-center justify-center">
            <a href="/" className="text-xl font-bold uppercase">LOGO</a>
          </div>
          <div className="flex-1 h-full flex items-center justify-start gap-14">
            <a href="/groups/a" className="text-lg font-medium">A</a>
            <a href="/groups/b" className="text-lg font-medium">B</a>
            <a href="/groups/c" className="text-lg font-medium">C</a>
          </div>
          <div className="px-10 h-full flex items-center justify-center">
            <a href="/stats" className="text-lg font-medium">Stats</a>
          </div>
        </header>
        <main className="w-full flex justify-center py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
