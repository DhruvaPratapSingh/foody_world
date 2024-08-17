import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import Provider from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Food-Ordering",
  description: "here youcan easily order your favorite food",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
          <Provider>
            {children}
          </Provider>
      </body>
    </html>
  </ClerkProvider>

  );
}
