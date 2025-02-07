import { Dialog } from "@headlessui/react";
import { formatEther } from "ethers/lib/utils";
import SlideOvers from "../ui/slideOvers";
import TotalParticipatesBar from "./components/totalParticipatesBar";
import NumberCard from "./numberCard";
import { useState ,useEffect } from "react";
import Image from "next/image";


interface Props {
  name: string;
  open: boolean;
  setOpen: any;
  data: any;
  Id: number;
  userId: any;
  tAmount: number;
}

const GameDetailsCard = ({
  name,
  open,
  setOpen,
  data,
  Id,
  userId,
  tAmount,
}: Props) => {
  async function getPriceOfUSDTInGentop() {
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImM5YzIzNjY4LTdhMmMtNGMxNi05NjZhLWY0ZWEyOTFjYzczZCIsIm9yZ0lkIjoiNDI3NzUzIiwidXNlcklkIjoiNDM5OTk1IiwidHlwZUlkIjoiNGE3YWRjMTQtMTgzZS00NTI2LTk0MzMtYmVjMGEwNWYyMDRiIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3Mzc5ODMzOTgsImV4cCI6NDg5Mzc0MzM5OH0.wF6kKB3EhhDMIn1CsLATm1dDxDGkvxCvIor86g5vCfE'; // Replace with your API Key
    const usdtAddress = '0x55d398326f99059fF775485246999027B3197955'; // USDT contract address on BSC
    const gentopTokenAddress = '0x4DF17Ed886b3237fDbc29EdB6e4dc986433f2377'; // Replace with the gentop token contract address
    const chain = 'bsc'; // Specify the blockchain
  
    // Moralis Web3 API endpoint for fetching token price
    const url = `https://deep-index.moralis.io/api/v2/erc20/${usdtAddress}/price?chain=${chain}`;
  
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey, // API key in the headers
      },
    });
  
    if (!response.ok) {
      console.error('Error fetching token price:', response.statusText);
      return;
    }
  
    const data = await response.json();
    const usdtPrice = data?.usdPrice; // Get price in USD (for example)
    console.log("this is usdt Price",usdtPrice)
  
    // Now get the price of gentop in terms of USDT
    const gentopPriceUrl = `https://deep-index.moralis.io/api/v2/erc20/${gentopTokenAddress}/price?chain=${chain}`;
  
    const gentopResponse = await fetch(gentopPriceUrl, {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey,
      },
    });
  
    if (!gentopResponse.ok) {
      console.error('Error fetching gentop price:', gentopResponse.statusText);
      return;
    }
  
    const gentopData = await gentopResponse.json();
    const gentopPrice = gentopData?.usdPrice;
  
    // Now calculate the ratio of 1 USDT in gentop
    const priceInGentop = (usdtPrice / gentopPrice)*10;
    SetpriceOftotalGentops(priceInGentop.toFixed(2).toString());
    console.log(`1 USDT Price = ${priceInGentop} gentop`);
  }
  const [priceOftotalGentops,SetpriceOftotalGentops] = useState<string | null>(null)
  useEffect(() => {
      getPriceOfUSDTInGentop();
    }, []);
  return (
    <SlideOvers open={open} setOpen={setOpen}>
      <div className="flex h-full flex-col bg-[#660e22] text-white shadow-xl">
        <div className="p-3 sm:p-6">
          <Dialog.Title className="text-xl leading-6">
            {name} - Game {Number(String(data?.Id || 0)) + 1}
          </Dialog.Title>
        </div>
        <div className="relative flex-1 h-[100vh]">
          <div
            style={{ height: "calc(100vh - 250px)" }}
            className="p-4 sm:p-6 grid grid-cols-3 gap-4 overflow-y-scroll"
          >
            {Array.from({ length: 100 }).map((i, j) => {
              return (
                <NumberCard
                  key={j}
                  data={data}
                  userId={userId}
                  Id={Id}
                  number={j}
                />
              );
            })}
          </div>
          <div className="p-4 sm:p-6">
            <TotalParticipatesBar data={data} />
            <div className="mt-6">
              Entry Fee{" "}
              {Number(formatEther(String(data?.EntryFee || 0))).toLocaleString(
                "en-US"
              )}
              <Image
                className="w-[16px] h-[16px] ml-1 inline-flex"
                width={500}
                height={500}
                src="/assets/gLogo.png"
                alt="Dai"
              />
            </div>
            <div className="mt-1">
              Total Prize Amount {""}
              {tAmount * 13400.0}
              <Image
                className="w-[16px] h-[16px] ml-1 inline-flex"
                width={500}
                height={500}
                src="/assets/gLogo.png"
                alt="Dai"
              />
            </div>
          </div>
        </div>
      </div>
    </SlideOvers>
  );
};

export default GameDetailsCard;
