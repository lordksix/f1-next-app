import localFont from "next/font/local";
import { Roboto } from "next/font/google";

export const sfPro = localFont({
  src: "./SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

export const f1Reg = localFont({
  src: "./Formula1-Regular.otf",
  variable: "--font-f1-reg",
});

export const f1Bold = localFont({
  src: "./Formula1-Bold.otf",
  variable: "--font-f1-bold",
});

export const f1Wide = localFont({
  src: "./Formula1-Wide.otf",
  variable: "--font-f1-wide",
});

export const f1tffReg = localFont({
  src: "./Formula1-Regular.ttf",
  variable: "--font-f1reg",
});

export const f1tffBold = localFont({
  src: "./Formula1-Bold.ttf",
  variable: "--font-f1bold",
});

export const f1tffWide = localFont({
  src: "./Formula1-Wide.ttf",
  variable: "--font-f1wide",
});

export const f1tffBlack = localFont({
  src: "./Formula1-Black.ttf",
  variable: "--font-f1black",
});

export const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ['latin'],
  weight: ['400', '700', '900'],
})
