import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Footer from "../components/footer";
import Header from "../components/header";
import "../styles/globals.css";
import Head from "next/head";

const activeChain = "polygon";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const { id } = router.query;

  let root: string = "";
  if (router.asPath === "/dashboard" || router.asPath.includes("/dashboard/"))
    root = "/dashboard/";
  if (router.asPath === "/view" || router.asPath.includes("/view/"))
    root = "/view/";

  if (router.asPath === "/")
    return (
      <>
        <Head>
          <link rel="shortcut icon" href="/Lucky-Me-Icon.ico" />
        </Head>
        <Component {...pageProps} />
        <Footer />
      </>
    );

  return (
    <ThirdwebProvider activeChain={activeChain}>
      <Head>
        <link rel="shortcut icon" href="/Lucky-Me-Icon.ico" />
      </Head>
      <Header showMenu={router.asPath.includes("/r/")} root={root} id={id} />
      <div className="min-h-screen justify-between bg-dashboard-bg bg-cover bg-no-repeat bg-center ">
        <Component {...pageProps} />
      </div>
      <Footer />
    </ThirdwebProvider>
  );
}

export default MyApp;
