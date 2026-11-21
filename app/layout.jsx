import { Geist, Geist_Mono } from "next/font/google";
import { WorkspaceProvider } from "@/components/providers/WorkspaceProvider";
import AppShell from "@/components/shell/AppShell";
import { getJoinedUnits } from "@/lib/mock-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CampusFlow",
  description: "Academic coordination workspace for university students (demo)",
};

export default function RootLayout({ children }) {
  const units = getJoinedUnits();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <WorkspaceProvider>
          <AppShell units={units}>{children}</AppShell>
        </WorkspaceProvider>
      </body>
    </html>
  );
}
