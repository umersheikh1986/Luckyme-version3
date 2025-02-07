import {
  useContract,
  useContractEvents,
  useContractRead,
} from "@thirdweb-dev/react";
import { formatEther } from "ethers/lib/utils";
import { LuckyMeAddress } from "../lib/contract";

const PlatformCard = () => {
  const { contract } = useContract(LuckyMeAddress);
  const { data: UsersIds, isLoading } = useContractRead(contract, "UsersIds");

  return (
    <div className="col-span-3 grid grid-cols-2 gap-4 px-2 sm:grid-cols-4 sm:gap-8 sm:px-0">
      <div className="pointer-events-auto h-full bg-[#360712] border-2 border-white/40 rounded-lg p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
        <div className="text-lg text-white text-center">ALL PARTICIPANTS</div>
        <div className="mt-3 text-lg text-white text-center">
          {String(UsersIds || 0)}
        </div>
      </div>

      <JOINEDLAST24HOURS />

      <LuckyDraws />

      <TotalRewardsPaid />
    </div>
  );
};

function LuckyDraws() {
  const { contract } = useContract(LuckyMeAddress);
  const { data: game1 } = useContractRead(contract, "GameIds", 0);
  const { data: game2 } = useContractRead(contract, "GameIds", 1);
  const { data: game3 } = useContractRead(contract, "GameIds", 2);
  const { data: game4 } = useContractRead(contract, "GameIds", 3);
  const { data: game5 } = useContractRead(contract, "GameIds", 4);
  const { data: game6 } = useContractRead(contract, "GameIds", 5);
  const { data: game7, isLoading } = useContractRead(contract, "GameIds", 6);

  return (
    <>
      <div className="pointer-events-auto h-full bg-[#360712] border-2 border-white/40 rounded-lg p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
        <div className="text-lg text-white text-center">GAMES COMPLETED</div>
        <div className="mt-3 text-lg text-white text-center">
          {Number(String(game1 || 0)) +
            Number(String(game2 || 0)) +
            Number(String(game3 || 0)) +
            Number(String(game4 || 0)) +
            Number(String(game5 || 0)) +
            Number(String(game6 || 0)) +
            Number(String(game7 || 0))}
        </div>
      </div>
    </>
  );
}

function TotalRewardsPaid() {
  const { contract } = useContract(LuckyMeAddress);
  const { data, isLoading } = useContractRead(contract, "TotalRewardsPaid");

  return (
    <>
      <div className="pointer-events-auto h-full bg-[#360712] border-2 border-white/40 rounded-lg p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
        <div className="text-lg text-white text-center">
          PARTICIPANTS EARNINGS
        </div>
        <div className="mt-3 text-lg text-white text-center">
          {Number(
            String(
              Number(formatEther(String(data?.Prize || 0))) +
                Number(formatEther(String(data?.PicksRef || 0))) +
                Number(formatEther(String(data?.PrizesRef || 0))) +
                Number(formatEther(String(data?.MemberRef || 0)))
            )
          ).toLocaleString("en-US")}{" "}
          GENTOP
        </div>
      </div>

      <div className="pointer-events-auto h-full bg-[#360712] border-2 border-white/40 rounded-lg p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
        <div className="text-lg text-white text-center">PRIZES WON</div>
        <div className="mt-3 text-lg text-white text-center">
          {Number(formatEther(String(data?.Prize || 0))).toLocaleString(
            "en-US"
          )}
          {""} GENTOP
        </div>
      </div>

      <div className="pointer-events-auto h-full bg-[#360712] border-2 border-white/40 rounded-lg p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
        <div className="text-lg text-white text-center">
          GAMES PICKS REWARDS
        </div>
        <div className="mt-3 text-lg text-white text-center">
          {Number(formatEther(String(data?.PicksRef || 0))).toLocaleString(
            "en-US"
          )}{" "}
          GENTOP
        </div>
      </div>

      {/* <div className="pointer-events-auto h-full bg-[#360712] border-2 border-white/40 rounded-lg p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
        <div className="text-lg text-white text-center">PRIZES REWARDS</div>
        <div className="mt-3 text-lg text-white text-center">
          {Number(formatEther(String(data?.PrizesRef || 0))).toLocaleString(
            "en-US"
          )}{" "}
          GENTOP
        </div>
      </div> */}

      <div className="pointer-events-auto h-full bg-[#360712] border-2 border-white/40 rounded-lg p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
        <div className="text-lg text-white  text-center">
          MEMBERSHIP REWARDS
        </div>
        <div className="mt-3 text-lg text-white  text-center">
          {Number(formatEther(String(data?.MemberRef || 0))).toLocaleString(
            "en-US"
          )}{" "}
          GENTOP
        </div>
      </div>
    </>
  );
}

function JOINEDLAST24HOURS() {
  let counter = 0;
  const { contract } = useContract(LuckyMeAddress);
  const { data, isLoading, error } = useContractEvents(
    contract,
    "_registered" // Event name being emitted by your smart contract
  );

  if (isLoading || !data)
    return (
      <div className="pointer-events-auto h-full bg-[#360712] border-2 border-white/40 rounded-lg p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
        <div className="text-lg text-white text-center">
          JOINED LAST 24 HOURS
        </div>
        <div className="mt-3 text-lg text-white text-center">{counter}</div>
      </div>
    );

  for (let index = 0; index < data.length; index++) {
    const timestamp = String(data[index].data.timestamp);

    const date = new Date(timestamp);
    const hours = date.getHours();

    if (hours >= 0 && hours < 24) {
      counter++;
      console.log("This is Counter", counter);
    } else {
      break;
    }
  }

  return (
    <div className="pointer-events-auto h-full bg-[#360712] border-2 border-white/40 rounded-lg p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
      <div className="text-lg text-white text-center">JOINED LAST 24 HOURS</div>
      <div className="mt-3 text-lg text-white text-center">{counter}</div>
    </div>
  );
}

export default PlatformCard;
