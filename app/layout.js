import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Farmcash – Empowering Farmers with Financial Solutions</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Fast, reliable loans, and easy payment solutions to help your farm grow." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
