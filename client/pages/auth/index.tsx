import Image from "next/image";
import {
  ConnectWallet,
  useAddress,
  useConnect,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { LuckyMeAddress } from "../../lib/contract";

const Auth = () => {
  const router = useRouter();
  const address = useAddress();
  const inputId = useRef<HTMLInputElement>(null);
  const { contract } = useContract(LuckyMeAddress);

  const connectToMetamask = () => {
    router.push(`/dashboard`);
  };

  const search = () => {
    const value = inputId.current?.value;
    if (value === "0") {
      alert("This account is not available.");
    } else if (value === "") {
      alert("Please insert ID.");
    } else {
      router.push(`/view/${value}`);
    }
  };

  const { data: isUserExists } = useContractRead(
    contract,
    "isUserExists",
    address
  );

  return (
    <div className="py-12 ">
      <div className="flex min-h-full items-end justify-center flex-col text-center sm:items-center sm:p-0">
        {/* register div */}
        <div className="max-w-md w-full m-auto rounded-2xl px-4 py-8 sm:p-6 sm:pb-4 bg-[#660e22] border-2 border-white/40">
          <div className="w-full flex justify-center">
            <Image width={100} height={100} src="/Lucky-Me.png" alt="" />
          </div>
          <p className="p-2 text-white">The Entrance To The Office</p>
          <div className="sm:flex sm:items-start"></div>
          <div className="mb-2">
            <div className="my-2 text-left">
              <input
                type="text"
                ref={inputId}
                className="bg-transparent text-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="Search ID"
                required
              />
            </div>
          </div>

          <button
            onClick={search}
            className="mb-3 mt-3 block w-full rounded-lg px-3 py-3 text-[16px] text-white shadow-sm border-2 border-white/40"
          >
            View Account
          </button>

          {isUserExists && (
            <span
              onClick={connectToMetamask}
              className="inline-flex justify-center w-full rounded-lg px-3 py-2 text-[16px] text-white shadow-sm border-2 border-white/40 hover:opacity-60 cursor-pointer"
            >
              Authorize Your Wallet
            </span>
          )}
          {!address && (
            <div className="relative w-full mb-3">
              <ConnectWallet className="!bg-[#660e22] !border-2 !border-white/40" />
            </div>
          )}
          {address && !isUserExists && (
            <span
              onClick={() => router.push(`/r`)}
              className="inline-flex justify-center cursor-pointer w-full rounded-lg  px-3 py-2 text-[16px] text-white shadow-sm border-2 border-white/40"
            >
              Become a Member
            </span>
          )}

          <span className="text-sm text-white">
            Do not Have An Account?{" "}
            <h2
              onClick={() => router.push(`/r`)}
              className="inline-block cursor-pointer hover:underline"
            >
              {" "}
              Become A Member
            </h2>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
