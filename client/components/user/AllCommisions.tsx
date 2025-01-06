import { useContract, useContractEvents } from "@thirdweb-dev/react";
import { useMemo, useState } from "react";
import { LuckyMeAddress } from "../../lib/contract";
import { formatEther } from "ethers/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const Game = [
  {
    gameId: 0,
    name: "Golden Draw",
  },
  {
    gameId: 1,
    name: "Instant 1,000",
  },
  {
    gameId: 2,
    name: "Triple Power",
  },
  {
    gameId: 3,
    name: "Money Pot",
  },
  {
    gameId: 4,
    name: "Fantasy Wheel",
  },
  {
    gameId: 5,
    name: "Lucky Fireball",
  },
  {
    gameId: 6,
    name: "Jackpot Zone",
  },
  {
    gameId: 7,
    name: "Break The Bank",
  },
  {
    gameId: 8,
    name: "Mega Million",
  },
];
const AllCommisions = ({ userId }: { userId: any }) => {
  let counter = 1;

  const { contract } = useContract(LuckyMeAddress);
  const {
    data: events,
    isLoading: eventsIsLoading,
    error,
  } = useContractEvents(contract);

  const copyAddress = (hash: any) => {
    navigator.clipboard.writeText(String(hash.hash));
  };

  const [eventsData, setEventsData] = useState<any>([]);
  const [filterEventsData, setFilterEventsData] = useState<any>([]);
  const [filterNumbers, setFilterNumbers] = useState(0);
  const [filter, setFilter] = useState(1);
  const totalElemnts = 10;

  useMemo(() => {
    if (!events) return;

    let data = [];
    let counter = 1;
    for (let i = 0; i < events.length; i++) {
      const element: any = events[i];

      if (String(element.data._ref) === String(userId)) {
        if (
          element.eventName === "_uplineMemberRef" ||
          element.eventName === "_uplinePicksRef" ||
          element.eventName === "_uplinePrizesRef"
        ) {
          element.counter = counter++;
          data.push(element);
        }
      }
    }

    setEventsData(data);
    setFilterNumbers(Math.ceil(data.length / totalElemnts));
    if (filterEventsData.length === 0)
      setFilterEventsData(data.slice(0, totalElemnts));
  }, [events]);

  const filterHandler = ({ i }: any) => {
    setFilter(i);
    setFilterEventsData(
      eventsData.slice(i * totalElemnts - totalElemnts, i * totalElemnts)
    );
  };

  const previousFilterHandler = ({ i }: any) => {
    const nfilter = filter - 1;
    if (nfilter === 0) return;

    setFilterEventsData(
      eventsData.slice(
        nfilter * totalElemnts - totalElemnts,
        nfilter * totalElemnts
      )
    );
    setFilter(nfilter);
  };

  const nextFilterHandler = () => {
    const nfilter = filter + 1;
    if (filterNumbers < nfilter) return;

    setFilterEventsData(
      eventsData.slice(
        nfilter * totalElemnts - totalElemnts,
        nfilter * totalElemnts
      )
    );
    setFilter(nfilter);
  };

  return (
    <div className="overflow-hidden bg-[#360712] border-2 border-white/40 sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl leading-6 text-white">All Commissions</h3>
          {eventsIsLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-slate-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="white"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 px-4 sm:px-6"></div>

      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-[#660e22] px-4 py-5 border-b-2 hidden sm:grid sm:grid-cols-7 sm:gap-6 sm:px-6">
            <dt className="text-[16px] text-white text-center">#</dt>
            <dt className="text-[16px] text-white text-center">ID</dt>
            <dt className="text-[16px] text-white text-center">Type</dt>
            <dt className="text-[16px] text-white text-center">Description</dt>
            <dd className="text-[16px] text-white text-center">Amount</dd>
            <dd className="text-[16px] text-white text-center">Date</dd>
            <dd className="text-[16px] text-white text-center">Hash</dd>
          </div>

          <div className="bg-[#360712] h-[450px] overflow-y-scroll">
            {filterEventsData.map((event: any, index: any) => {
              if (event.eventName === "_uplineMemberRef") {
                return (
                  <div
                    key={index}
                    className="bg-[#360712] px-4 py-3 border-b-2 sm:grid items-center sm:grid-cols-7 sm:gap-6 sm:px-6"
                  >
                    <dt className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        #
                      </span>{" "}
                      {event.counter}
                    </dt>

                    <dt className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        ID :
                      </span>{" "}
                      {String(event?.data?._id)}
                    </dt>

                    <dd className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        Name :
                      </span>{" "}
                      Member
                    </dd>

                    <dd className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        Game :
                      </span>{" "}
                      {String(event?.data?._plan) === "0"
                        ? "Standard"
                        : "Premium"}
                    </dd>

                    <dd className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        Amount :
                      </span>{" "}
                      {Number(
                        formatEther(String(event?.data?._amount))
                      ).toLocaleString("en-US")}
                    </dd>

                    <dd className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        Date :
                      </span>{" "}
                      {(
                        new Date(
                          Number(String(event?.data?.timestamp)) * 1000
                        ) || 0
                      ).toLocaleString("en-US")}
                    </dd>

                    <dd className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        Plan :
                      </span>{" "}
                      {String(event?.transaction?.transactionHash)?.slice(0, 5)}
                      ...
                      {String(event?.transaction?.transactionHash)?.slice(-4)}
                      <div className="flex mt-2 justify-center font-medium text-slate-900">
                        <span className="mr-2 cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="white"
                            className="w-5 h-5"
                            onClick={() =>
                              copyAddress({
                                hash: event?.transaction?.transactionHash,
                              })
                            }
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                            />
                          </svg>
                        </span>
                        <Link
                          href={`https://mumbai.polygonscan.com/tx/${event?.transaction?.transactionHash}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="white"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                            />
                          </svg>
                        </Link>
                      </div>
                    </dd>
                  </div>
                );
              }

              if (event.eventName === "_uplinePicksRef") {
                return (
                  <div
                    key={index}
                    className="bg-[#360712] px-4 py-3 border-b-2 sm:grid items-center sm:grid-cols-7 sm:gap-6 sm:px-6"
                  >
                    <dt className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        List # :
                      </span>{" "}
                      {event.counter}
                    </dt>

                    <dt className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        ID :
                      </span>{" "}
                      {String(event?.data?._id)}
                    </dt>

                    <dd className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        Name :
                      </span>{" "}
                      Pick
                    </dd>

                    <dd className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        Game :
                      </span>{" "}
                      {Game[Number(String(event?.data?._game))]?.name}
                    </dd>

                    <dd className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        Amount :
                      </span>{" "}
                      {Number(
                        formatEther(String(event?.data?._amount))
                      ).toLocaleString("en-US")}
                    </dd>

                    <dd className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        Date :
                      </span>{" "}
                      {(
                        new Date(
                          Number(String(event?.data?.timestamp)) * 1000
                        ) || 0
                      ).toLocaleString("en-US")}
                    </dd>

                    <dd className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        Plan :
                      </span>{" "}
                      {String(event?.transaction?.transactionHash)?.slice(0, 5)}
                      ...
                      {String(event?.transaction?.transactionHash)?.slice(-4)}
                      <div className="flex mt-2 justify-center font-medium text-slate-900">
                        <span className="mr-2 cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="white"
                            className="w-5 h-5"
                            onClick={() =>
                              copyAddress({
                                hash: event?.transaction?.transactionHash,
                              })
                            }
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                            />
                          </svg>
                        </span>
                        <Link
                          href={`https://mumbai.polygonscan.com/tx/${event?.transaction?.transactionHash}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="white"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                            />
                          </svg>
                        </Link>
                      </div>
                    </dd>
                  </div>
                );
              }

              if (event.eventName === "_uplinePrizesRef") {
                return (
                  <div
                    key={index}
                    className="bg-[#360712]px-4 py-3 border-b-2 sm:grid items-center sm:grid-cols-7 sm:gap-6 sm:px-6"
                  >
                    <dt className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        List # :
                      </span>{" "}
                      {event.counter}
                    </dt>

                    <dt className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        ID :
                      </span>{" "}
                      {String(event?.data?._id)}
                    </dt>

                    <dd className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        Name :
                      </span>{" "}
                      Prize
                    </dd>

                    <dd className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        Game :
                      </span>{" "}
                      {Game[Number(String(event?.data?._game))]?.name}
                    </dd>

                    <dd className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        Amount :
                      </span>{" "}
                      {Number(
                        formatEther(String(event?.data?._amount))
                      ).toLocaleString("en-US")}
                    </dd>

                    <dd className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        Date :
                      </span>{" "}
                      {(
                        new Date(
                          Number(String(event?.data?.timestamp)) * 1000
                        ) || 0
                      ).toLocaleString("en-US")}
                    </dd>

                    <dd className="text-sm text-white text-center">
                      <span className="inline-flex sm:hidden text-sm font-medium text-gray-500">
                        Plan :
                      </span>{" "}
                      {String(event?.transaction?.transactionHash)?.slice(0, 5)}
                      ...
                      {String(event?.transaction?.transactionHash)?.slice(-4)}
                      <div className="flex mt-2 justify-center font-medium text-slate-900">
                        <span className="mr-2 cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="white"
                            className="w-5 h-5"
                            onClick={() =>
                              copyAddress({
                                hash: event?.transaction?.transactionHash,
                              })
                            }
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                            />
                          </svg>
                        </span>
                        <Link
                          href={`https://mumbai.polygonscan.com/tx/${event?.transaction?.transactionHash}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="white"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                            />
                          </svg>
                        </Link>
                      </div>
                    </dd>
                  </div>
                );
              }
            })}

            {filterEventsData?.length === 0 ? (
              <div className="bg-gray-50 px-4 py-5 border-b-2 sm:px-6">
                <p className="text-center">No Commissions</p>
              </div>
            ) : null}
          </div>
        </dl>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
        <div className="flex flex-1 items-center justify-between">
          <div></div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-lg shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={previousFilterHandler}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:opacity-50 focus:z-20 focus:outline-offset-0"
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
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 hover:opacity-50 focus:z-20 focus:outline-offset-0"
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
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 hover:opacity-50 focus:z-20 focus:outline-offset-0"
                    >
                      {pageNumber}
                    </button>
                  );
                }
                return null;
              })}
              <button
                onClick={nextFilterHandler}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:opacity-50 focus:z-20 focus:outline-offset-0"
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
};

export default AllCommisions;
