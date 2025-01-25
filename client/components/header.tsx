import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
  useNetwork,
} from "@thirdweb-dev/react";
import Link from "next/link";
import Image from "next/image";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "../lib/classNames";
import { LuckyMeAddress } from "../lib/contract";
import { useRouter } from "next/router";

const products = [
  {
    name: "Direct Referrals",
    description: "Direct Referrals Information",
    href: "direct-referrals-information",
    icon: FingerPrintIcon,
  },
  {
    name: "Total Referrals",
    description: "Total Standard / Premium Referrals",
    href: "referrals-by-level",
    icon: ChartPieIcon,
  },
  {
    name: "Personal Games",
    description: "Prizes Won",
    href: "user-historic-statistics",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Community Games",
    description: "All Prizes Winners",
    href: "game-historic-statistics",
    icon: ChartPieIcon,
  },
  {
    name: "All Commisions",
    description: "All Commisions",
    href: "all-commisions",
    icon: ChartPieIcon,
  },
];

export default function Header({
  showMenu,
  root,
  id,
}: {
  showMenu: boolean;
  root: string;
  id: any;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const address = useAddress();
  const router = useRouter();

  const { contract } = useContract(LuckyMeAddress);
  const { data: owner } = useContractRead(contract, "owner");
  const [{ data, error, loading }, switchNetwork] = useNetwork();

  let hrefId = "";
  if (id !== undefined) hrefId = id;

  return (
    <>
      <header className="bg-[#360712]">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/">
              <span className="sr-only">Lucky Me</span>
              <Image
                // className="h-16 w-auto"
                width={80}
                height={80}
                src="/Lucky-Me.png"
                alt="Lucky Me"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-50"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {!showMenu ? (
            <Popover.Group className="hidden lg:flex lg:gap-x-12">
              <Link
                href={`${root}${hrefId}`}
                className="text-md tracking-widest capitalize leading-6 text-white"
              >
                {root.split("/")[1]}
              </Link>

              {owner === address && (
                <Link
                  href="/admin"
                  className="text-md tracking-widest capitalize leading-6 text-white"
                >
                  Admin
                </Link>
              )}

              {root ? (
                <Popover className="relative">
                  <Popover.Button className="flex items-center gap-x-1 text-md tracking-widest capitalize leading-6 text-white focus:outline-none ">
                    Office
                    <ChevronDownIcon
                      className="h-5 w-5 flex-none text-white"
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-[#660e22] border-2 border-white/40 shadow-lg ring-1 ring-gray-900/5">
                      {({ close }) => (
                        <div className="p-4">
                          {products.map((item) => (
                            <div
                              key={item.name}
                              onClick={() => close()}
                              className="group relative flex items-center gap-x-6 border-b p-4 text-sm leading-6 hover:bg-[#3d0512] "
                            >
                              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border">
                                <item.icon
                                  className="h-6 w-6 text-white "
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="flex-auto">
                                <Link
                                  href={`${root}${item.href}/${hrefId}`}
                                  className="block text-lg text-white"
                                >
                                  {item.name}
                                  <span className="absolute inset-0" />
                                </Link>
                                <p className="text-white">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </Popover.Panel>
                  </Transition>
                </Popover>
              ) : null}
            </Popover.Group>
          ) : null}

          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center">
            <div>
              {root !== "/view/" ? (
                <ConnectWallet className="!bg-[#660e22] !border-2 !border-white/40" />
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => router.push(`/auth`)}
              className="w-24 py-2.5 px-5 ml-2 text-md bg-[#660e22] border-2 border-white/40 font-[500] text-white focus:outline-none bg-transparent rounded-lg  hover:bg-gray-100/20 focus:z-10 focus:ring-4 focus:ring-gray-200 "
            >
              Logout
            </button>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#360712] px-6 py-2 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Lucky Me</span>
                <Image
                  // className="h-16 w-auto"
                  width={80}
                  height={80}
                  src="/Lucky-Me.png"
                  alt="Lucky Me"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                {!showMenu ? (
                  <div className="space-y-2 py-6">
                    <Link
                      href="/dashboard"
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white"
                    >
                      Dashboard
                    </Link>

                    {owner === address ? (
                      <Link
                        href="/admin"
                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white"
                      >
                        Admin
                      </Link>
                    ) : null}

                    <Disclosure as="div" className="-mx-3">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex text-white w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7">
                            Product
                            <ChevronDownIcon
                              className={classNames(
                                open ? "rotate-180" : "",
                                "h-5 w-5 flex-none"
                              )}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="mt-2 space-y-2">
                            {[...products].map((item) => (
                              <Link
                                key={item.name}
                                href={`${root}${item.href}/${hrefId}`}
                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-white"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                ) : null}
                <div className="pt-6">
                  {root !== "/view/" ? (
                    <ConnectWallet className="!bg-[#660e22] !border-2 !border-white/40" />
                  ) : null}
                </div>
                <div className="py-6">
                  <button
                    type="button"
                    onClick={() => router.push(`/auth`)}
                    className="w-full py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-black focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      {address === undefined ? (
        <div className="relative isolate overflow-hidden bg-gray-50 py-2.5 px-6 sm:px-3.5">
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
            <p className="text-sm leading-6 text-black">
              <strong className="font-semibold">Connect Wallet</strong>
              <svg
                viewBox="0 0 2 2"
                className="mx-2 inline h-0.5 w-0.5 fill-current"
                aria-hidden="true"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              Please Connect Your Wallet.
            </p>
          </div>
        </div>
      ) : null}

      {address !== undefined && data?.chain?.name !== "Polygon Mainnet" && (
        <div className="relative isolate overflow-hidden bg-gray-50 py-2.5 px-6 sm:px-3.5">
          <div className="font-medium text-red-600 text-center">
            Please switch your network to Polygon Mainnet Chain
          </div>
        </div>
      )}
    </>
  );
}
