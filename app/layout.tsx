import type { Metadata } from "next";
import "./globals.css";

<<<<<<< HEAD
const roboto = Roboto({
  subsets: ["latin"],
});

=======
>>>>>>> 5a73087 (modifid the dashboard and added side bar for routing clarity)
export const metadata: Metadata = {
  title: "Farmcash",
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
<<<<<<< HEAD
        <title>Farmcash – Empowering Farmers with Financial Solutions</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Fast, reliable loans, and easy payment solutions to help your farm grow."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@700;800&display=swap"
          rel="stylesheet"
        />
=======
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <style>{`
          :root {
            --font-roboto: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }
          body {
            font-family: var(--font-roboto);
          }
        `}</style>
>>>>>>> 3cae77d (final changes to the dashboard)
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
