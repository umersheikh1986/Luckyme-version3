import { useContract, useContractRead } from "@thirdweb-dev/react";
import { LuckyMeAddress } from "../../lib/contract";
import { useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function GameHistoricStatistics() {
  const { contract } = useContract(LuckyMeAddress);
  const { data, isLoading } = useContractRead(contract, "CompGames");

  const [CompGames, setCompGames] = useState<any>([]);
  const [filterEventsData, setFilterEventsData] = useState<any>([]);
  const [filterNumbers, setFilterNumbers] = useState(0);
  const [filter, setFilter] = useState(1);
  const totalElemnts = 4;
  useMemo(() => {
    if (!data) return;
    setCompGames(data);
    setFilterNumbers(Math.ceil(data.length / totalElemnts));
    if (filterEventsData.length === 0)
      setFilterEventsData(data.slice(0, totalElemnts));
  }, [data]);

  const filterHandler = ({ i }: any) => {
    setFilter(i);
    setFilterEventsData(
      CompGames.slice(i * totalElemnts - totalElemnts, i * totalElemnts)
    );
  };

  const previousFilterHandler = () => {
    const nfilter = filter - totalElemnts;
    if (nfilter === 0) return;

    setFilterEventsData(
      CompGames.slice(
        nfilter * totalElemnts - totalElemnts,
        nfilter * totalElemnts
      )
    );
    setFilter(nfilter);
  };

  const nextFilterHandler = () => {
    const nfilter = filter + totalElemnts;
    if (filterNumbers < nfilter) return;

    setFilterEventsData(
      CompGames.slice(
        nfilter * totalElemnts - totalElemnts,
        nfilter * totalElemnts
      )
    );
    setFilter(nfilter);
  };

  return (
    <div className="overflow-hidden bg-[#360712] border-2 border-white/40 sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex justify-between">
          <h3 className="text-xl leading-6 text-white">All Prizes Winners</h3>
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 px-4 sm:px-6"></div>

      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-[#660e22] px-4 py-5 border-b-2 hidden sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
            <dt className="text-[16px] text-white">Date</dt>
            <dt className="text-[16px] text-white">User ID</dt>
            <dt className="text-[16px] text-white">Number</dt>
            <dd className="text-[16px] text-white">Game Name</dd>
            <dd className="text-[16px] text-white">Game ID</dd>
            <dd className="text-[16px] text-white">Amount</dd>
          </div>

          <div className="h-[450px] overflow-y-scroll ">
            {filterEventsData?.map((data: any, j: number) => {
              return <Game key={j} Game={data.Game} GameId={data.GameId} />;
            })}

            {filterEventsData?.length === 0 ? (
              <div className=" px-4 py-5 border-b-2 sm:px-6">
                <p className="text-center text-white">No Winners Yet</p>
              </div>
            ) : null}
          </div>
        </dl>
      </div>

      <div className="flex items-center justify-between border-t  px-4 py-3 sm:px-6">
        <div className="flex flex-1 items-center justify-between">
          <div></div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={previousFilterHandler}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-white ring-1 ring-inset ring-gray-300 hover:opacity-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {Array.from({ length: filterNumbers }).map((d, i) => {
                const pageNumber = i + 1;
                if (pageNumber === filter) {
                  return (
                    <button
                      key={i}
                      className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {pageNumber}
                    </button>
                  );
                }
                if (
                  (pageNumber === filter - 1 && i !== 0) ||
                  (pageNumber === filter + 1 && i !== filterNumbers - 1)
                ) {
                  return (
                    <button
                      key={i}
                      onClick={() => filterHandler({ i: pageNumber })}
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:opacity-50 focus:z-20 focus:outline-offset-0"
                    >
                      {pageNumber}
                    </button>
                  );
                }
                if (
                  pageNumber === 1 ||
                  pageNumber === filterNumbers ||
                  (pageNumber === filter - 2 && i === 0) ||
                  (pageNumber === filter + 2 && i === filterNumbers - 1)
                ) {
                  return (
                    <button
                      key={i}
                      onClick={() => filterHandler({ i: pageNumber })}
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:opacity-50 focus:z-20 focus:outline-offset-0"
                    >
                      {pageNumber}
                    </button>
                  );
                }
                return null;
              })}
              <button
                onClick={nextFilterHandler}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-white ring-1 ring-inset ring-gray-300 hover:opacity-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

function Game({ Game, GameId }: { Game: any; GameId: any }) {
  const { contract } = useContract(LuckyMeAddress);
  const { data, isLoading } = useContractRead(
    contract,
    "singleGameDetail",
    String(Game),
    String(GameId)
  );

  return (
    <>
      {data?.WinnersId.map((j: any, i: any) => (
        <GameSingle
          key={i}
          EndedAt={data?.EndedAt}
          UserId={j}
          Game={Game}
          GameId={GameId}
          Winner={data?.Winners[i]}
          i={i}
        />
      ))}
    </>
  );
}

const gamePrizes: any = {
  "0": 40,
  "1": 20,
  "2": 10,
};
const gameAmount: any = {
  "0": { name: "Golden Draw", amount: 500 },
  "1": { name: "Instant 1,000", amount: 2500 },
  "2": { name: "Triple Power", amount: 5000 },
  "3": { name: "Money Pot", amount: 10000 },
  "4": { name: "Fantasy Wheel", amount: 25000 },
  "5": { name: "Lucky Fireball", amount: 50000 },
  "6": { name: "Jackpot Zone", amount: 100000 },
  "7": { name: "Break The Bank", amount: 250000 },
  "8": { name: "Mega Million", amount: 1000000 },
};

function GameSingle({
  EndedAt,
  UserId,
  Game,
  GameId,
  Winner,
  i,
}: {
  EndedAt: any;
  UserId: any;
  Game: any;
  GameId: any;
  Winner: any;
  i: any;
}) {
  return (
    <div className="bg-gray-50 px-4 py-3 border-b-2 sm:grid items-center sm:grid-cols-6 sm:gap-4 sm:px-6">
      <dt className="text-sm font-medium text-gray-500">
        <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
          Date :
        </span>{" "}
        {
          (new Date(Number(String(EndedAt || 0)) * 1000) || 0)
            .toLocaleString("en-US")
            .split(",")[0]
        }
      </dt>
      <dt className="text-sm font-medium text-gray-500 ml-4">
        <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
          User Id :
        </span>{" "}
        {String(UserId || 0)}
      </dt>
      <dt className="text-sm font-medium text-gray-500 ml-4">
        <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
          Number :
        </span>{" "}
        {String(Winner || 0)}
      </dt>
      <dd className="text-sm font-medium text-gray-500 ml-1">
        <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
          Game Name :
        </span>{" "}
        {gameAmount[String(Game)].name}
      </dd>
      <dd className="text-sm font-medium text-gray-500 ml-7">
        <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
          Game ID :
        </span>{" "}
        {Number(String(GameId)) + 1}
      </dd>
      <dd className="text-sm font-medium text-gray-500 ml-6">
        <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
          Amount :
        </span>{" "}
        {(gameAmount[String(Game)].amount * gamePrizes[i]) / 100}
      </dd>
    </div>
  );
}
