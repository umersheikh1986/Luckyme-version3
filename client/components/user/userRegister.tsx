import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { formatEther, parseEther } from "ethers/lib/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { classNames } from "../../lib/classNames";
import { DaiAbi, DaiAddress, LuckyMeAddress,LuckyMeAbi } from "../../lib/contract";
import Image from "next/image";

const UserRegister = ({ id, href }: { id?: any; href?: string }) => {
  const router = useRouter();
  const address = useAddress();
  const [selectedOption, setSelectedOption] = useState('1.0');

  //    contracts
  const { contract: daiContract } = useContract(DaiAddress, DaiAbi);
  const { contract: LuckyMeContract } = useContract(LuckyMeAddress ,LuckyMeAbi);

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
      console.log(id,selectedOption,address);
      
      const data1 = await register([
       id,
       selectedOption,
        address,
      ]);
      console.log("Registration successful:", data1);
    } catch (error) {
      console.error("Registration failed:", error);
    }
    
  };

  return (
    <>
      <div className="pointer-events-auto rounded-lg py-4 text-[0.8125rem] leading-5 shadow-black/5  ring-1 ring-slate-700/10">
        <div className="flex justify-center">
          <div className="text-lg font-medium text-white">BECOME A MEMBER</div>
        </div>

        {id !== undefined ? (
          <div className="mt-3 ml-1 font-medium text-white text-center">
            Your Sponsor ID: {id}
          </div>
        ) : null}

        <div className="mt-3 mb-6 col-span-6 sm:col-span-3">
          <label
            htmlFor="membership"
            className="ml-1 block text-lg leading-6 text-white text-center"
          >
            Select your Membership:
          </label>
          <select
            id="membership"
            name="membership"
            autoComplete="membership"
            onChange={(e) => setSelectedOption(e.target.value)}
            className="mt-1 block w-full rounded-md border-0  py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          >
            <option value={"10.0"}>Premium 10 DAI</option>
            <option value={"1.0"}>Standard 1 DAI</option>
          </select>
        </div>

        {Number(formatEther(String(allowance || 0))) < Number(selectedOption) &&
          Number(formatEther(String(balance || 0))) >=
            Number(selectedOption) && (
            <button
              className="mb-3 block w-full rounded-lg bg-[#360712] px-3 py-3 text-[16px] text-white shadow-sm hover:opacity-60 border-2 border-white/40"
              onClick={callApprove}
              disabled={allowanceIsLoading}
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
              {Number(String(selectedOption || 0)).toLocaleString("en-US")} DAI
            </button>
          )}

        {Number(formatEther(String(balance || 0))) >= Number(selectedOption) ? (
          <button
            className="mt-3 block w-full rounded-lg px-3 py-3 text-[16px] text-white shadow-sm border-2 border-white/40 hover:opacity-60"
            onClick={callRegister}
            disabled={registerIsLoading}
          >
            <span className="h-4 w-4 pr-2">
              {registerIsLoading && (
                <svg
                  className="animate-spin h-4 w-4 text-white inline-flex "
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
          <div className="ml-1 font-medium text-white">
            You do not have balance for Registration
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
            <Image className="w-[20px] mr-1"  width={500}
      height={500} src="/Dai.png" alt="Dai" />
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
            <Image className="w-[20px] mr-1"  width={500}
      height={500} src="/Dai.png" alt="Dai" />
            <p>{formatEther(String(allowance || 0))}</p>
          </span>
        </div>
      </div>
    </>
  );
};

export default UserRegister;
