import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useMemo, useState } from "react";
import { LuckyMeAddress } from "../../lib/contract";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const DirectReferralsInformation = ({ userId }: { userId: any }) => {
  const [SearchQuery, setSearchQuery] = useState();

  const { contract } = useContract(LuckyMeAddress);
  const { data, isLoading } = useContractRead(contract, "userDetail", userId);
  const { data: searchUser, isLoading: isLoadingSearchUser } = useContractRead(
    contract,
    "UserId",
    SearchQuery
  );

  const handleOnChange = (e: any) => {
    var searchQuery = e.target.value;
    setSearchQuery(searchQuery);
  };

  const [CompGames, setCompGames] = useState<any>([]);
  const [filterEventsData, setFilterEventsData] = useState<any>([]);
  const [filterNumbers, setFilterNumbers] = useState(0);
  const [filter, setFilter] = useState(1);
  const totalElemnts = 10;
  useMemo(() => {
    if (!data) return;
    setCompGames(data?.AllRef);
    setFilterNumbers(Math.ceil(data?.AllRef.length / totalElemnts));
    if (filterEventsData.length === 0)
      setFilterEventsData(data?.AllRef.slice(0, totalElemnts));
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
        <div className="flex justify-between items-center">
          <h3 className="text-xl leading-6 text-white">
            Direct Referrals Information
          </h3>

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
          ) : (
            <div className="flex items-center justify-between">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 "
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  onChange={() => handleOnChange}
                  className="block p-2 pl-10 text-sm border border-gray-300 rounded-lg w-80 "
                  placeholder="Search for users"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 px-4 sm:px-6"></div>

      <div className="border-t border-white/40">
        <dl>
          <div className="bg-[#660e22] px-4 py-5 border-b-2 hidden sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-[16px] text-white">Date</dt>
            <dt className="text-[16px] text-white">ID</dt>
            <dd className="mt-1 text-[16px] text-white sm:mt-0">Wallet</dd>
            <dd className="mt-1 text-[16px] text-white sm:mt-0">Plan</dd>
          </div>

          <div className="h-[432px] overflow-y-scroll ">
            {searchUser ? (
              isLoadingSearchUser ? (
                <span className="flex items-center justify-center">
                  Searching
                  <svg
                    className="animate-spin h-5 w-5 text-white ml-4"
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
                </span>
              ) : (
                <UserRefItem refId={searchUser} />
              )
            ) : (
              filterEventsData.map((refId: any, i: number) => (
                <UserRefItem key={i} refId={refId} />
              ))
            )}
            {/* // filterEventsData.map((refId: any, i: number) => <UserRefItem key={i} refId={refId} />) */}

            {data?.AllRef.length === 0 ? (
              <div className=" px-4 py-5 border-b-2 sm:px-6">
                <p className="text-center">You do not have Direct Referrals</p>
              </div>
            ) : null}
          </div>
        </dl>
      </div>

      <div className="flex items-center justify-between border-t border-white/40 px-4 py-3 sm:px-6">
        <div className="flex flex-1 items-center justify-between">
          <div></div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
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

function UserRefItem({ refId }: { refId: any }) {
  const { contract } = useContract(LuckyMeAddress);
  const { data, isLoading } = useContractRead(contract, "User", String(refId));

  if (isLoading)
    return (
      <div className=" px-4 py-3 border-t-2 sm:grid items-center sm:grid-cols-4 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-white">
          <span className="inline-flex sm:hidden text-sm font-medium text-white">
            Date :
          </span>{" "}
          0/0/0000, 0:00:00 AM
        </dt>
        <dt className="text-sm font-medium text-white">
          <span className="inline-flex sm:hidden text-sm font-medium text-white">
            ID :
          </span>{" "}
          0
        </dt>
        <dd className="mt-1 text-sm text-white sm:mt-0">
          <span className="inline-flex sm:hidden text-sm font-medium text-white">
            Wallet :
          </span>{" "}
          0x0000...000000
        </dd>
        <dd className="mt-1 text-sm text-white sm:mt-0">
          <span className="inline-flex sm:hidden text-sm font-medium text-white">
            Plan :
          </span>{" "}
          Member
        </dd>
      </div>
    );

  return (
    <div className=" px-4 py-3 border-b-2 sm:grid items-center sm:grid-cols-4 sm:gap-4 sm:px-6">
      <dt className="text-sm text-white">
        <span className="inline-flex sm:hidden text-sm font-medium text-white">
          Date :
        </span>{" "}
        {(
          new Date(Number(String(data?.registerAt)) * 1000) || 0
        ).toLocaleString("en-US")}
      </dt>
      <dt className="mt-1 text-sm text-white">
        <span className="inline-flex sm:hidden text-sm font-medium text-white">
          ID :
        </span>{" "}
        {String(data?.Id)}
      </dt>
      <dd className="mt-1 text-sm text-white">
        <span className="inline-flex sm:hidden text-sm font-medium text-white">
          Wallet :
        </span>{" "}
        {String(data?.Address).slice(0, 6)}...
        {String(data?.Address).slice(-6)}
      </dd>
      <dd className="mt-1 text-sm text-white">
        <span className="inline-flex sm:hidden text-sm font-medium text-white">
          Plan :
        </span>{" "}
        {String(data?.Plan) == "0" ? "Standard" : "Premium"}
      </dd>
    </div>
  );
}

export default DirectReferralsInformation;
