import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Footer from "../components/footer";
import Header from "../components/header";
import "../styles/globals.css";
import Head from "next/head";

// const activeChain = {
//   chainId: 17000, // Holesky chain ID
//   rpc: ["https://ethereum-holesky-rpc.publicnode.com"], // Replace with the actual Holesky RPC URL
//   nativeCurrency: {
//     name: "Holesky ETH",
//     symbol: "ETH",
//     decimals: 18,
//   },
//   shortName: "holesky",
//   slug: "holesky",
//   testnet: true,
//   chain: "Holesky",
//   name: "Ethereum Holesky Testnet",
// };

// const  activeChain = ;
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
    <ThirdwebProvider  activeChain={56}>
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
