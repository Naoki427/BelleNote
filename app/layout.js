import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import styles from './home.module.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BelleNote",
  description: "注目馬をメモしましょう！",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <div className={styles.headerBar}>
            <Image src="/logo.PNG" alt="logo" width={35} height={35}></Image>
            <Image src="/Bellenote.PNG" alt="logo" width={120} height={30}></Image>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
