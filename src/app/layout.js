import { Inter, Poor_Story } from "next/font/google";
import "./globals.css";
import localfont from "next/font/local";
import Navbar from "@/components/Navbar/Navbar";

const poorStory = Poor_Story({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });
const cerlions = localfont({
  src: [
    {
      path: "../fonts/Cerlions-Regular.otf",
    },
  ],
  variable: "--font-cerlions",
});

const ageya = localfont({
  src: [
    {
      path: "../fonts/Ageya.otf",
    },
  ],
  variable: "--font-ageya",
});

const canopee = localfont({
  src: [
    {
      path: "../fonts/Canopee Regular.otf",
    },
  ],
  variable: "--font-canopee",
});

const confillia = localfont({
  src: [
    {
      path: "../fonts/ConfilliaBold.otf",
    },
  ],
  variable: "--font-confillia",
});

const dahlia = localfont({
  src: [
    {
      path: "../fonts/dahlia-regular.otf",
    },
  ],
  variable: "--font-dahlia",
});

export const metadata = {
  title: "PORTFOLIO - SouvikSarkar",
  description: "Personal Portfolio project 2024",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${cerlions.variable} ${ageya.variable} ${canopee.variable} ${confillia.variable} ${dahlia.variable}`}
      >
        <Navbar />

        {children}
      </body>
    </html>
  );
}
