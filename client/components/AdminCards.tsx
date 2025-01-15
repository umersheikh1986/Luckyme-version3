import { useContract, useContractRead } from "@thirdweb-dev/react";
import { LuckyMeAddress ,LuckyMeAbi} from "../lib/contract";
import { formatEther } from "ethers/lib/utils";

const AdminCards = () => {
  const { contract, error: contractError } = useContract(LuckyMeAddress, LuckyMeAbi);
  

  const { data: Members, isLoading: MembersIsLoading } = useContractRead(
    contract,
    "Members",
  );
  const { data: Partners, isLoading: PartnersIsLoading } = useContractRead(
    contract,
    "Partners"
  );
  const { data: TotalRewardsPaid, isLoading: TotalRewardsPaidIsLoading } =
    useContractRead(contract, "TotalRewardsPaid");
    console.log(String(TotalRewardsPaid), "TotalRewardsPaid");
  const { data: TotalPicksAmount, isLoading: TotalPicksAmountIsLoading } =
    useContractRead(contract, "TotalPicksAmount");
  console.log(String(TotalPicksAmount), "TotalPicksAmount>>");
  
  if (contractError) {
    // console.error("Contract initialization error:", contractError);
    return <div>Error initializing contract</div>;
  }

  return (
    <div className="col-span-3 grid grid-cols-2 gap-4 px-2 sm:grid-cols-4 sm:gap-8 sm:px-0">
      <div className="pointer-events-auto h-full bg-[#360712] border-2 border-white/40 rounded-lg p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
        <div className="flex justify-center">
          <div className="text-[20px] text-white text-center">
            Standard Membership
          </div>
          {MembersIsLoading && (
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
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </div>
        <div className="mt-6 text-[20px] text-white text-center">
          {String(Members || 0)}
        </div>
      </div>

      <div className="pointer-events-auto h-full bg-[#360712] border-2 border-white/40 rounded-lg p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
        <div className="flex justify-center">
          <div className="text-[20px] text-white text-center">
            Premium Membership
          </div>
          {PartnersIsLoading && (
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
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </div>
        <div className="mt-6 text-[20px] text-white text-center">
          {String(Partners || 0)}
        </div>
      </div>

      <div className="pointer-events-auto h-full bg-[#360712] border-2 border-white/40 rounded-lg p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
        <div className="flex justify-center">
          <div className="text-[20px] text-white text-center">
            Total Memberships
          </div>
          {PartnersIsLoading && (
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
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </div>
        <div className="mt-6 text-[20px] text-white text-center">
          {Number(String(Members || 0)) + Number(String(Partners || 0))}
        </div>
      </div>

      <div className="pointer-events-auto h-full bg-[#360712] border-2 border-white/40 rounded-lg p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
        <div className="flex justify-center">
          <div className="text-[20px] text-white text-center">
            Total Purchased Ticket Amount
          </div>
          {TotalPicksAmountIsLoading && (
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
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </div>
        <div className="mt-6 text-[20px] text-white text-center">
          {Number(formatEther(String(TotalPicksAmount || 0))).toLocaleString(
            "en-US"
          )}{" "}
          DAI
        </div>
      </div>
    </div>
  );
};

export default AdminCards;
