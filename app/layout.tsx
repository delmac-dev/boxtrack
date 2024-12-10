import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/common/providers";
import { Toaster } from "sonner";

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
    <html lang="en" suppressHydrationWarning>
      <body className="font-poppins antialiased">
        <Providers>
          {children}
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
