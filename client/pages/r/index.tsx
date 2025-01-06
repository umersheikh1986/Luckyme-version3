import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import Link from "next/link";
import { LuckyMeAddress } from "../../lib/contract";
import { useContractWrite } from "@thirdweb-dev/react";
import { formatEther, parseEther } from "ethers/lib/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { classNames } from "../../lib/classNames";
import { DaiAbi, DaiAddress } from "../../lib/contract";
import Image from "next/image";

const Index = ({ id }: { id?: any }) => {
  const address = useAddress();
  const { contract } = useContract(LuckyMeAddress);
  const { data, isLoading } = useContractRead(contract, "userDetail", address);

  return (
    <main className="mx-auto max-w-[500px] px-4 grid items-center py-8 sm:px-6 lg:px-8">
      {address === undefined ? (
        <ConnectWallet className="!bg-[#660e22] !border-2 !border-white/40" />
      ) : (
        <div className="px-8 py-4 w-full rounded-lg mx-auto bg-[#660e22] border-2 border-white/40">
          {String(data?.Id || 0) !== "0" ? (
            <div>
              <p className="mt-3 text-center text-lg tracking-tight text-white">
                You are already registered please go to dashboard.
              </p>
              <Link
                className="group items-center justify-center block w-full text-center mt-3 rounded-full py-3 px-10 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
                href="/dashboard"
              >
                Dashboard
              </Link>
            </div>
          ) : (
            <UserRegisterThroughLink href="/dashboard" />
          )}
        </div>
      )}
    </main>
  );
};

const UserRegisterThroughLink = ({ href }: { href?: string }) => {
  const router = useRouter();
  const address = useAddress();
  const [id, setId] = useState<number>();
  const [selectedOption, setSelectedOption] = useState("10.0");

  //    contracts
  const { contract: daiContract } = useContract(DaiAddress, DaiAbi);
  const { contract: LuckyMeContract } = useContract(LuckyMeAddress);

  //    Read functions
  const { data: balance, isLoading: balanceIsLoading } = useContractRead(
    daiContract,
    "balanceOf",
    address
  );
  const { data: allowance, isLoading: allowanceIsLoading } = useContractRead(
    daiContract,
    "allowance",
    address,
    LuckyMeAddress
  );

  //    Write functions
  const { mutateAsync: approve, isLoading: approveIsLoading } =
    useContractWrite(daiContract, "approve");
  const callApprove = async () => {
    try {
      const data = await approve([LuckyMeAddress, parseEther(selectedOption)]);
      console.info("contract call success", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const { mutateAsync: register, isLoading: registerIsLoading } =
    useContractWrite(LuckyMeContract, "register");
  const callRegister = async () => {
    try {
      const data = await register([
        id !== undefined ? id : 1,
        selectedOption === "1.0" ? 0 : 1,
        address,
      ]);
      console.info("contract call success", data);
      if (href !== undefined) router.push(href);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const handleOnChange = (e: any) => {
    const link = e.target.value;

    // Match any sequence of digits (\d+) in the link's path (/products/1234/details)
    const regex = /\/r\/(\d+)/;

    // Extract the number from the link using the regex match method
    const match = link.match(regex);

    if (match) {
      const number = parseInt(match[1], 10);
      setId(number);
      console.log(number);
    } else {
      console.log("No number found in link");
    }
  };

  return (
    <>
      <div className="py-4 w-full rounded-lg mx-auto bg-[#660e22]">
        <div className="flex justify-center">
          <div className="text-lg text-white">BECOME A MEMBER</div>
        </div>

        {id !== undefined ? (
          <div className="mt-3 ml-1 text-white text-center">
            Your Sponsor ID: {id}
          </div>
        ) : null}

        <div className="mt-3 mb-4 col-span-6 sm:col-span-3">
          <label
            htmlFor="country"
            className="ml-1 block text-lg leading-6 text-white text-center"
          >
            Enter Registration Link:
          </label>
          <input
            name="id"
            placeholder="Enter the link"
            onChange={handleOnChange}
            className="mt-1 p-2.5 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
        {id !== undefined && (
          <div>
            <div className="mt-1 mb-6 col-span-6 sm:col-span-3">
              <label
                htmlFor="country"
                className="ml-1 block text-lg leading-6 text-white text-center"
              >
                Select your Membership:
              </label>
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                onChange={(e) => setSelectedOption(e.target.value)}
                className="mt-1 block w-full rounded-md border-0  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              >
                <option value={"10.0"}>Premium 10 DAI</option>
                <option value={"1.0"}>Standard 1 DAI</option>
              </select>
            </div>

            {Number(formatEther(String(allowance || 0))) <
              Number(selectedOption) &&
              Number(formatEther(String(balance || 0))) >=
                Number(selectedOption) && (
                <button
                  className="mb-3 block w-full rounded-lg bg-[#360712] px-3 py-3 text-[16px] text-white shadow-sm hover:opacity-60 border-2 border-white/40"
                  onClick={callApprove}
                >
                  <span className="h-4 w-4 pr-2">
                    {approveIsLoading && (
                      <svg
                        className="animate-spin h-4 w-4 text-white inline-flex"
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
                  Approve{" "}
                  {Number(String(selectedOption || 0)).toLocaleString("en-US")}{" "}
                  DAI
                </button>
              )}

            {Number(formatEther(String(balance || 0))) >=
            Number(selectedOption) ? (
              <button
                className="mt-3 block w-full rounded-lg px-3 py-3 text-[16px] text-white shadow-sm border-2 border-white/40 hover:opacity-60"
                onClick={callRegister}
              >
                <span className="h-4 w-4 pr-2">
                  {registerIsLoading && (
                    <svg
                      className="animate-spin h-4 w-4 text-gray-900 inline-flex "
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
                Register
              </button>
            ) : (
              <div className="ml-1 text-slate-700">
                You do not have balance for Registration
              </div>
            )}
          </div>
        )}
      </div>

      <div
        className={classNames(
          balanceIsLoading ? "animate-pulse" : "animate-none",
          "pointer-events-auto mt-3 rounded-lg  p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 bg-[#360712] ring-1 ring-slate-700/10"
        )}
      >
        <div className="flex justify-between text-[18px] text-white">
          <span>Your Balance</span>
          <span className="flex">
            <Image className="w-[20px] mr-1" src="/Dai.png" alt="Dai" />
            <p>{formatEther(String(balance || 0))}</p>
          </span>
        </div>
      </div>

      <div
        className={classNames(
          allowanceIsLoading ? "animate-pulse" : "animate-none",
          "pointer-events-auto mt-3 rounded-lg  p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 bg-[#360712] ring-1 ring-slate-700/10"
        )}
      >
        <div className="flex justify-between text-[18px] text-white">
          <span>Your Allowance</span>
          <span className="flex">
            <Image className="w-[20px] mr-1" src="/Dai.png" alt="Dai" />
            <p>{formatEther(String(allowance || 0))}</p>
          </span>
        </div>
      </div>
    </>
  );
};

export default Index;
