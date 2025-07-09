import { Geist, Geist_Mono} from "next/font/google";
import { I18nProvider } from "@/components/I18nProvider";
import { AudioProvider } from "@/components/AudioProvider";
import GlobalAudioPlayer from "@/components/GlobalAudioPlayer";
import DynamicLayout from "@/components/DynamicLayout";
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
  title: "My Portfolio",
  description: "A showcase of my work and skills as a web developer.",
  icons: "/assets/logo2.svg"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}antialiased`}>
        <I18nProvider>
          <AudioProvider>
            <GlobalAudioPlayer />
            <DynamicLayout>
              {children}
            </DynamicLayout>
          </AudioProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
