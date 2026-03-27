import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Farmcash – Empowering Farmers with Financial Solutions",
  description:
    "Farmcash is a fintech MVP designed to help farmers and agricultural groups manage money digitally through wallet funding, payments, and transaction tracking. This version focuses on a working payment flow using Interswitch and a simple wallet system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
