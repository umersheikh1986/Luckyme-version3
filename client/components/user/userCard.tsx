import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { formatEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { classNames } from "../../lib/classNames";
import { LuckyMeAddress } from "../../lib/contract";
import Renew from "./renew";
import Upgrade from "./upgrade";
import CopyToClipboardButton from "../ui/copyToClipboardButton";
import Image from "next/image";

const UserCard = ({ userId, mode }: { userId: any; mode?: string }) => {
  const address = useAddress();
  const [open, setOpen] = useState(false);
  const [upgrade, setUpgrade] = useState(false);
  const [totalRefrerrs, setTotalRefrerrs] = useState<Number>(0);
  const { contract } = useContract(LuckyMeAddress);
  const { data, isLoading } = useContractRead(
    contract,
    "userDetail",
    String(userId)
  );
  const { data: isUserExists } = useContractRead(
    contract,
    "isUserExists",
    address
  );

  const referralLink = `https://luckyme.club/r/${String(userId)}`;

  const { data: userTotalRefrerrs } = useContractRead(
    contract,
    "userTotalRefrerrs",
    String(userId)
  );
  var ref1 = String(userTotalRefrerrs?.memberLevels[0] || 0);
  var ref2 = String(userTotalRefrerrs?.partnersLevels[0] || 0);

  var totalRefers = Number(ref1) + Number(ref2);

  var totalEarning =
    Number(String(data?.TotalPrizesAmount || 0)) +
    Number(String(data?.TotalPicksRewards || 0)) +
    Number(String(data?.TotalPrizesRewards || 0)) +
    Number(String(data?.TotalReferralRewards || 0));

  const userReferrals = () => {
    var total = 0;

    for (let i = 0; i < 5; i++) {
      const element1 = userTotalRefrerrs.memberLevels[i];
      const element2 = userTotalRefrerrs.partnersLevels[i];

      total += Number(String(element1 || 0));
      total += Number(String(element2 || 0));
    }

    setTotalRefrerrs(total);
  };

  useEffect(() => {
    if (userTotalRefrerrs) {
      userReferrals();
    }
  }, [userTotalRefrerrs, address, data]);

  if (!isUserExists && mode !== "view")
    return (
      <div className="relative isolate overflow-hidden bg-[#360712] py-2.5 px-6 sm:px-3.5">
        <svg
          viewBox="0 0 577 310"
          aria-hidden="true"
          className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 w-[36.0625rem] -translate-y-1/2 transform-gpu blur-2xl"
        >
          <path
            id="1d77c128-3ec1-4660-a7f6-26c7006705ad"
            fill="url(#49a52b64-16c6-4eb9-931b-8e24bf34e053)"
            fillOpacity=".3"
            d="m142.787 168.697-75.331 62.132L.016 88.702l142.771 79.995 135.671-111.9c-16.495 64.083-23.088 173.257 82.496 97.291C492.935 59.13 494.936-54.366 549.339 30.385c43.523 67.8 24.892 159.548 10.136 196.946l-128.493-95.28-36.628 177.599-251.567-140.953Z"
          />
          <defs>
            <linearGradient
              id="49a52b64-16c6-4eb9-931b-8e24bf34e053"
              x1="614.778"
              x2="-42.453"
              y1="26.617"
              y2="96.115"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ff3f4b" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          viewBox="0 0 577 310"
          aria-hidden="true"
          className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 w-[36.0625rem] -translate-y-1/2 transform-gpu blur-2xl"
        >
          <use href="#1d77c128-3ec1-4660-a7f6-26c7006705ad" />
        </svg>
        <div className="text-center gap-y-2 gap-x-4">
          <p className="text-[20px] text-white">
            <span>Not registered</span>
            <svg
              viewBox="0 0 2 2"
              className="mx-2 inline h-0.5 w-0.5 fill-current"
              aria-hidden="true"
            >
              <circle cx={1} cy={1} r={1} />
            </svg>
            Please grab your ref link and register yourself.
          </p>
        </div>
      </div>
    );

  return (
    <>
      <div
        className={classNames(
          isLoading ? "animate-pulse" : "animate-none",
          "pointer-events-auto rounded-lg bg-[#360712] border-2 border-white/40 p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/75 ring-1 ring-slate-700/10"
        )}
      >
        <div className="text-lg font-medium text-center text-white">
          ID {String(data?.Id || 0)}
        </div>

        <div className="mt-1 font-medium text-center text-white flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>

          <p className="text-lg">{String(totalRefers)}</p>
        </div>

        <div className="mt-1 font-medium text-center text-white flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            />
          </svg>

          <p className="text-lg">{String(totalRefrerrs)}</p>
        </div>

        <div className="mt-1 font-medium text-center text-white text-lg">
          Membership :{" "}
          {String(data?.Plan || 0) === "0" ? "Standard" : "Premium"}
        </div>

        <div className="mt-1 font-medium text-center text-white text-lg">
          Total Earnings :{" "}
          {Number(formatEther(String(totalEarning || 0))).toLocaleString(
            "en-US"
          )}
          <Image
            className="w-[16px]  ml-1 inline-block"
            width={500}
            height={500}
            src="/Dai.png"
            alt="Dai"
          />
        </div>

        {!isLoading ? (
          <div className="mt-1 font-medium text-center text-white text-lg">
            Registration Date :{" "}
            {(
              new Date(Number(String(data?.registerAt || 0)) * 1000) || 0
            ).toLocaleString("en-US")}
          </div>
        ) : null}
      </div>

      <div
        className={classNames(
          isLoading ? "animate-pulse" : "animate-none",
          "pointer-events-auto mt-3 rounded-lg bg-[#360712] border-2 border-white/40 p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-1 ring-slate-700/10"
        )}
      >
        <div className="flex justify-between font-medium text-white">
          <span className="mr-2 text-lg">Prizes Won</span>
          <span className="flex">
            <Image
              className="w-[20px] h-[20px] mr-1"
              width={500}
              height={500}
              src="/Dai.png"
              alt="Dai"
            />
            <p className="text-lg">
              {Number(
                formatEther(String(data?.TotalPrizesAmount || 0))
              ).toLocaleString("en-US")}
            </p>
          </span>
        </div>

        <div className="flex mt-2 justify-between font-medium text-white">
          <span className="mr-2 text-lg">Games Picks Rewards</span>
          <span className="flex">
            <Image
              className="w-[20px] h-[20px] mr-1"
              width={500}
              height={500}
              src="/Dai.png"
              alt="Dai"
            />
            <p className="text-lg">
              {Number(
                formatEther(String(data?.TotalPicksRewards || 0))
              ).toLocaleString("en-US")}
            </p>
          </span>
        </div>

        <div className="flex mt-2 justify-between font-medium text-white">
          <span className="mr-2 text-lg">Prizes Rewards</span>
          <span className="flex">
            <Image
              className="w-[20px] h-[20px] mr-1"
              width={500}
              height={500}
              src="/Dai.png"
              alt="Dai"
            />
            <p className="text-lg">
              {Number(
                formatEther(String(data?.TotalPrizesRewards || 0))
              ).toLocaleString("en-US")}
            </p>
          </span>
        </div>

        <div className="flex mt-2 justify-between font-medium text-white">
          <span className="mr-2 text-lg">Membership Rewards</span>
          <span className="flex">
            <Image
              className="w-[20px] h-[20px] mr-1"
              width={500}
              height={500}
              src="/Dai.png"
              alt="Dai"
            />
            <p className="text-lg">
              {Number(
                formatEther(String(data?.TotalReferralRewards || 0))
              ).toLocaleString("en-US")}
            </p>
          </span>
        </div>
      </div>

      <div
        className={classNames(
          isLoading ? "animate-pulse" : "animate-none",
          "pointer-events-auto mt-3 rounded-lg bg-[#360712] border-2 border-white/40 text-white p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-1 ring-slate-700/10"
        )}
      >
        <p className="text-center text-lg">Affiliate Link</p>
        <p className="text-center text-sm">{referralLink}</p>
        <div className="flex mt-2 justify-center font-medium text-white">
          <CopyToClipboardButton text={referralLink} />
        </div>
      </div>

      {mode !== "view" ? (
        <div
          className={classNames(
            isLoading ? "animate-pulse" : "animate-none",
            "pointer-events-auto rounded-lg mt-3 bg-[#360712] border-2 border-white/40 p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-1 ring-slate-700/10"
          )}
        >
          <div className="mt-2 text-center text-[18px] text-white">
            Renewal Date{" "}
            {(
              new Date(Number(String(data?.TimeToRenew || 0)) * 1000) || 0
            ).toLocaleString("en-US")}
          </div>
          <button
            className="mt-3 block w-full rounded-lg bg-[#360712] border-2 border-white/40 px-3 py-2 text-lg text-white"
            onClick={() => setOpen(true)}
          >
            Renew Now
          </button>

          {String(data?.Plan || 0) === "0" ? (
            <button
              className="mt-3 block w-full rounded-lg bg-[#360712] border-2 border-white/40 px-3 py-2 text-lg text-white"
              onClick={() => setUpgrade(true)}
            >
              Upgrade Plan
            </button>
          ) : null}

          <Renew open={open} setOpen={setOpen} data={data} />
          <Upgrade open={upgrade} setOpen={setUpgrade} data={data} />
        </div>
      ) : null}

      <div
        className={classNames(
          isLoading ? "animate-pulse" : "animate-none",
          "pointer-events-auto mt-3 rounded-lg bg-[#360712] border-2 border-white/40 text-white p-4  text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-1 ring-slate-700/10"
        )}
      >
        <div className="mb-2">
          <p className="text-center text-lg">Smart Contract</p>
          <p className="text-center text-[15px]">0x6d62 . . . 79497f</p>
          <div className="flex mt-2  justify-center font-medium text-white">
            <CopyToClipboardButton text={String(LuckyMeAddress)} />

            <a
              href={`https://holesky.etherscan.io//address/${LuckyMeAddress}`}
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 ml-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-2">
          <p className="text-center text-lg">Wallet Address</p>
          <p className="text-center text-sm">
            {data?.Address?.slice(0, 5)} . . . {data?.Address?.slice(-4)}
          </p>
          <div className="flex mt-2  justify-center font-medium text-white">
            <CopyToClipboardButton text={String(data?.Address)} />

            <a
              href={`https://holesky.etherscan.io/address/${data?.Address}`}
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 ml-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
