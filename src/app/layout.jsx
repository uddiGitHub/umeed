import { Tinos } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import AuthHeader from "@/components/AuthHeader";
import { SpeedInsights } from "@vercel/speed-insights/next";

// font is set to Tinos
const tinos = Tinos({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Maan Ki Umeed",
  description: "Maan Ki Umeed is a non - profit organisation, based in Assam Guwahati in the year 2020. It is focused on building a community of change makers through Education, Empowerment , Employment and Service.",
};

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body className={tinos.className}>
        <ClerkProvider>
          <AuthHeader />
          {children}
          <SpeedInsights />
        </ClerkProvider>
      </body>
    </html>
  );
}
