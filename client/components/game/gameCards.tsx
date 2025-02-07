import GameCard from "./gameCard";
import { useState,useEffect } from "react";
const GameCards = ({ userId, mode }: { userId: string; mode?: string }) => {
  const [priceOftotalGentops,SetpriceOftotalGentops] = useState<string | null>(null)
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
      const priceInGentop = (usdtPrice / gentopPrice);
      SetpriceOftotalGentops(priceInGentop.toFixed(2).toString());
      console.log(`1 USDT Price = ${priceInGentop} gentop`);
    }
    
    useEffect(() => {
      getPriceOfUSDTInGentop();
    }, []);
  return (
    <>
      <GameCard
        name="Golden Draw"
        mode={mode}
        Id={0}
        userId={userId}
        tAmount={350 * (Number(priceOftotalGentops) || 1340.0)}
      />
      <GameCard
        name="Instant 1,000"
        mode={mode}
        Id={1}
        userId={userId}
        tAmount={1750 *(Number(priceOftotalGentops) || 1340.0)}
      />
      <GameCard
        name="Triple Power"
        mode={mode}
        Id={2}
        userId={userId}
        tAmount={3500 * (Number(priceOftotalGentops) || 1340.0)}
      />
      <GameCard
        name="Money Pot"
        mode={mode}
        Id={3}
        userId={userId}
        tAmount={7000 *(Number(priceOftotalGentops) || 1340.0)}
      />
      <GameCard
        name="Fantasy Wheel"
        Id={4}
        mode={mode}
        userId={userId}
        tAmount={17500 * (Number(priceOftotalGentops) || 1340.0)}
      />
      <GameCard
        name="Lucky Fireball"
        mode={mode}
        Id={5}
        userId={userId}
        tAmount={35000 *(Number(priceOftotalGentops) || 1340.0)}
      />
      <GameCard
        name="Jackpot Zone"
        mode={mode}
        Id={6}
        userId={userId}
        tAmount={70000 * (Number(priceOftotalGentops) || 1340.0)}
      />
      <GameCard
        name="Break The Bank"
        mode={mode}
        Id={7}
        userId={userId}
        tAmount={175000 * (Number(priceOftotalGentops) || 1340.0)}
      />
      <GameCard
        name="Mega Million"
        Id={8}
        mode={mode}
        userId={userId}
        tAmount={700000 *(Number(priceOftotalGentops) || 1340.0)}
      />
    </>
  );
};

export default GameCards;
