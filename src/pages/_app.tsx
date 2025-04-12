import "@/styles/globals.css";
import 'rsuite/dist/rsuite.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import type { AppProps } from "next/app";
import { CustomProvider } from 'rsuite';
import { ptBR } from "rsuite/esm/locales";
import { Topbar } from "@/components/Topbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CustomProvider locale={ptBR}>
      <Topbar />
      <Component {...pageProps} />
    </CustomProvider>
  )
}
