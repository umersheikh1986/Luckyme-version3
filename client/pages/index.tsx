import type { NextPage } from "next";
import Image from "next/image";
import { useState, Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

const Home: NextPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="isolate bg-[#360712]">
      <div className="px-6 py-3 ">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/">
              <span className="sr-only">Your Company</span>
              <Image width={80} src="/Lucky-Me.png" alt="Your Company" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {/* <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-white"
              >
                {item.name}
              </a>
            ))}
          </div> */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {/* ======= */}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 mr-10  text-xl  text-white   ">
                  Download Our Plan
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="assets/Lucky Me English.pdf"
                          target="_blank"
                          className={classNames(
                            active ? "bg-gray-700 text-white" : "text-white",
                            "block px-4 py-2 text-md"
                          )}
                        >
                          Lucky Me English
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="assets/Lucky Me Español.pdf"
                          target="_blank"
                          className={classNames(
                            active ? "bg-gray-700 text-white" : "text-white",
                            "block px-4 py-2 text-md"
                          )}
                        >
                          Lucky Me Español
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            {/* ======= */}

            <Link href="/auth" className="text-xl leading-6 text-white">
              Dashboard <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-[#360712] px-6 py-6 lg:hidden">
            <div className="flex items-center justify-between">
              <div className="-m-1.5 p-1.5">
                <Link href="/">
                  <span className="sr-only">Your Company</span>
                  <Image width={50} src="/Lucky-Me.png" alt="Your Company" />
                </Link>
              </div>
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
              <div className="-my-6 divide-y divide-gray-500/10">
                {/* <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-400/10"
                    >
                      {item.name}
                    </a>
                  ))}
                </div> */}
                <div className="py-6">
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex text-white w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-xl leading-7">
                          Download Our Plan
                          <ChevronDownIcon
                            className={classNames(
                              open ? "rotate-180" : "",
                              "h-5 w-5 flex-none"
                            )}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          <Link
                            target="_blank"
                            href="assets/Lucky Me English.pdf"
                            className="block rounded-lg py-2 pl-6 pr-3 text-base leading-7 text-white"
                          >
                            Lucky Me English
                          </Link>
                          <Link
                            target="_blank"
                            href="assets/Lucky Me Español.pdf"
                            className="block rounded-lg py-2 pl-6 pr-3 text-base leading-7 text-white"
                          >
                            Lucky Me Español
                          </Link>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  <Link
                    href="/auth"
                    className="-mx-3 block rounded-lg py-2 px-3 text-xl leading-7 text-white"
                  >
                    Dashboard <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
      {/* Hero Section */}
      <section className="flex items-center lg:h-screen h-[60vh]">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center ">
            <Image
              src="/Lucky-Me.png"
              alt=""
              className="mx-auto w-[30%] lg:pb-5"
            />
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-5xl">
              LUCKY ME
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-100">
              100% DECENTRALIZED TECHNOLOGY
            </p>
          </div>
        </div>
      </section>
      {/* Section 01 (CHANGE YOUR MIND)*/}
      <section className="py-10 lg:py-16 my-4">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="flex justify-center items-end h-full">
              <Image width={400} src="assets/Picture1.png" alt="" />
            </div>
            <div>
              <h1 className="text-4xl font-bold  text-white sm:text-6xl lg:text-4xl">
                CHANGE YOUR MIND
              </h1>
              <h1 className="text-4xl font-bold  text-white sm:text-6xl lg:text-4xl">
                CHANGE YOUR LIFE.
              </h1>

              <p className="mt-8 text-base  text-gray-100 sm:text-xl">
                By being part of{" "}
                <span className="text-yellow-600">Me COMMUNITY </span> we do not
                guarantee magical results. That is why we understand that it is
                necessary to undergo a mental change and execute the actions
                required in order to achieve the goals and dreams that each one
                desires. It is the individual responsibility of each person to
                participate and apply the knowledge that is available to the
                team. Like everything in life, the results can be different from
                one person to another.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Section 02 (BLOCKCHAIN TECHNOLOGY)*/}
      <section className="py-10 lg:py-16 my-4">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="">
              <Image
                width={300}
                className="mx-auto"
                src="assets/Picture2-1.png"
                alt=""
              />
              <Image
                width={300}
                className="mt-12 mx-auto"
                src="assets/Picture2-2.png"
                alt=""
              />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white">
                BLOCKCHAIN TECHNOLOGY
              </h1>

              <p className="mt-8 text-base text-gray-100 sm:text-xl">
                Our community employs systems that work in a decentralized way
                through automated smart contracts that offer maximum security
                and sustainability.
              </p>
              <p className="mt-2 text-base text-gray-100 sm:text-xl">
                A smart contract is a self-executing algorithm that, in this
                case, exists within the corresponding block chain.
              </p>
              <p className="mt-2 text-base text-gray-100 sm:text-xl">
                Smart contracts, like crypto currencies, are decentralized and
                work without the possibility of subsequently modifying the
                previously defined execution.
              </p>
              <p className="mt-2 text-base text-gray-100 sm:text-xl">
                The code that contains all the logic of the contract is on the
                block chain and millions of computers around the world provide
                all the calculations, this ensures that there is no risk of
                hacking the smart contract or stopping the project.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Section 03 (Lucky Me)*/}
      <section className="py-10 lg:py-16 my-6">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="text-center">
              <Image
                src="/Lucky-Me.png"
                alt=""
                className="mx-auto w-[18%] lg:pb-5"
              />
              <h2 className="lg:text-6xl md:text-5xl text-3xl text-center font-bold leading-tight text-white">
                LUCKY <br /> Me
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-gray-100">
                100% DECENTRALIZED SPINNING DRAWS
              </p>

              <div className="mt-10 sm:flex sm:items-center sm:space-x-8"></div>
            </div>
            <div className="flex justify-center">
              <Image src="assets/Picture3.png" alt="" />
            </div>
          </div>
        </div>
      </section>
      {/* Section 04 (EVERYBODY WINS)*/}
      <section className="py-10 lg:py-16 my-4">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="lg:text-6xl md:text-5xl text-3xl text-center font-bold leading-tight text-white">
              EVERYBODY WINS
            </h2>
            <p className="mt-4 text-2xl leading-relaxed text-gray-100">
              First decentralized spinning game system where the community gets
              95% of the participation.
            </p>
          </div>
          <h1 className="text-center text-gray-100 text-2xl pt-8">
            Percentage
          </h1>
          <div className="flex justify-center">
            <Image width={400} src="assets/Pie-chart1.png" alt="" />
          </div>
          <div className="flex justify-center gap-3">
            <div className="w-3 h-3 border border-white bg-[#E62E2D] mt-1 flex-shrink-0"></div>
            <span className="text-white">Prizes</span>
            <div className="w-3 h-3  border border-white bg-[#EC8A23] mt-1 flex-shrink-0"></div>
            <span className="text-white">Rewards</span>
            <div className="w-3 h-3  border border-white bg-[#754D09] mt-1 flex-shrink-0"></div>
            <span className="text-white">Admin</span>
          </div>
        </div>
      </section>

      {/* Section 05 (HOW DOES Lucky Me WORK?)*/}
      <section className="py-10 lg:py-16 my-4">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="lg:text-6xl md:text-5xl text-3xl text-center font-bold leading-tight text-white">
              HOW DOES LUCKY ME WORK?
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-1 gap-4 text-white mt-6">
            <div className="col-span-2 border-r-2 text-center px-14">
              <div className="mb-5">
                <Image
                  width={200}
                  className="mx-auto"
                  src="assets/picture5-1.png"
                  alt=""
                />
              </div>
              <div className="flex items-center p-1 my-2 border border-white rounded-[25px] shadow hover:bg-gray-100 bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                <span className=" w-1/4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-8 h-8 mx-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>
                </span>

                <span className="w-full">
                  <h5 className="text-xl font-bold text-center">
                    100 <br /> PARTICIPANTS
                  </h5>
                </span>
              </div>
              <div className="flex items-center p-1 my-2 border border-white rounded-[25px] shadow hover:bg-gray-100 bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                <span className=" w-1/4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="79"
                    height="40"
                    xmlSpace="preserve"
                    overflow="hidden"
                  >
                    <defs>
                      <image
                        width="40"
                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAAmCAMAAABEWLO+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAzUExURQAAAP///////////////////////////////////////////////////////////////7eV4oIAAAAQdFJOUwAQIDBAUGBwgI+fr7/P3+8jGoKKAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABu0lEQVRIS5WVSQKDIAxFRVAGQXr/0xbhE0arfTtCIpldfsGE1Mad/nSH3lYI38I24z81XnNcvUC41jhhd1w/IBwMBtyLL4gDylPcQyKYnnleI6E5hfWP+zEWC90J/ITOhVWCs0u6bruBLOKi7gRRfPeqK5e0uAm4+NkBSeZeTjR4cWLqASdze5PkHffTHLAc+/TxBKdsjlXImfcbBFMohr6bN8h/13dZchq7FLDsmYbgDlJsW1lCam5jz6yXmre6tcdX/Ys5FzK1VU2OXuH8BOObMu7AidLqH72/DI+0Heo6o/Y/nmdiV7ZaK02XcAgn0YcHpa4NI96sCyvaaMwTx8J8kX0sX5hyHkpUvZIPUCaqJliLa80Ue50u+vCreS640N/YzRQAer/v/MkmPGPaUC6R1Eixn4l6G0Vy0uEvvYfv9fZJSpSSqSQge3yP/AHVygrWqhS81+/9AXmoArX1GD/8Gf4u2YHWmvJF+cf4jO0bHRsXWkpsqT+L50pArLvae+u0ApoVhEq9mP4L5MXgGEBCHnZfBuFX4d4O0BQsq8rbmAAfBuMdMYBmA5s/rAMsBNxUa//H+oIbsSxfguMyc4pUZQUAAAAASUVORK5CYII="
                        preserveAspectRatio="none"
                        id="img8"
                      />
                      <clipPath id="clip9">
                        <rect x="-0.125" y="0" width="600075" height="361950" />
                      </clipPath>
                    </defs>
                    <g clipPath="url(#clip1)" transform="translate(-136 -516)">
                      <g
                        clipPath="url(#clip2)"
                        filter="url(#fx0)"
                        transform="translate(135 516)"
                      >
                        <g clipPath="url(#clip3)">
                          <g
                            clipPath="url(#clip4)"
                            transform="matrix(0.000107087 0 0 0.000107087 8.37 7.62)"
                          >
                            <g
                              clipPath="url(#clip6)"
                              transform="matrix(1.01028 0 0 1 0.00675666 -0.250812)"
                            >
                              <use
                                width="100%"
                                height="100%"
                                xlinkHref="#img5"
                                transform="scale(9280.77 9280.77)"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                      <g
                        clipPath="url(#clip7)"
                        transform="matrix(0.000104987 0 0 0.000104987 144 524)"
                      >
                        <g clipPath="url(#clip9)">
                          <use
                            width="100%"
                            height="100%"
                            xlinkHref="#img8"
                            transform="matrix(9525 0 0 9525 -0.125 0)"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>

                <span className="w-full">
                  <h5 className="text-xl font-bold text-center">
                    3 <br /> WINNERS
                  </h5>
                </span>
              </div>
              <div className="flex items-center p-1 my-2 border border-white rounded-[25px] shadow hover:bg-gray-100 bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                <span className=" w-1/4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="w-8 h-8 mx-auto"
                  >
                    <path fill="none" d="M0 0H24V24H0z" />
                    <path
                      d="M19.562 12.098l1.531 2.652c.967 1.674.393 3.815-1.28 4.781-.533.307-1.136.469-1.75.469H16v2l-5-3.5 5-3.5v2h2.062c.088 0 .174-.023.25-.067.213-.123.301-.378.221-.601l-.038-.082-1.531-2.652 2.598-1.5zM7.737 9.384l.53 6.08-1.73-1-1.032 1.786c-.044.076-.067.162-.067.25 0 .245.177.45.41.492l.09.008H9v3H5.938c-1.933 0-3.5-1.567-3.5-3.5 0-.614.162-1.218.469-1.75l1.031-1.786-1.732-1 5.53-2.58zm6.013-6.415c.532.307.974.749 1.281 1.281l1.03 1.786 1.733-1-.53 6.08-5.532-2.58 1.732-1-1.031-1.786c-.044-.076-.107-.14-.183-.183-.213-.123-.478-.072-.631.11l-.052.073-1.53 2.652-2.599-1.5 1.53-2.652c.967-1.674 3.108-2.248 4.782-1.281z"
                      fill="rgba(255,255,255,1)"
                    />
                  </svg>
                </span>

                <span className="w-full">
                  <h5 className="text-xl font-bold text-center">
                    DECENTRALIZED <br />
                    ALGORITHM
                  </h5>
                </span>
              </div>
            </div>

            <div className="col-span-2 border-r-2 text-center px-14">
              <div className="mb-5">
                <Image
                  width={140}
                  className="mx-auto"
                  src="assets/picture5-2.png"
                  alt=""
                />
              </div>
              <div className="flex items-center p-1 my-2 border border-white rounded-[25px] shadow hover:bg-gray-100 bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                <span className="w-full py-[14px]">
                  <h5 className="text-xl font-bold text-center">MEMBERSHIPS</h5>
                </span>
              </div>
              <div className="flex items-center p-1 my-2 border border-white rounded-[25px] shadow hover:bg-gray-100 bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                <span className="w-full py-[14px]">
                  <h5 className="text-xl font-bold text-center">
                    STANDARD – FREE
                  </h5>
                </span>
              </div>
              <div className="flex items-center p-1 my-2 border border-white rounded-[25px] shadow hover:bg-gray-100 bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                <span className="w-full py-[14px]">
                  <h5 className="text-xl font-bold text-center">
                    PREMIUM – 20 Per Year
                  </h5>
                </span>
              </div>
            </div>

            <div className="col-span-2 border-r-2 text-center px-14">
              <div className="mb-5">
                <Image
                  width={140}
                  className="mx-auto"
                  src="assets/picture5-3.png"
                  alt=""
                />
              </div>
              <div className="flex items-center p-1 my-2 border border-white rounded-[25px] shadow hover:bg-gray-100 bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                <span className="w-full">
                  <h5 className="text-xl font-bold text-center">
                    5 LEVELS
                    <br /> REFERRAL SYSTEM
                  </h5>
                </span>
              </div>
              <div className="flex items-center p-1 my-2 border border-white rounded-[25px] shadow hover:bg-gray-100 bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                <span className="w-full">
                  <h5 className="text-xl font-bold text-center">
                    UNLIMITED DIRECT
                    <br /> REFERRALS
                  </h5>
                </span>
              </div>
              <div className="flex items-center p-1 my-2 border border-white rounded-[25px] shadow hover:bg-gray-100 bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                <span className="w-full py-[14px]">
                  <h5 className="text-xl font-bold text-center">
                    INSTANT PAYMENTS
                  </h5>
                </span>
              </div>
            </div>
          </div>
          {/* <div className="flex justify-between flex-wrap items-center mt-8">
            <div className="flex lg:block justify-center w-full lg:w-auto">
              <ul className="list-disc text-white ">
                <span className="text-white">
                  Spinning Draw System <br /> With 3 Characteristics:
                </span>
                <li className="mt-5 ml-5">100 Participants</li>
                <li className=" ml-5">3 Winners</li>
                <li className=" ml-5">Decentralized Algorithm</li>
              </ul>
              <ul className="list-disc text-white lg:hidden">
                <span className="text-white">Referral System Of 5 Levels:</span>
                <li className="mt-5 ml-5">Unlimited Direct Referrals</li>
                <li className=" ml-5">Instant Payments</li>
              </ul>
            </div>
            <div className="w-full lg:w-auto xl:w-auto mt-8">
              <Image width={600} className="mt-6 sm:mx-auto" src="assets/Picture5.png" alt="" />
            </div>
            <ul className="list-disc text-white hidden lg:block xl:block">
              <span className="text-white">Referral System Of 5 Levels:</span>
              <li className="mt-5 ml-5">Unlimited Direct Referrals</li>
              <li className=" ml-5">Instant Payments</li>
            </ul>
          </div> */}
        </div>
      </section>
      {/* Section 06 (GAMES)*/}
      <section className="py-10 lg:py-16 my-4">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="lg:text-6xl md:text-5xl text-3xl text-center font-bold leading-tight text-white">
              GAMES
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-1 gap-2 text-white mt-12">
            <div className="col-span-2 p-1 my-2 mx-12 border border-white rounded-[35px] shadow hover:bg-gray-100 bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
              <span className="w-full">
                <h5 className="text-xl font-semibold text-center">
                  GOLDEN DRAW
                  <br /> 1
                </h5>
              </span>
              <span className="w-full mx-auto">
                <Image
                  width={20}
                  className="mx-auto"
                  src="assets/dai.png"
                  alt=""
                />
              </span>
            </div>
            <div className="col-span-2 p-1 my-2 mx-12 border border-white rounded-[35px] shadow hover:bg-gray-100 bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
              <span className="w-full">
                <h5 className="text-xl font-bold text-center">
                  Instant Win
                  <br /> 2
                </h5>
              </span>
              <span className="w-full mx-auto">
                <Image
                  width={20}
                  className="mx-auto"
                  src="assets/dai.png"
                  alt=""
                />
              </span>
            </div>
            <div className="col-span-2 p-1 my-2 mx-12 border border-white rounded-[35px] shadow hover:bg-gray-100 bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
              <span className="w-full">
                <h5 className="text-xl font-bold text-center">
                  Triple Power
                  <br /> 5
                </h5>
              </span>
              <span className="w-full mx-auto">
                <Image
                  width={20}
                  className="mx-auto"
                  src="assets/dai.png"
                  alt=""
                />
              </span>
            </div>
            <div className="col-span-2 p-1 my-2 mx-12 border border-white rounded-[35px] shadow hover:bg-gray-100 bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
              <span className="w-full">
                <h5 className="text-xl font-bold text-center">
                  Money Pot
                  <br /> 10
                </h5>
              </span>
              <span className="w-full mx-auto">
                <Image
                  width={20}
                  className="mx-auto"
                  src="assets/dai.png"
                  alt=""
                />
              </span>
            </div>
            <div className="col-span-2 p-1 my-2 mx-12 border border-white rounded-[35px] shadow hover:bg-gray-100 bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
              <span className="w-full">
                <h5 className="text-xl font-bold text-center">
                  Fantasy Wheel
                  <br /> 25
                </h5>
              </span>
              <span className="w-full mx-auto">
                <Image
                  width={20}
                  className="mx-auto"
                  src="assets/dai.png"
                  alt=""
                />
              </span>
            </div>
            <div className="col-span-2 p-1 my-2 mx-12 border border-white rounded-[35px] shadow hover:bg-gray-100 bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
              <span className="w-full">
                <h5 className="text-xl font-bold text-center">
                  Lucky Fireball
                  <br /> 50
                </h5>
              </span>
              <span className="w-full mx-auto">
                <Image
                  width={20}
                  className="mx-auto"
                  src="assets/dai.png"
                  alt=""
                />
              </span>
            </div>
            <div className="col-span-2 p-1 my-2 mx-12 border border-white rounded-[35px] shadow hover:bg-gray-100 bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
              <span className="w-full">
                <h5 className="text-xl font-bold text-center">
                  Jackpot Zone
                  <br /> 100
                </h5>
              </span>
              <span className="w-full mx-auto">
                <Image
                  width={20}
                  className="mx-auto"
                  src="assets/dai.png"
                  alt=""
                />
              </span>
            </div>
            <div className="col-span-2 p-1 my-2 mx-12 border border-white rounded-[35px] shadow hover:bg-gray-100 bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
              <span className="w-full">
                <h5 className="text-xl font-bold text-center">
                  Break The Bank
                  <br /> 250
                </h5>
              </span>
              <span className="w-full mx-auto">
                <Image
                  width={20}
                  className="mx-auto"
                  src="assets/dai.png"
                  alt=""
                />
              </span>
            </div>
            <div className="col-span-2 p-1 my-2 mx-12 border border-white rounded-[35px] shadow hover:bg-gray-100 bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
              <span className="w-full">
                <h5 className="text-xl font-bold text-center">
                  Mega Earnings
                  <br /> 500
                </h5>
              </span>
              <span className="w-full mx-auto">
                <Image
                  width={20}
                  className="mx-auto"
                  src="assets/dai.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <div className="max-w-xl mx-auto text-center pt-6">
            <h2 className="lg:text-2xl md:text-xl text-lg text-center font-bold leading-tight text-white">
              THERE S AN OPPORTUNITY FOR EVERYONE
            </h2>
          </div>
        </div>
      </section>
      {/* Section 07 (PRIZES)*/}
      <section className="py-10 lg:py-16 my-4">
        <div className="md:px-32 py-8 w-full">
          <h2 className="lg:text-6xl md:text-5xl text-3xl text-center font-bold leading-tight text-white">
            PRIZES
          </h2>
          <div className="overflow-x-scroll lg:overflow-hidden sm:overflow-x-scroll mt-8">
            <table className="lg:min-w-full md:min-w-full mx-auto ">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="w-1/4 text-center py-1 px-4 uppercase font-semibold text-xl bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                    GAME
                  </th>
                  <th className="w-1/4 text-center py-1 px-4 uppercase font-semibold text-xl bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                    1<sup>st</sup>.<br />
                    PLACE
                  </th>
                  <th className="w-1/4 text-center py-1 px-4 uppercase font-semibold text-xl bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                    2<sup>nd</sup>.
                    <br />
                    PLACE
                  </th>
                  <th className="w-1/4 text-center py-1 px-4 uppercase font-semibold text-xl bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                    3<sup>rd</sup>
                    <br />
                    PLACE
                  </th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    Golden Draw
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    40
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    20
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    10
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    Instant Win
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    80
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    40
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    20
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    Triple Power
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    200
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    100
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    50
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    Money Pot
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    400
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    200
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    100
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    Fantasy Wheel
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    1,000
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    500
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    250
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    Lucky Fireball
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    2,000
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    1,000
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    500
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    Jackpot Zone
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    4,000
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    2,000
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    1,000
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    Break The Bank
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    10,000
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    5,000
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    2,500
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    Mega Earnings
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    20,000
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    10,000
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    5,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 className="lg:text-3xl font-semibold text-center text-white sm:text-xl md:text-xl mt-20">
            READY TO MAKE YOUR DREAMS COME TRUE?
          </h2>
        </div>
      </section>
      {/* Section 08 (GLOBAL MARKET)*/}
      <section className="py-10 lg:py-16 my-4">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="lg:text-6xl md:text-5xl text-3xl text-center font-bold leading-tight text-white">
              GLOBAL MARKET
            </h2>
            <p className="mt-4 text-2xl leading-relaxed text-gray-100">
              The Lottery and Gaming Industry Revenue For 2024 was 311 Billion
              Dollars
            </p>
          </div>
          <h1 className="text-center text-gray-100 text-2xl pt-8">
            MILLION DOLLARS
          </h1>
          <div className="flex justify-center flex-wrap gap-3 mt-8">
            <div className="w-3 h-3 bg-[#D42A2F] mt-1 flex-shrink-0"></div>
            <span className="text-white">America</span>
            <div className="w-3 h-3 bg-[#EC8823] mt-1 flex-shrink-0"></div>
            <span className="text-white">Asia</span>
            <div className="w-3 h-3 bg-[#DE861F] mt-1 flex-shrink-0"></div>
            <span className="text-white">Africa</span>
            <div className="w-3 h-3 bg-[#54B051] mt-1 flex-shrink-0"></div>
            <span className="text-white">Europe</span>
            <div className="w-3 h-3 bg-[#5AB3BF] mt-1 flex-shrink-0"></div>
            <span className="text-white">Oceania</span>
          </div>
          <div className="flex justify-center">
            <Image width={400} src="assets/Pie-chart2.png" alt="" />
          </div>
          <h2 className="lg:text-3xl font-semibold text-center text-white sm:text-xl md:text-xl mt-10">
            GET YOUR SHARE OF THE MARKET
          </h2>
        </div>
      </section>
      {/* Section 09 (REFERRAL COMMISSIONS)*/}
      <section className="py-10 lg:py-16 my-4">
        <div className="md:px-32 py-8 w-full">
          <h2 className="lg:text-6xl md:text-5xl text-3xl text-center font-bold leading-tight text-white">
            REFERRAL REWARDS
          </h2>
          <div className="overflow-x-scroll lg:overflow-hidden sm:overflow-x-scroll mt-8">
            <table className="lg:min-w-full md:min-w-full mx-auto ">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="w-1/4 text-center py-1 px-4 uppercase font-semibold text-xl bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                    LEVEL
                  </th>
                  <th className="w-1/4 text-center py-1 px-4 uppercase font-semibold text-xl bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                    MEMBERSHIP
                  </th>
                  <th className="w-1/4 text-center py-1 px-4 uppercase font-semibold text-xl bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                    PICKS<br></br>PURCHASE
                  </th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    1
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    25%
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    15%
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    2
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    10%
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    4%
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    3
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    5%
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    3%
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    4
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    5%
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    2%
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    5
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    5%
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    1%
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    Total
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    50%
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    25%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 className="lg:text-3xl font-semibold text-center text-white sm:text-xl md:text-xl mt-20">
            2 WAYS OF CREATING INCOME
          </h2>
        </div>
      </section>
      {/* Section 10 (COMMISSIONS PROJECTION 1)*/}
      <section className="py-10 lg:py-16 my-4">
        <div className="md:px-32 py-8 w-full">
          <h2 className="lg:text-6xl md:text-5xl text-3xl text-center font-bold leading-tight text-white">
            REWARDS PROJECTION
          </h2>
          <div className="overflow-x-scroll lg:overflow-hidden sm:overflow-x-scroll mt-8">
            <table className="lg:min-w-full md:min-w-full mx-auto ">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="w-1/4 text-center py-1 px-4 uppercase font-semibold text-xl bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                    LEVEL
                  </th>
                  <th className="w-1/4 text-center py-1 px-4 uppercase font-semibold text-xl bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                    AFFILIATES
                  </th>
                  <th className="w-1/4 text-center py-1 px-4 uppercase font-semibold text-xl bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                    PREMIUM
                    <br />
                    MEMBERSHIP
                  </th>
                  <th className="w-1/4 text-center py-1 px-4 uppercase font-semibold text-xl bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                    WEEKLY SALES <br /> REWARDS ($1 / DAY)
                  </th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    1
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    5
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    25.00
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    5.25
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    2
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    25
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    50.00
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    7.00
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    3
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    125
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    125.00
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    26.25
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    4
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    625
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    625.00
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    87.50
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    5
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    3,125
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    3,125.00
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    218.75
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    Total
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    3,905
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    3,950.00
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    344.75
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 className="lg:text-3xl font-semibold text-center text-white sm:text-xl md:text-xl mt-20">
            GENERATE YOUR OWN CASH FLOW
          </h2>
        </div>
      </section>
      {/* Section 11 (COMMISSIONS PROJECTION 2)*/}
      <section className="py-10 lg:py-16 my-4">
        <div className="md:px-32 py-8 w-full">
          <h2 className="lg:text-6xl md:text-5xl text-3xl text-center font-bold leading-tight text-white">
            COMMISSIONS PROJECTION
          </h2>
          <div className="overflow-x-scroll lg:overflow-hidden sm:overflow-x-scroll mt-8">
            <table className="lg:min-w-full md:min-w-full mx-auto ">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="w-1/4 text-center py-1 px-4 uppercase font-semibold text-xl bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                    LEVEL
                  </th>
                  <th className="w-1/4 text-center py-1 px-4 uppercase font-semibold text-xl bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                    AFFILIATES
                  </th>
                  <th className="w-1/4 text-center py-1 px-4 uppercase font-semibold text-xl bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                    PREMIUM
                    <br />
                    MEMBERSHIP
                  </th>
                  <th className="w-1/4 text-center py-1 px-4 uppercase font-semibold text-xl bg-gradient-to-r from-[#FF8B00] to-[#D41630]">
                    PICK
                    <br />
                    SALES WEEKLY
                  </th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    1
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    10
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    25
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    4
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    2
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    100
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    100
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    15
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    3
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    1000
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    500
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    100
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    4
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    10,000
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    5000
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    100
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    5
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    100,000
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    50,000
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    5000
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    Total
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    111,110
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    55,625
                  </td>
                  <td className="w-1/4 text-lg font-bold text-center py-1 px-4">
                    5619
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 className="lg:text-3xl font-semibold text-center text-white sm:text-xl md:text-xl mt-20">
            WHO SAYS YOU CAN’T DREAM BIG?
          </h2>
        </div>
      </section>
      {/* Section 12 (Lucky Me)*/}
      <section className="py-10 lg:py-16 mt-6">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="text-center">
              <Image
                src="/Lucky-Me.png"
                alt=""
                className="mx-auto w-[18%] lg:pb-5"
              />
              <h2 className="lg:text-6xl md:text-5xl text-3xl text-center font-bold leading-tight text-white">
                LUCKY <br /> Me
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-gray-100">
                EVERYBODY WINS!
              </p>

              <div className="mt-10 sm:flex sm:items-center sm:space-x-8"></div>
            </div>
            <div className="flex justify-center">
              <Image src="assets/Picture3.png" alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
