import type { NextPage } from "next";
import { useRouter } from "next/router";
import PlatformCard from "../../components/platformCard";
import GameCards from "../../components/game/gameCards";
import UserCard from "../../components/user/userCard";

const Index: NextPage = () => {
  const router = useRouter();
  const { id }: any = router.query;

  if (id === "0") router.push("/auth");

  return (
    <main className="mx-auto max-w-7xl py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <PlatformCard />
      </div>
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-4 sm:gap-8">
        <div className="px-2 sm:px-0 sm:col-span-1">
          <UserCard userId={id} mode="view" />
        </div>

        <div className="px-2 pt-4 sm:pt-0 sm:px-0 sm:col-span-3">
          <div className="grid grid-cols-1 gap-y-4 sm:col-span-2 sm:grid-cols-2 sm:gap-8">
            <GameCards userId={id} mode="view" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
