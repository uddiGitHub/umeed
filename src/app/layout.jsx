import { Tinos } from "next/font/google";
import "./globals.css";
import Script from "next/script"; 

import { ClerkProvider } from "@clerk/nextjs";
import AuthHeader from "@/components/AuthHeader";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const tinos = Tinos({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Maan Ki Umeed",
  description:
    "Maan Ki Umeed is a non-profit organisation, based in Assam Guwahati in the year 2020. It is focused on building a community of change makers through Education, Empowerment, Employment and Service.",
  verification: {
    google: "NQ4NYNcH2JpE-yTLq5rvFqBxYbBRNay_6jHKZTw0nyo",
  },
};

export default function RootLayout({ children }) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body className={tinos.className}>
        <ClerkProvider>
          <AuthHeader />
          {children}
          <SpeedInsights />
          <Analytics />
        </ClerkProvider>

        {/* Google Analytics */}
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}