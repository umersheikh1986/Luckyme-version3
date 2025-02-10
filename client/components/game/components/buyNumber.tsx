// import { Fragment, useRef, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import {
//   useAddress,
//   useContract,
//   useContractRead,
//   useContractWrite,
// } from "@thirdweb-dev/react";
// import { DaiAbi, DaiAddress, LuckyMeAddress } from "../../../lib/contract";
// import { formatEther, formatUnits } from "ethers/lib/utils";

// export default function BuyNumber({
//   open,
//   error,
//   setOpen,
//   SetError,
//   userId,
//   number,
//   Id,
//   entryFee,
// }: {
//   open: boolean;
//   error: string;
//   setOpen: any;
//   SetError: any;
//   userId: any;
//   entryFee: any;
//   number: number;
//   Id: number;
// }) {
//   const cancelButtonRef = useRef(null);
 
  
//   const address = useAddress();
//   // const [id, setId] = useState<string>();
//   // contracts
//   const { contract: daiContract } = useContract(DaiAddress, DaiAbi);
//   const { contract: LuckyMeContract } = useContract(LuckyMeAddress);

//   // Read functions
//   const { data: balance } = useContractRead(daiContract, "balanceOf", address);
//   const { data: allowance } = useContractRead(
//     daiContract,
//     "allowance",
//     address,
//     LuckyMeAddress
//   );
  
//   console.log("this is Balance method",Number(balance));
//   console.log("this is allownace method",Number(allowance)/1e7 );

//   // Write functions
//   const { mutateAsync: approve, isLoading: approveIsLoading } =
//     useContractWrite(daiContract, "approve");
//   // const callApprove = async () => {
//   //   try {

//   //     const data = await approve([LuckyMeAddress, String("1340")]);
//   //     console.info("contract call success", data);
//   //   } catch (err) {
//   //     console.error("contract call failure", err);
//   //   }
//   // };
//   const callApprove = async () => {
//     try {
//       // Multiply entryFee by 1340 to set allowance
//       const approvalAmount = String(Number(entryFee)/1e18 * Number(1340));
//       console.log("this is aprove amount ",approvalAmount)
//       const data = await approve([LuckyMeAddress, approvalAmount.toString()]);
//       console.log("Contract approval successful", data);
//     } catch (err) {
//       console.error("Contract approval failure", err);
//     }
//   }

//   const { mutateAsync: enterGame, isLoading: enterGameIsLoading } =
//     useContractWrite(LuckyMeContract, "enterGame");
//   // const callEnterGame = async () => {
//   //   try {
      
//   //     const data = await enterGame([Id, number, userId]);
//   //     SetError("done");
//   //     console.info("contract call success's", data);
//   //   } catch (err) {
//   //     console.error("contract call failure", err);
//   //     SetError("error");
//   //   }
//   // };
//     const callEnterGame = async () => {
//   try {
//     // Fetch Gentop price in USDT from an API or smart contract (mocking it here)
//     const gentopPriceInUSDT = 1.34; // Replace with dynamic fetching logic
    
//     // Convert entry fee (USDT) to Gentops
//     const amountInGentops = (entryFee * 1340)/1e18;

//     console.log(`Converted Entry Fee: ${amountInGentops} Gentops`);
    
//     const data = await enterGame([Id, number, userId, amountInGentops.toString()]);
//     // const data = await enterGame([userId, number, Id,  "1340"]);

    
//     SetError("done");
//     console.info("contract call success", data);
//   } catch (err) {
//     console.error("contract call failure", err);
//     SetError("error");
//   }
// };


//   return (
//     <Transition.Root show={open} as={Fragment}>
//       <Dialog
//         as="div"
//         className="relative z-20"
//         initialFocus={cancelButtonRef}
//         onClose={setOpen}
//       >
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
//         </Transition.Child>

//         <div className="fixed inset-0 z-20 overflow-y-auto">
//           <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               enterTo="opacity-100 translate-y-0 sm:scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//               leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             >
//               <Dialog.Panel className="relative transform overflow-hidden w-full rounded-lg border-2 border-white/40 bg-[#660e22] text-left transition-all sm:my-8 sm:w-full sm:max-w-[350px]">
//                 {error === "done" && (
//                   <div className=" flex px-4 py-4 ">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth="1.5"
//                       stroke="green"
//                       className="w-6 h-6"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>

//                     <p className="ml-2 text-white">Transaction Completed</p>
//                   </div>
//                 )}
//                 {error === "error" && (
//                   <div className=" flex px-4 py-4 ">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth="1.5"
//                       stroke="red"
//                       className="w-6 h-6 "
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
//                       />
//                     </svg>
//                     <p className="ml-2 text-white">Error in Transaction.</p>
//                   </div>
//                 )}
//                 {error === "" && (
//                   <>
//                     <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                       <div className="mt-3 text-center sm:mt-0 sm:text-left">
//                         <Dialog.Title
//                           as="h3"
//                           className="text-xl leading-6 text-white"
//                         >
//                           Number {number + 1}
//                         </Dialog.Title>
//                         <div className="mt-2">
//                           <div className="text-[16px] text-white">
//                             Entry Fee {formatEther(String(entryFee))}
                            
//                             {/* Gentop : {Number(gentopAmounta)} */}
//                           </div>
//                           <div className="text-[16px] text-white">
//                             Your balance {formatEther(String(balance || 0))}
//                           </div>
//                           <div className="text-[16px] text-white">
//                             Your allowance {formatEther(String(allowance || 0))}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className=" px-4 pb-4 sm:px-6">
//                       {Number(formatEther(String(allowance|| 0))) <
//                         Number(formatEther(String(entryFee))) &&
//                         Number(formatEther(String(balance || 0))) >=
//                           Number(formatEther(String(entryFee))) && (
//                           <button
//                             className="mb-3 block w-full rounded-lg bg-[#360712] px-3 py-2 text-[16px] text-white shadow-sm hover:opacity-60 border-2 border-white/40"
//                             onClick={callApprove}
//                             disabled={approveIsLoading}
//                           >
//                             <span className="h-4 w-4 pr-2">
//                               {approveIsLoading && (
//                                 <svg
//                                   className="animate-spin h-4 w-4 text-white inline-flex"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   fill="none"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <circle
//                                     className="opacity-25"
//                                     cx="12"
//                                     cy="12"
//                                     r="10"
//                                     stroke="currentColor"
//                                     strokeWidth="4"
//                                   ></circle>
//                                   <path
//                                     className="opacity-75"
//                                     fill="currentColor"
//                                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                   ></path>
//                                 </svg>
//                               )}
//                             </span>
//                             Approve {formatEther(String(entryFee.toFixed(2)))} Gentops
//                           </button>
//                         )}

//                       {Number(formatEther(String(balance || 0))) >=
//                       Number(formatEther(String(entryFee))) ? (
//                         <>
//                           <button
//                             className="mt-3 block w-full rounded-lg  px-3 py-2 text-[16px] text-white shadow-sm border-2 border-white/40 hover:opacity-60"
//                             onClick={callEnterGame}
//                           >
//                             <span className="h-4 w-4 pr-2">
//                               {enterGameIsLoading && (
//                                 <svg
//                                   className="animate-spin h-4 w-4 text-white inline-flex "
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   fill="none"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <circle
//                                     className="opacity-25"
//                                     cx="12"
//                                     cy="12"
//                                     r="10"
//                                     stroke="currentColor"
//                                     strokeWidth="4"
//                                   ></circle>
//                                   <path
//                                     className="opacity-75"
//                                     fill="currentColor"
//                                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                   ></path>
//                                 </svg>
//                               )}
//                             </span>
//                             Buy number {number + 1}
//                           </button>
//                         </>
//                       ) : (
//                         <p className="text-center">
//                           You do not have an enough amount
//                         </p>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// }



// // async function getPriceOfUSDTInGentop() {
// //   const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjAyOTE3ODM1LTBlYmEtNGE0My05OGQ0LTk0MzY3MjhkYTc3NSIsIm9yZ0lkIjoiNDI3OTQ5IiwidXNlcklkIjoiNDQwMTk5IiwidHlwZUlkIjoiYmE0Y2VmOTktMDUxOC00MTM0LThjOWMtZmQ3MWNiZmJiYThjIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MzgwNzUwODEsImV4cCI6NDg5MzgzNTA4MX0.hIOhTfHKjwwdC4mbe-aIEo2HoeF4mvQgHeHLWU2Ci7c'; // Replace with your API Key
// //   const usdtAddress = '0x55d398326f99059fF775485246999027B3197955'; // USDT contract address on BSC
// //   const gentopTokenAddress = '0x4DF17Ed886b3237fDbc29EdB6e4dc986433f2377'; // Replace with the gentop token contract address
// //   const chain = 'bsc'; // Specify the blockchain

// //   // Moralis Web3 API endpoint for fetching token price
// //   const url = `https://deep-index.moralis.io/api/v2/erc20/${usdtAddress}/price?chain=${chain}`;

// //   const response = await fetch(url, {
// //     method: 'GET',
// //     headers: {
// //       'X-API-Key': apiKey, // API key in the headers
// //     },
// //   });

// //   if (!response.ok) {
// //     console.error('Error fetching token price:', response.statusText);
// //     return;
// //   }

// //   const data = await response.json();
// //   const usdtPrice = data?.usdPrice; // Get price in USD (for example)

// //   // Now get the price of gentop in terms of USDT
// //   const gentopPriceUrl = `https://deep-index.moralis.io/api/v2/erc20/${gentopTokenAddress}/price?chain=${chain}`;

// //   const gentopResponse = await fetch(gentopPriceUrl, {
// //     method: 'GET',
// //     headers: {
// //       'X-API-Key': apiKey,
// //     },
// //   });

// //   if (!gentopResponse.ok) {
// //     console.error('Error fetching gentop price:', gentopResponse.statusText);
// //     return;
// //   }

// //   const gentopData = await gentopResponse.json();
// //   const gentopPrice = gentopData?.usdPrice;

// //   // Now calculate the ratio of 1 USDT in gentop
// //   const priceInGentop = usdtPrice / gentopPrice;

// //   console.log(`1 USDT Price = ${priceInGentop} gentop`);
// // }

// // getPriceOfUSDTInGentop();

// import { Fragment, useRef, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import {
//   useAddress,
//   useContract,
//   useContractRead,
//   useContractWrite,
// } from "@thirdweb-dev/react";
// import { DaiAbi, DaiAddress, LuckyMeAddress } from "../../../lib/contract";
// import { formatEther } from "ethers/lib/utils";

// export default function BuyNumber({
//   open,
//   error,
//   setOpen,
//   SetError,
//   userId,
//   number,
//   Id,
//   entryFee,
// }: {
//   open: boolean;
//   error: string;
//   setOpen: any;
//   SetError: any;
//   userId: any;
//   entryFee: any;
//   number: number;
//   Id: number;
// }) {
//   const cancelButtonRef = useRef(null);
//   const address = useAddress();

//   // contracts
//   const { contract: daiContract } = useContract(DaiAddress, DaiAbi);
//   const { contract: LuckyMeContract } = useContract(LuckyMeAddress);

//   // Read functions
//   const { data: balance } = useContractRead(daiContract, "balanceOf", address);
//   const { data: allowance } = useContractRead(
//     daiContract,
//     "allowance",
//     address,
//     LuckyMeAddress
//   );

//   // Compute how many times allowance covers entryFee
//   const allowanceMultiple =
//     Number(formatEther(String(allowance || 0))) /
//     Number(formatEther(String(entryFee || 1)));

//   // Write functions
//   const { mutateAsync: approve, isLoading: approveIsLoading } =
//     useContractWrite(daiContract, "approve");

//   const callApprove = async () => {
//     try {
//       const gentopPriceInUSDT = 1340; // Replace with dynamic fetching logic
//       const amountInGentops = ((entryFee/1e18)* gentopPriceInUSDT);
//       console.log("this is aprove entry fee",Number(entryFee/1e18) )
//       console.log(`Converted  approveEntry Fee: ${amountInGentops} Gentops`);
//       const data = await approve([LuckyMeAddress, amountInGentops.toString()]);
//       console.info("Contract call success", data);
//     } catch (err) {
//       console.error("Contract call failure", err);
//     }
//   };

//   const { mutateAsync: enterGame, isLoading: enterGameIsLoading } =
//     useContractWrite(LuckyMeContract, "enterGame");

//   const callEnterGame = async () => {
//     try {
//       const gentopPriceInUSDT = 1340; // Replace with dynamic fetching logic
//       const amountInGentops = ((entryFee/1e18)* gentopPriceInUSDT);
//       console.log("this is entry fee",Number(entryFee/1e18) )
//       console.log(`Converted Entry Fee: ${amountInGentops} Gentops`);
//       const data = await enterGame(["1", number, Id, amountInGentops.toString()]);
//       SetError("done");
//       console.info("Contract call success", data);
//     } catch (err) {
//       console.error("Contract call failure", err);
//       SetError("error");
//     }
//   };

//   return (
//     <Transition.Root show={open} as={Fragment}>
//       <Dialog
//         as="div"
//         className="relative z-20"
//         initialFocus={cancelButtonRef}
//         onClose={setOpen}
//       >
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
//         </Transition.Child>

//         <div className="fixed inset-0 z-20 overflow-y-auto">
//           <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               enterTo="opacity-100 translate-y-0 sm:scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//               leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             >
//               <Dialog.Panel className="relative transform overflow-hidden w-full rounded-lg border-2 border-white/40 bg-[#660e22] text-left transition-all sm:my-8 sm:w-full sm:max-w-[350px]">
//                 {error === "done" && (
//                   <div className="flex px-4 py-4">
//                     ✅ <p className="ml-2 text-white">Transaction Completed</p>
//                   </div>
//                 )}
//                 {error === "error" && (
//                   <div className="flex px-4 py-4">
//                     ❌ <p className="ml-2 text-white">Error in Transaction.</p>
//                   </div>
//                 )}
//                 {error === "" && (
//                   <>
//                     <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                       <div className="mt-3 text-center sm:mt-0 sm:text-left">
//                         <Dialog.Title
//                           as="h3"
//                           className="text-xl leading-6 text-white"
//                         >
//                           Number {number + 1}
//                         </Dialog.Title>
//                         <div className="mt-2">
//                           <div className="text-[16px] text-white">
//                             Entry Fee {formatEther(String(entryFee))}
//                           </div>
//                           <div className="text-[16px] text-white">
//                             Your balance {formatEther(String(balance || 0))}
//                           </div>
//                           <div className="text-[16px] text-white">
//                             Your allowance {formatEther(String(allowance || 0))}
//                           </div>
//                           <div className="text-[16px] text-white">
//                             Allowance covers entry fee{" "}
//                             <strong>
//                               {allowanceMultiple >= 1
//                                 ? `${allowanceMultiple.toFixed(2)} times`
//                                 : "Less than 1 time"}
//                             </strong>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="px-4 pb-4 sm:px-6">
//                       {Number(formatEther(String(allowance || 0))) <
//                         Number(formatEther(String(entryFee))) &&
//                         Number(formatEther(String(balance || 0))) >=
//                           Number(formatEther(String(entryFee))) && (
//                           <button
//                             className="mb-3 block w-full rounded-lg bg-[#360712] px-3 py-2 text-[16px] text-white shadow-sm hover:opacity-60 border-2 border-white/40"
//                             onClick={callApprove}
//                             disabled={approveIsLoading}
//                           >
//                             Approve {formatEther(String(entryFee))} Gentops
//                           </button>
//                         )}

//                       {Number(formatEther(String(balance || 0))) >=
//                       Number(formatEther(String(entryFee))) ? (
//                         <>
//                           <button
//                             className="mt-3 block w-full rounded-lg  px-3 py-2 text-[16px] text-white shadow-sm border-2 border-white/40 hover:opacity-60"
//                             onClick={callEnterGame}
//                           >
//                             Buy number {number + 1}
//                           </button>
//                         </>
//                       ) : (
//                         <p className="text-center">
//                           You do not have enough balance
//                         </p>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// }

// import { Fragment, useRef } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import {
//   useAddress,
//   useContract,
//   useContractRead,
//   useContractWrite,
// } from "@thirdweb-dev/react";
// import { DaiAbi, DaiAddress, LuckyMeAddress } from "../../../lib/contract";
// import { formatEther ,parseEther} from "ethers/lib/utils";

// export default function BuyNumber({
//   open,
//   error,
//   setOpen,
//   SetError,
//   userId,
//   number,
//   Id,
//   entryFee,
// }: {
//   open: boolean;
//   error: string;
//   setOpen: any;
//   SetError: any;
//   userId: any;
//   entryFee: any;
//   number: number;
//   Id: number;
// }) {
//   const cancelButtonRef = useRef(null);
//   const address = useAddress();

//   // Contracts
//   const { contract: daiContract } = useContract(DaiAddress, DaiAbi);
//   const { contract: LuckyMeContract } = useContract(LuckyMeAddress);

//   // Read functions
//   const { data: balance } = useContractRead(daiContract, "balanceOf", address);
//   const { data: allowance } = useContractRead(
//     daiContract,
//     "allowance",
//     address,
//     LuckyMeAddress
//   );

//   console.log("Balance:", Number(balance));
//   console.log("Allowance:", Number(allowance));

//   // Write functions
//   const { mutateAsync: approve, isLoading: approveIsLoading } =
//     useContractWrite(daiContract, "approve");

//   const callApprove = async () => {
//     try {
//       const approvalAmount = Number(entryFee)/1e18 * 1340;
//       console.log(`Entry Fee in approval function: ${Number(entryFee)/1e18} * 1340 = ${approvalAmount}`);

//       const data = await approve([LuckyMeAddress, parseEther(approvalAmount.toString())]);
//       console.log("Contract approval successful", data);
//     } catch (err) {
//       console.error("Contract approval failure", err);
//     }
//   };

//   const { mutateAsync: enterGame, isLoading: enterGameIsLoading } =
//     useContractWrite(LuckyMeContract, "enterGame");

//   const callEnterGame = async () => {
//     try {
//       const amountInGentops = (entryFee * 1340) / 1e18;
//       console.log(`Converted Entry Fee: ${amountInGentops} Gentops`);

//       const data = await enterGame([Id, number, userId, amountInGentops.toString()]);
//       SetError("done");
//       console.info("Contract call success", data);
//     } catch (err) {
//       console.error("Contract call failure", err);
//       SetError("error");
//     }
//   };

//   return (
//     <Transition.Root show={open} as={Fragment}>
//       <Dialog
//         as="div"
//         className="relative z-20"
//         initialFocus={cancelButtonRef}
//         onClose={setOpen}
//       >
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
//         </Transition.Child>

//         <div className="fixed inset-0 z-20 overflow-y-auto">
//           <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               enterTo="opacity-100 translate-y-0 sm:scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//               leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             >
//               <Dialog.Panel className="relative transform overflow-hidden w-full rounded-lg border-2 border-white/40 bg-[#660e22] text-left transition-all sm:my-8 sm:w-full sm:max-w-[350px]">
//                 {error === "done" && (
//                   <div className="flex px-4 py-4">
//                     ✅ <p className="ml-2 text-white">Transaction Completed</p>
//                   </div>
//                 )}
//                 {error === "error" && (
//                   <div className="flex px-4 py-4">
//                     ❌ <p className="ml-2 text-white">Error in Transaction.</p>
//                   </div>
//                 )}
//                 {error === "" && (
//                   <>
//                     <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                       <div className="mt-3 text-center sm:mt-0 sm:text-left">
//                         <Dialog.Title as="h3" className="text-xl leading-6 text-white">
//                           Number {number + 1}
//                         </Dialog.Title>
//                         <div className="mt-2">
//                           <div className="text-[16px] text-white">
//                             Entry Fee: {formatEther(String(entryFee))}
//                           </div>
//                           <div className="text-[16px] text-white">
//                             Your Balance: {formatEther(String(balance || 0))}
//                           </div>
//                           <div className="text-[16px] text-white">
//                             Your Allowance: {Number(entryFee)/1e18 * 1340} Gentops
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="px-4 pb-4 sm:px-6">
//                       {Number(formatEther(String(allowance|| 0))) <
//                         Number(formatEther(String( Number(entryFee)/1e18))) &&
//                         Number(formatEther(String(balance || 0))) >=
//                           Number(formatEther(String(entryFee))) && (
//                           <button
//                             className="mb-3 block w-full rounded-lg bg-[#360712] px-3 py-2 text-[16px] text-white shadow-sm hover:opacity-60 border-2 border-white/40"
//                             onClick={callApprove}
//                             disabled={approveIsLoading}
//                           >
//                             {approveIsLoading ? "Approving..." : `Approve ${Number(entryFee)/1e18} * 1340 = ${Number(entryFee)/1e18 * 1340} Gentops`}
//                           </button>
//                         )}

//                       {Number(formatEther(String(balance || 0))) >=
//                       Number(formatEther(String(entryFee))) ? (
//                         <button
//                           className="mt-3 block w-full rounded-lg px-3 py-2 text-[16px] text-white shadow-sm border-2 border-white/40 hover:opacity-60"
//                           onClick={callEnterGame}
//                         >
//                           {enterGameIsLoading ? "Processing..." : `Buy Number ${number + 1}`}
//                         </button>
//                       ) : (
//                         <p className="text-center text-white">
//                           You do not have enough balance
//                         </p>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// }

// import { Fragment, useRef } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import {
//   useAddress,
//   useContract,
//   useContractRead,
//   useContractWrite,
// } from "@thirdweb-dev/react";
// import { DaiAbi, DaiAddress, LuckyMeAddress } from "../../../lib/contract";
// import { formatEther, parseEther } from "ethers/lib/utils";

// export default function BuyNumber({
//   open,
//   error,
//   setOpen,
//   SetError,
//   userId,
//   number,
//   Id,
//   entryFee,
// }: {
//   open: boolean;
//   error: string;
//   setOpen: any;
//   SetError: any;
//   userId: any;
//   entryFee: any;
//   number: number;
//   Id: number;
// }) {
//   const cancelButtonRef = useRef(null);
//   const address = useAddress();

//   // Contracts
//   const { contract: daiContract } = useContract(DaiAddress, DaiAbi);
//   const { contract: LuckyMeContract } = useContract(LuckyMeAddress);

//   // Read functions
//   const { data: balance } = useContractRead(daiContract, "balanceOf", address);
//   const { data: allowance } = useContractRead(
//     daiContract,
//     "allowance",
//     address,
//     LuckyMeAddress
//   );

//   console.log("Balance:", Number(balance));
//   console.log("Allowance:", Number(allowance));

//   // Write functions
//   const { mutateAsync: approve, isLoading: approveIsLoading } =
//     useContractWrite(daiContract, "approve");

//   const callApprove = async () => {
//     try {
//       // Convert entryFee to ether and calculate Gentops amount
//       const gentopInEther = parseEther("1340");
//       const approvalAmount = (Number(entryFee) * Number(gentopInEther));
      
//       console.log("this is value of gentops in ether",Number(gentopInEther))
//       console.log(`Entry Fee in approval function: ${Number(entryFee)} * ${Number(gentopInEther)} = ${approvalAmount}`);

//       // Ensure the amount passed to parseEther is in the correct format
//       const data = await approve([LuckyMeAddress, parseEther(approvalAmount.toString())]);
//       console.log("Contract approval successful", data);
//     } catch (err) {
//       console.error("Contract approval failure", err);
//     }
//   };

//   const { mutateAsync: enterGame, isLoading: enterGameIsLoading } =
//     useContractWrite(LuckyMeContract, "enterGame");

//   const callEnterGame = async () => {
//     try {
//       // Convert entryFee to Gentops
//       const amountInGentops = (Number(entryFee) * 1340) / 1e18;
//       console.log(`Converted Entry Fee: ${amountInGentops} Gentops`);

//       const data = await enterGame([Id, number, userId, amountInGentops.toString()]);
//       SetError("done");
//       console.info("Contract call success", data);
//     } catch (err) {
//       console.error("Contract call failure", err);
//       SetError("error");
//     }
//   };

//   return (
//     <Transition.Root show={open} as={Fragment}>
//       <Dialog
//         as="div"
//         className="relative z-20"
//         initialFocus={cancelButtonRef}
//         onClose={setOpen}
//       >
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
//         </Transition.Child>

//         <div className="fixed inset-0 z-20 overflow-y-auto">
//           <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               enterTo="opacity-100 translate-y-0 sm:scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//               leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             >
//               <Dialog.Panel className="relative transform overflow-hidden w-full rounded-lg border-2 border-white/40 bg-[#660e22] text-left transition-all sm:my-8 sm:w-full sm:max-w-[350px]">
//                 {error === "done" && (
//                   <div className="flex px-4 py-4">
//                     ✅ <p className="ml-2 text-white">Transaction Completed</p>
//                   </div>
//                 )}
//                 {error === "error" && (
//                   <div className="flex px-4 py-4">
//                     ❌ <p className="ml-2 text-white">Error in Transaction.</p>
//                   </div>
//                 )}
//                 {error === "" && (
//                   <>
//                     <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                       <div className="mt-3 text-center sm:mt-0 sm:text-left">
//                         <Dialog.Title as="h3" className="text-xl leading-6 text-white">
//                           Number {number + 1}
//                         </Dialog.Title>
//                         <div className="mt-2">
//                           <div className="text-[16px] text-white">
//                             Entry Fee: {formatEther(String(entryFee))}
//                           </div>
//                           <div className="text-[16px] text-white">
//                             Your Balance: {formatEther(String(balance || 0))}
//                           </div>
//                           <div className="text-[16px] text-white">
//                             Your Allowance: {((Number(entryFee) / 1e18) * 1340).toFixed(2)} Gentops
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="px-4 pb-4 sm:px-6">
//                       {Number(formatEther(String(allowance || 0))) <
//                         Number(((Number(entryFee) / 1e18) * 1340).toFixed(2)) &&
//                         Number(formatEther(String(balance || 0))) >=
//                           Number(formatEther(String(entryFee))) && (
//                           <button
//                             className="mb-3 block w-full rounded-lg bg-[#360712] px-3 py-2 text-[16px] text-white shadow-sm hover:opacity-60 border-2 border-white/40"
//                             onClick={callApprove}
//                             disabled={approveIsLoading}
//                           >
//                             {approveIsLoading ? "Approving..." : `Approve ${((Number(entryFee) / 1e18) * 1340).toFixed(2)} Gentops`}
//                           </button>
//                         )}

//                       {Number(formatEther(String(balance || 0))) >=
//                       Number(formatEther(String(entryFee))) ? (
//                         <button
//                           className="mt-3 block w-full rounded-lg px-3 py-2 text-[16px] text-white shadow-sm border-2 border-white/40 hover:opacity-60"
//                           onClick={callEnterGame}
//                         >
//                           {enterGameIsLoading ? "Processing..." : `Buy Number ${number + 1}`}
//                         </button>
//                       ) : (
//                         <p className="text-center text-white">
//                           You do not have enough balance
//                         </p>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// }

import { Fragment, useRef,useState,useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { DaiAbi, DaiAddress, LuckyMeAddress } from "../../../lib/contract";
import { formatEther, parseEther } from "ethers/lib/utils";
import { BigNumber } from "ethers";
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
  entryFee: number;
  number: number;
  Id: number;
}) {
  const cancelButtonRef = useRef(null);
  const address = useAddress();

  // Contracts
  const { contract: daiContract } = useContract(DaiAddress, DaiAbi);
  const { contract: LuckyMeContract } = useContract(LuckyMeAddress);
  const [priceOftotalGentops,SetpriceOftotalGentops] = useState("1340.99")
  const [isApproved, setIsApproved] = useState(false);

  // Read functions
  const { data: balance } = useContractRead(daiContract, "balanceOf", address);
  const { data: allowance } = useContractRead(
    daiContract,
    "allowance",
    address,
    LuckyMeAddress
  );

  console.log("Balance:", Number(balance));
  console.log("Allowance:", Number(allowance));

  // Write functions
    async function getPriceOfUSDTInGentop() {
      const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImM5YzIzNjY4LTdhMmMtNGMxNi05NjZhLWY0ZWEyOTFjYzczZCIsIm9yZ0lkIjoiNDI3NzUzIiwidXNlcklkIjoiNDM5OTk1IiwidHlwZUlkIjoiNGE3YWRjMTQtMTgzZS00NTI2LTk0MzMtYmVjMGEwNWYyMDRiIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3Mzc5ODMzOTgsImV4cCI6NDg5Mzc0MzM5OH0.wF6kKB3EhhDMIn1CsLATm1dDxDGkvxCvIor86g5vCfE'; // Replace with your API Key
      const usdtAddress = '0x55d398326f99059fF775485246999027B3197955'; // USDT contract address on BSC
      const gentopTokenAddress = '0x4DF17Ed886b3237fDbc29EdB6e4dc986433f2377'; // Replace with the gentop token contract address
      const chain = 'bsc'; // Specify the blockchain
    
      // Moralis Web3 API endpoint for fetching token price
      const url = `https://deep-index.moralis.io/api/v2/erc20/${usdtAddress}/price?chain=${chain}`;
    
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-API-Key': apiKey, // API key in the headers
        },
      });
    
      if (!response.ok) {
        console.error('Error fetching token price:', response.statusText);
        return;
      }
    
      const data = await response.json();
      const usdtPrice = data?.usdPrice; // Get price in USD (for example)
      console.log("this is usdt Price",usdtPrice)
    
      // Now get the price of gentop in terms of USDT
      const gentopPriceUrl = `https://deep-index.moralis.io/api/v2/erc20/${gentopTokenAddress}/price?chain=${chain}`;
    
      const gentopResponse = await fetch(gentopPriceUrl, {
        method: 'GET',
        headers: {
          'X-API-Key': apiKey,
        },
      });
    
      if (!gentopResponse.ok) {
        console.error('Error fetching gentop price:', gentopResponse.statusText);
        return;
      }
    
      const gentopData = await gentopResponse.json();
      const gentopPrice = gentopData?.usdPrice;
    
      // Now calculate the ratio of 1 USDT in gentop
      const priceInGentop = (usdtPrice / gentopPrice);
      SetpriceOftotalGentops(priceInGentop.toString());
      console.log(`1 USDT Price = ${priceInGentop} gentop`);
    }
    
    useEffect(() => {
      getPriceOfUSDTInGentop();
    }, []);
  const { mutateAsync: approve, isLoading: approveIsLoading } =
    useContractWrite(daiContract, "approve");

    const callApprove = async () => {
      try {
        const gentopMultiplier = priceOftotalGentops || "1340.99"; 
        console.log("Gentop Price after Conversion:", gentopMultiplier);
    
        const entryFeeBN = entryFee || "0"; // Ensure entryFee is defined
        console.log("Entry Fee:", entryFeeBN, entryFee);
    
        const approvalAmount = Number(entryFeeBN) * Number(gentopMultiplier);
        console.log(`Approving: ${approvalAmount} Gentops`);
    
        // Convert to string without scientific notation
        const approvalAmountStr = approvalAmount.toLocaleString("fullwide", { useGrouping: false });
    
        // Convert the fixed number to BigNumber format
        const amountToApprove = parseEther(approvalAmountStr);
         console.log("This is amount Approved")
        const data = await approve([LuckyMeAddress,amountToApprove]);
        setIsApproved(true);
        console.log("Contract approval successful", data);
      
        
      } catch (err) {
        console.error("Contract approval failure", err);
      }
    };

  const { mutateAsync: enterGame, isLoading: enterGameIsLoading } =
    useContractWrite(LuckyMeContract, "enterGame");

    const callEnterGame = async () => {
      try {
        // const gentopMultiplier = BigNumber.from(priceOftotalGentops || 1340);
        // const entryFeeBN = BigNumber.from(entryFee || "0");
    
        // const amountInGentops = entryFeeBN.mul(gentopMultiplier);
    
        // console.log(`Converted Entry Fee: ${amountInGentops.toString()} Gentops`);
        const gentopMultiplier = priceOftotalGentops || "1340.99"; 
        console.log("Buy Gentop Price after Conversion:", gentopMultiplier);
    
        const entryFeeBN = entryFee || "0"; // Ensure entryFee is defined
        console.log("Buy Entry Fee:", Number(entryFeeBN), Number(entryFee));
    
        const approvalAmount = Number(entryFeeBN)/1e18 * Number(gentopMultiplier);
        console.log(`Buying: ${approvalAmount} Gentops`);
    
        // Convert to string without scientific notation
        const approvalAmountStr = approvalAmount.toLocaleString("fullwide", { useGrouping: false });
    
        // Convert the fixed number to BigNumber format
        const amountToApprove = parseEther(approvalAmountStr);
        
        console.log("This is amount to buy gentop", Number(amountToApprove))
        const data = await enterGame([Id, number, userId, amountToApprove]);
        SetError("done");
        console.info("Contract call success", data);
      } catch (err) {
        console.error("Contract call failure", err);
        SetError("error");
      }
    }


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
                  <div className="flex px-4 py-4">
                    ✅ <p className="ml-2 text-white">Transaction Completed</p>
                  </div>
                )}
                {error === "error" && (
                  <div className="flex px-4 py-4">
                    ❌ <p className="ml-2 text-white">Error in Transaction.</p>
                  </div>
                )}
                {error === "" && (
                  <>
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="mt-3 text-center sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-xl leading-6 text-white">
                          Number {number + 1}
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="text-[16px] text-white">
                            Entry Fee: {formatEther(entryFee)}
                          </div>
                          <div className="text-[16px] text-white">
                            Your Balance: {formatEther(balance || "0")}
                          </div>
         

 <div className="text-[16px] text-white">
  Your Allowance:    {(entryFee/1e18 * Number(priceOftotalGentops)||1340).toFixed(2)} Gentops
</div> 

{/* <div className="text-[16px] text-white">
  Remaining Balance After Approval:{" "}
  {formatEther(BigNumber.from(balance|| "0").sub(BigNumber.from(entryFee).mul(1340)))}
</div> */}
                        </div>
                      </div>
                    </div>
                    <div className="px-4 pb-4 sm:px-6">
                      {
                      // BigNumber.from(allowance || "0").lt(BigNumber.from(entryFee).mul(String(priceOftotalGentops))) &&
                      //   BigNumber.from(balance || "0").gte(BigNumber.from(entryFee)) && (

                     !isApproved && ( // Hide the button if approval is successful
                       
                          <button
                            className="mb-3 block w-full rounded-lg bg-[#360712] px-3 py-2 text-[16px] text-white shadow-sm hover:opacity-60 border-2 border-white/40"
                            onClick={callApprove}
                            disabled={approveIsLoading}
                          >
                            {approveIsLoading ? "Approving..." : `Approve ${(entryFee/1e18 * Number(priceOftotalGentops)||1340.99).toFixed(2)} Gentops`}
                          </button>
                      
                          ) }

                      {BigNumber.from(balance || "0").gte(BigNumber.from(entryFee)) ? (
                        <button
                          className="mt-3 block w-full rounded-lg px-3 py-2 text-[16px] text-white shadow-sm border-2 border-white/40 hover:opacity-60"
                          onClick={callEnterGame}
                        >
                          {enterGameIsLoading ? "Processing..." : `Buy Number ${number + 1}`}
                        </button>
                      ) : (
                        <p className="text-center text-white">
                          You do not have enough balance
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
