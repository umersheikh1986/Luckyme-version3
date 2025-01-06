import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { DaiAbi, DaiAddress, LuckyMeAddress } from "../../lib/contract";
import { formatEther, parseEther } from "ethers/lib/utils";

export default function Upgrade({
  open,
  setOpen,
  data,
}: {
  open: boolean;
  setOpen: any;
  data: any;
}) {
  const cancelButtonRef = useRef(null);

  const address = useAddress();

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
      const newData = await approve([LuckyMeAddress, parseEther("10")]);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const { mutateAsync: upgradePlan, isLoading: renewIsLoading } =
    useContractWrite(LuckyMeContract, "upgradePlan");
  const callUpgrade = async () => {
    try {
      const newData = await upgradePlan([String(data?.Id)]);
      setOpen(false);
    } catch (err) {
      console.error("contract call failure", err);
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg border-2 border-white/40 bg-[#660e22] text-left transition-all sm:my-8 sm:w-full sm:max-w-[350px]">
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-xl leading-6 text-white"
                    >
                      Upgrade Plan
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="text-[16px] text-white">
                        Your balance {formatEther(String(balance || 0))}
                      </div>
                      <div className="text-[16px] text-white">
                        Your allowance {formatEther(String(allowance || 0))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 sm:px-6">
                  {Number(formatEther(String(allowance || 0))) < 10.0 &&
                    Number(formatEther(String(balance || 0))) >= 10.0 && (
                      <button
                        className="mb-3 block w-full rounded-lg bg-[#360712] px-3 py-2 text-[16px] text-white shadow-sm hover:opacity-60 border-2 border-white/40"
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
                        Approve 10.0 DAI
                      </button>
                    )}
                  <button
                    className="mt-3 block w-full rounded-lg  px-3 py-2 text-[16px] text-white shadow-sm border-2 border-white/40 hover:opacity-60"
                    onClick={callUpgrade}
                  >
                    <span className="h-4 w-4 pr-2">
                      {renewIsLoading && (
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
                    Upgrade Plan
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
