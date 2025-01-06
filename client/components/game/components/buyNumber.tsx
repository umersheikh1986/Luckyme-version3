import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { DaiAbi, DaiAddress, LuckyMeAddress } from "../../../lib/contract";
import { formatEther } from "ethers/lib/utils";

export default function BuyNumber({
  open,
  error,
  setOpen,
  SetError,
  userId,
  number,
  Id,
  entryFee,
}: {
  open: boolean;
  error: string;
  setOpen: any;
  SetError: any;
  userId: any;
  entryFee: any;
  number: number;
  Id: number;
}) {
  const cancelButtonRef = useRef(null);

  const address = useAddress();

  // contracts
  const { contract: daiContract } = useContract(DaiAddress, DaiAbi);
  const { contract: LuckyMeContract } = useContract(LuckyMeAddress);

  // Read functions
  const { data: balance } = useContractRead(daiContract, "balanceOf", address);
  const { data: allowance } = useContractRead(
    daiContract,
    "allowance",
    address,
    LuckyMeAddress
  );

  // Write functions
  const { mutateAsync: approve, isLoading: approveIsLoading } =
    useContractWrite(daiContract, "approve");
  const callApprove = async () => {
    try {
      const data = await approve([LuckyMeAddress, String(entryFee)]);
      console.info("contract call success", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const { mutateAsync: enterGame, isLoading: enterGameIsLoading } =
    useContractWrite(LuckyMeContract, "enterGame");
  const callEnterGame = async () => {
    try {
      const data = await enterGame([Id, number, userId]);
      SetError("done");
      console.info("contract call success's", data);
    } catch (err) {
      console.error("contract call failure", err);
      SetError("error");
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-20 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden w-full rounded-lg border-2 border-white/40 bg-[#660e22] text-left transition-all sm:my-8 sm:w-full sm:max-w-[350px]">
                {error === "done" && (
                  <div className=" flex px-4 py-4 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="green"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <p className="ml-2 text-white">Transaction Completed</p>
                  </div>
                )}
                {error === "error" && (
                  <div className=" flex px-4 py-4 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="red"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                      />
                    </svg>
                    <p className="ml-2 text-white">Error in Transaction.</p>
                  </div>
                )}
                {error === "" && (
                  <>
                    <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="mt-3 text-center sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-xl leading-6 text-white"
                        >
                          Number {number + 1}
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="text-[16px] text-white">
                            Entry Fee {formatEther(String(entryFee))}
                          </div>
                          <div className="text-[16px] text-white">
                            Your balance {formatEther(String(balance || 0))}
                          </div>
                          <div className="text-[16px] text-white">
                            Your allowance {formatEther(String(allowance || 0))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" px-4 pb-4 sm:px-6">
                      {Number(formatEther(String(allowance || 0))) <
                        Number(formatEther(String(entryFee))) &&
                        Number(formatEther(String(balance || 0))) >=
                          Number(formatEther(String(entryFee))) && (
                          <button
                            className="mb-3 block w-full rounded-lg bg-[#360712] px-3 py-2 text-[16px] text-white shadow-sm hover:opacity-60 border-2 border-white/40"
                            onClick={callApprove}
                            disabled={approveIsLoading}
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
                            Approve {formatEther(String(entryFee))} DAI
                          </button>
                        )}

                      {Number(formatEther(String(balance || 0))) >=
                      Number(formatEther(String(entryFee))) ? (
                        <>
                          <button
                            className="mt-3 block w-full rounded-lg  px-3 py-2 text-[16px] text-white shadow-sm border-2 border-white/40 hover:opacity-60"
                            onClick={callEnterGame}
                          >
                            <span className="h-4 w-4 pr-2">
                              {enterGameIsLoading && (
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
                            Buy number {number + 1}
                          </button>
                        </>
                      ) : (
                        <p className="text-center">
                          You do not have an enough amount
                        </p>
                      )}
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
