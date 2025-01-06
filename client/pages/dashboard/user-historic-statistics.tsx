import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import PlatformCard from "../../components/platformCard";
import UserCard from "../../components/user/userCard";
import UserHistoricStatistics from "../../components/user/userHistoricStatistics";
import { LuckyMeAddress } from "../../lib/contract";

const Index: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(LuckyMeAddress);
  const { data: userId } = useContractRead(contract, "UserId", address);
  return (
    <main className="mx-auto max-w-7xl py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <PlatformCard />
      </div>
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-4 sm:gap-8">
        <div className="px-2 sm:px-0 sm:col-span-1">
          <UserCard userId={String(userId || 0)} />
        </div>

        <div className="px-2 pt-4 sm:pt-0 sm:px-0 sm:col-span-3">
          <UserHistoricStatistics userId={String(userId || 0)} />
        </div>
      </div>
    </main>
  );
};

export default Index;
