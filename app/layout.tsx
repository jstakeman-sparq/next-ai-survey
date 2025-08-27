import type { Metadata } from "next";
import "./globals.css";
import AmplifyProvider from "./amplify-provider";

export const metadata: Metadata = {
  title: "Sparq - AI-Accelerated Product Execution",
  description: "Move fast. Ship even faster. AI-accelerated product execution for when speed isn't optional.",
  keywords: "AI, product development, engineering, strategy, design",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AmplifyProvider>
          {children}
        </AmplifyProvider>
      </body>
    </html>
  );
}
