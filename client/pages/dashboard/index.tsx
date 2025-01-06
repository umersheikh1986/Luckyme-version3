import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import GameCards from "../../components/game/gameCards";
import PlatformCard from "../../components/platformCard";
import UserCard from "../../components/user/userCard";
import { LuckyMeAddress } from "../../lib/contract";

const Dashboard: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(LuckyMeAddress);
  const { data: userId } = useContractRead(
    contract,
    "UserId",
    address || "0x0000000000000000000000000000000000000000"
  );

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
          <div className="grid grid-cols-1 gap-y-4 sm:col-span-2 sm:grid-cols-2 sm:gap-8">
            <GameCards userId={String(userId || 0)} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
