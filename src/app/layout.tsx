import "~/styles/globals.css";
import React from "react";
import { ThemeProvider } from "~/components/theme-provider";

export const metadata = {
  title: "Google Drive Clone",
  description: "A Google Drive clone UI with dark mode",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
