import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LuckyMeAddress } from "../lib/contract";
import UserRegister from "./user/userRegister";

const Register = ({ id }: { id?: any }) => {
  const address = useAddress();
  const { contract } = useContract(LuckyMeAddress);
  const { data: Id, isLoading } = useContractRead(
    contract,
    "UserId",
    address || "0x0000000000000000000000000000000000000000"
  );

  return (
    <main className="mx-auto max-w-[500px] grid items-center py-8 px-4 sm:px-6 lg:px-8 ">
      {address === undefined ? (
        <ConnectWallet className="!bg-[#660e22] !border-2 !border-white/40" />
      ) : (
        <div className="px-6 py-4 w-full rounded-lg mx-auto bg-[#660e22] border-2 border-white/40">
          {isLoading ? (
            <div className="flex justify-between items-center">
              <div className="text-lg font-medium text-white">Loading</div>
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
          ) : String(Id || 0) !== "0" ? (
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
            <UserRegister id={id} href="/dashboard" />
          )}
        </div>
      )}
    </main>
  );
};

export default Register;
