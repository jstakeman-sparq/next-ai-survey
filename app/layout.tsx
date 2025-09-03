import type { Metadata } from "next";
import "./globals.css";
import AmplifyProvider from "./amplify-provider";
import Providers from "./components/Providers";
import Script from 'next/script';

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
        <Providers>
          <AmplifyProvider>
            {children}
          </AmplifyProvider>
        </Providers>
      </body>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-K4BLQNBE7D"
  ></script>
  <Script>
    {`window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    };
    gtag("js", new Date());

    gtag("config", "G-K4BLQNBE7D");`}
  </Script>
  <script async
    id="term-e7e5d07437489"
    src="https://wec-assets.terminus.services/9121cecd-626b-4c14-a0b3-b70e217dee6d/t.js"
  ></script>
    </html>
  );
}
