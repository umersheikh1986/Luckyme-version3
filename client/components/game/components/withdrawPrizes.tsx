import {
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { LuckyMeAddress } from "../../../lib/contract";

export default function WithdrawPrizes({
  Game,
  GameId,
}: {
  Game: any;
  GameId: any;
}) {
  const { contract } = useContract(LuckyMeAddress);
  const { data, isLoading: dataIsLoading } = useContractRead(
    contract,
    "singleGameDetail",
    Game,
    GameId
  );

  const { mutateAsync: withdrawPrizes, isLoading } = useContractWrite(
    contract,
    "withdrawPrizes"
  );

  const call = async () => {
    try {
      const data = await withdrawPrizes([Game, GameId]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  if (dataIsLoading) {
    return (
      <svg
        className="animate-spin h-4 w-4 text-black inline-flex"
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
    );
  }

  if (data?.Withdraw) {
    return (
      <span className="block mt-1 text-sm text-gray-500 sm:mt-0 pl-5">
        Already Withdraw
      </span>
    );
  }

  return (
    <button
      className="block w-full rounded-md bg-white py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      onClick={call}
    >
      <span className="h-4 w-4 pr-2">
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4 text-black inline-flex"
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
      </span>
      Withdraw
    </button>
  );
}
