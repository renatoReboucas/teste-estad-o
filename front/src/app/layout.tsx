"use client";
import "./globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from "react";
import NavBar from "@/Components/NavBar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  )
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
      >
        <QueryClientProvider client={queryClient}>
          <NavBar />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
