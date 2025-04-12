import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Topbar } from "@/components/Topbar";
import 'rsuite/dist/rsuite.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import { CustomProvider } from 'rsuite';
import ptBR from "rsuite/locales/pt_BR";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CustomProvider locale={ptBR}>
      <Topbar />
      <Component {...pageProps} />
    </CustomProvider>
  )
}
