import { Tinos } from "next/font/google";
import "@/app/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import AuthHeader from "@/components/AuthHeader";

// font is set to Tinos
const tinos = Tinos({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Maan Ki Umeed",
  description: "It is a Organization the do some stuff I don't really have a deep knowledge about!",
};

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body className={tinos.className}>
        <ClerkProvider>
          <AuthHeader />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
