import { useState } from "react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { formatEther } from "ethers/lib/utils";
import { classNames } from "../../lib/classNames";
import { LuckyMeAddress } from "../../lib/contract";
import TotalParticipatesBar from "./components/totalParticipatesBar";
import GameDetailsCard from "./gameDetailsCard";
import Image from "next/image";

const GameCard = ({
  name,
  Id,
  mode,
  userId,
  tAmount,
}: {
  name: string;
  Id: number;
  userId: string;
  mode?: string;
  tAmount: string;
}) => {
  const [open, setOpen] = useState(false);
  const { contract } = useContract(LuckyMeAddress);
  const { data, isLoading }: { data: any; isLoading: Boolean } =
    useContractRead(contract, "currentGameDetail", Id);

  const { data: UserInGame } = useContractRead(
    contract,
    "currentUserInGame",
    Id,
    userId
  );

  if (isLoading)
    return (
      <div className="pointer-events-auto cursor-pointer rounded-lg bg-[#360712] p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-2 ring-slate-700">
        <div className="flex justify-between">
          <div className="font-medium text-white">Lottery Number 0</div>
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
        </div>
        <div className="mb-6 font-medium text-white">Entry Fee 0</div>
        <TotalParticipatesBar data={null} />
        <div className="mt-6 font-medium text-white">Total Prize Amount 0</div>
      </div>
    );

  return (
    <div
      onClick={() => setOpen(true)}
      className={classNames(
        UserInGame
          ? "ring-amber-500"
          : String(data?.AllNumbers.length || 0) !== "0"
          ? "ring-green-700"
          : "ring-white/40",
        "pointer-events-auto cursor-pointer rounded-lg bg-[#360712] text-[0.8125rem] leading-5 ring-2"
      )}
    >
      <div className="flex mb-2 justify-between rounded-t-lg py-2 bg-[#660e22]">
        <div className="font-medium text-center w-full text-white text-lg flex justify-center items-center">
          {name}
          {UserInGame ? (
            <svg className="h-5 w-5 flex-none ml-3" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
                fill="#f59e0b"
              ></path>
            </svg>
          ) : String(data?.AllNumbers.length || 0) !== "0" ? (
            <svg className="h-5 w-5 flex-none ml-3" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
                fill="green"
              ></path>
            </svg>
          ) : null}
        </div>
      </div>

      <div className=" text-center font-medium text-white text-lg">
        Game {Number(String(data?.Id || 0)) + 1}
      </div>

      <div className="mb-6 text-center font-medium text-white text-lg">
        Entry Fee{" "}
        {Number(formatEther(String(data?.EntryFee || 0))).toLocaleString(
          "en-US"
        )}
        <Image
          className="w-[16px] h-[16px] ml-1 inline-flex"
          width={500}
          height={500}
          src="/Dai.png"
          alt="Dai"
        />
      </div>
      <div className=" justify-between py-2 px-4 bg-[#660e22]">
        <TotalParticipatesBar data={data} />
      </div>

      <div className="mb-2 mt-2 text-center font-medium text-white text-lg">
        Prizes{" "}
        {(
          (Number(formatEther(String(data?.EntryFee || 0))) * 100 * 70) /
          100
        ).toLocaleString("en-US")}
      </div>

      {open && mode !== "view" ? (
        <GameDetailsCard
          name={name}
          open={open}
          setOpen={setOpen}
          data={data}
          Id={Id}
          userId={userId}
          tAmount={tAmount}
        />
      ) : null}
    </div>
  );
};

export default GameCard;
