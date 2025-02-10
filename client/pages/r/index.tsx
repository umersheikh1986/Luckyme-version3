// // import {
// //   ConnectWallet,
// //   useAddress,
// //   useContract,
// //   useContractRead,
// // } from "@thirdweb-dev/react";
// // import Link from "next/link";
// // import { LuckyMeAddress,LuckyMeAbi } from "../../lib/contract";
// // import { useContractWrite } from "@thirdweb-dev/react";
// // import { formatEther, parseEther } from "ethers/lib/utils"; 
// // import { useRouter } from "next/router";
// // import { useState } from "react";
// // import { classNames } from "../../lib/classNames";
// // import { DaiAbi, DaiAddress  } from "../../lib/contract";
// // import Image from "next/image";



// // const UserRegisterThroughLink = ({ href }: { href?: string }) => {
// //   const router = useRouter();
// //   const address = useAddress();
// //   const [id, setId] = useState<string>();
// const [refId, setRefId] = useState<string | null>(null);
// //   console.log("this is user creation id ",id)
// //   const [selectedOption, setSelectedOption] = useState("1.0");

// //   //    contracts
// //   const { contract: daiContract } = useContract(DaiAddress, DaiAbi);
// //   const { contract: LuckyMeContract } = useContract(LuckyMeAddress ,LuckyMeAbi);

// //   //    Read functions
// //   const { data: balance, isLoading: balanceIsLoading } = useContractRead(
// //     daiContract,
// //     "balanceOf",
// //     address
// //   );
// //   // console.log("balance :", (balance).toString())
// //   const { data: allowance, isLoading: allowanceIsLoading } = useContractRead(
// //     daiContract,
// //     "allowance",
// //     address,
// //     LuckyMeAddress
// //   );

// //   //    Write functions
// //   const { mutateAsync: approve, isLoading: approveIsLoading } =
// //     useContractWrite(daiContract, "approve");
// //   const callApprove = async () => {
// //     try {
// //       const data = await approve([LuckyMeAddress, parseEther(selectedOption)]);
// //       console.info("contract call success for approve function ", data);
// //     } catch (err) {
// //       console.error("contract call failure", err);
// //     }
// //   };

// //   const { mutateAsync: register, isLoading: registerIsLoading } =
// //     useContractWrite(LuckyMeContract, "register");
// //   const callRegister = async () => {
  //   if (!refId) {
  //     console.error("Referral ID is missing.");
  //     return;
  //   }
  
  //   try {
  //     const planType = selectedOption === "0" ? 1 : 0; // Adjust plan type dynamically
  //     const amount = parseEther(selectedOption.toString()); // Use selectedOption
  
  //     console.log("Registering with:", refId, planType, address, amount.toString());
  
  //     const data = await register([refId, selectedOption == "1.0" ? "0" : "1", address, amount, { gasLimit: 3000000 }]);
  //     console.info("Registration successful", data);
  
  //     if (href) router.push(href);
  //   } catch (err) {
  //     console.error("Registration failed", err);
  //   }
  // };
// //   const handleOnChange = (e: any) => {
// //     const link = e.target.value;

// //     // Match any sequence of digits (\d+) in the link's path (/products/1234/details)
// //     const regex = /\/r\/(\d+)/;

// //     // Extract the number from the link using the regex match method
// //     const match = link.match(regex);

// //     if (match) {
// //       const number = parseInt(match[1], 10);
// //       setId(number.toString());
// //       console.log(number.toString());
// //     } else {
// //       console.log("No number found in link");
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="py-4 w-full rounded-lg mx-auto bg-[#660e22]">
// //         <div className="flex justify-center">
// //           <div className="text-lg text-white">BECOME A MEMBER</div>
// //         </div>

// //         {id !== undefined ? (
// //           <div className="mt-3 ml-1 text-white text-center">
// //             Your Sponsor ID: {id}
// //           </div>
// //         ) : null}

// //         <div className="mt-3 mb-4 col-span-6 sm:col-span-3">
// //           <label
// //             htmlFor="country"
// //             className="ml-1 block text-lg leading-6 text-white text-center"
// //           >
// //             Enter Registration Link:
// //           </label>
// //           <input
// //             name="id"
// //             placeholder="Enter the link"
// //             onChange={handleOnChange}
// //             className="mt-1 p-2.5 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
// //           />
// //         </div>
// //         {id !== undefined && (
// //           <div>
// //             <div className="mt-1 mb-6 col-span-6 sm:col-span-3">
// //               <label
// //                 htmlFor="country"
// //                 className="ml-1 block text-lg leading-6 text-white text-center"
// //               >
// //                 Select your Membership:
// //               </label>
// //               <select
// //                 id="country"
// //                 name="country"
// //                 autoComplete="country-name"
// //                 onChange={(e) => setSelectedOption(e.target.value)}
// //                 className="mt-1 block w-full rounded-md border-0  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
// //               >
// //                 <option value={"10.0"}>Premium 10 GENTOPS</option>
// //                 <option value={"1.0"}>Standard 1 GENTOP</option>
// //               </select>
// //             </div>

// //             {Number(formatEther(String(allowance || 0))) <
// //               Number(selectedOption) &&
// //               Number(formatEther(String(balance || 0))) >=
// //                 Number(selectedOption) && (
// //                 <button
// //                   className="mb-3 block w-full rounded-lg bg-[#360712] px-3 py-3 text-[16px] text-white shadow-sm hover:opacity-60 border-2 border-white/40"
// //                   onClick={callApprove}
// //                 >
// //                   <span className="h-4 w-4 pr-2">
// //                     {approveIsLoading && (
// //                       <svg
// //                         className="animate-spin h-4 w-4 text-white inline-flex"
// //                         xmlns="http://www.w3.org/2000/svg"
// //                         fill="none"
// //                         viewBox="0 0 24 24"
// //                       >
// //                         <circle
// //                           className="opacity-25"
// //                           cx="12"
// //                           cy="12"
// //                           r="10"
// //                           stroke="currentColor"
// //                           strokeWidth="4"
// //                         ></circle>
// //                         <path
// //                           className="opacity-75"
// //                           fill="currentColor"
// //                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
// //                         ></path>
// //                       </svg>
// //                     )}
// //                   </span>
// //                   Approve{" "}
// //                   {Number(String(selectedOption || 0)).toLocaleString("en-US")}{" "}
// //                   gentop
// //                 </button>
// //               )}

// //             {Number(formatEther(String(balance || 0))) >=
// //             Number(selectedOption) ? (
// //               <button
// //                 className="mt-3 block w-full rounded-lg px-3 py-3 text-[16px] text-white shadow-sm border-2 border-white/40 hover:opacity-60"
// //                 onClick={callRegister}
// //               >
// //                 <span className="h-4 w-4 pr-2">
// //                   {registerIsLoading && (
// //                     <svg
// //                       className="animate-spin h-4 w-4 text-gray-900 inline-flex "
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       fill="none"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <circle
// //                         className="opacity-25"
// //                         cx="12"
// //                         cy="12"
// //                         r="10"
// //                         stroke="currentColor"
// //                         strokeWidth="4"
// //                       ></circle>
// //                       <path
// //                         className="opacity-75"
// //                         fill="currentColor"
// //                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
// //                       ></path>
// //                     </svg>
// //                   )}
// //                 </span>
// //                 Register
// //               </button>
// //             ) : (
// //               <div className="ml-1 text-slate-700">
// //                 You do not have balance for Registration
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       <div
// //         className={classNames(
// //           balanceIsLoading ? "animate-pulse" : "animate-none",
// //           "pointer-events-auto mt-3 rounded-lg  p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 bg-[#360712] ring-1 ring-slate-700/10"
// //         )}
// //       >
// //         <div className="flex justify-between text-[18px] text-white">
// //           <span>Your Balance</span>
// //           <span className="flex">
// //             <Image className="w-[24px] mr-1"  width={500}
// //       height={500} src="/assets/gLogo.png" alt="Gentop" />
// //             <p>{formatEther(String(balance || 0))}</p>
// //           </span>
// //         </div>
// //       </div>

// //       <div
// //         className={classNames(
// //           allowanceIsLoading ? "animate-pulse" : "animate-none",
// //           "pointer-events-auto mt-3 rounded-lg  p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 bg-[#360712] ring-1 ring-slate-700/10"
// //         )}
// //       >
// //         <div className="flex justify-between text-[18px] text-white">
// //           <span>Your Allowance</span>
// //           <span className="flex">
// //             <Image className="w-[24px] mr-1"  width={500}
// //                 height={500} src="/assets/gLogo.png" alt="Dai" />
// //             <p>{formatEther(String(allowance || 0))}</p>
// //           </span>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };
// // const Index = ({ id }: { id?: any }) => {
// //   const address = useAddress();
// //   const { contract } = useContract(LuckyMeAddress);
// //   const { data, isLoading } = useContractRead(contract, "userDetail", address);
// //   console.log("testing data of fuction",data,address);
  
// //   return (
// //     <main className="mx-auto max-w-[500px] px-4 grid items-center py-8 sm:px-6 lg:px-8">
// //       {address === undefined ? (
// //         <ConnectWallet className="!bg-[#660e22] !border-2 !border-white/40" />
// //       ) : (
// //         <div className="px-8 py-4 w-full rounded-lg mx-auto bg-[#660e22] border-2 border-white/40">
// //           {String(data?.Id || 0) !== "0" ? (
// //             <div>
// //               <p className="mt-3 text-center text-lg tracking-tight text-white">
// //                 You are already registered please go to dashboard.
// //               </p>
// //               <Link
// //                 className="group items-center justify-center block w-full text-center mt-3 rounded-full py-3 px-10 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
// //                 href="/dashboard"
// //               >
// //                 Dashboard
// //               </Link>
// //             </div>
// //           ) : (
// //             <UserRegisterThroughLink href="/dashboard" />
// //           )}
// //         </div>
// //       )}
// //     </main>
// //   );
// // };
// // export default Index;

// import {
//   ConnectWallet,
//   useAddress,
//   useContract,
//   useContractRead,
//   useContractWrite,
// } from "@thirdweb-dev/react";
// import Link from "next/link";
// import { LuckyMeAddress, LuckyMeAbi, DaiAbi, DaiAddress } from "../../lib/contract";
// import { formatEther, parseEther } from "ethers/lib/utils";
// import { useRouter } from "next/router";
// import { useState } from "react";
// import Image from "next/image";

// const UserRegisterThroughLink = ({ href }: { href?: string }) => {
//   const router = useRouter();
//   const address = useAddress();
//   const [refId, setRefId] = useState<string | null>(null);
//   const [selectedOption, setSelectedOption] = useState("1.0");

//   const { contract: daiContract } = useContract(DaiAddress, DaiAbi);
//   const { contract: LuckyMeContract } = useContract(LuckyMeAddress, LuckyMeAbi);

//   const { data: balance } = useContractRead(daiContract, "balanceOf", address);
//   const { data: allowance } = useContractRead(daiContract, "allowance", address, LuckyMeAddress);

//   const { mutateAsync: approve, isLoading: approveIsLoading } = useContractWrite(daiContract, "approve");
//   const callApprove = async () => {
//     try {
//       const data = await approve([LuckyMeAddress, parseEther(selectedOption)]);
//       console.info("Approval success", data);
//     } catch (err) {
//       console.error("Approval failed", err);
//     }
//   };

//   const { mutateAsync: register, isLoading: registerIsLoading } = useContractWrite(LuckyMeContract, "register");
//   const callRegister = async () => {
//     if (!refId) {
//       console.error("Referral ID is missing.");
//       return;
//     }

//     try {
//       const planType = selectedOption === "1.0" ? 0 : 1;
//       const amount = parseEther(selectedOption);

//       console.log("Registering with:", refId, planType, address, amount.toString());

//       const data = await register([refId, planType, address, amount, { gasLimit: 3000000 }]);
//       console.info("Registration successful", data);

//       if (href) router.push(href);
//     } catch (err) {
//       console.error("Registration failed", err);
//     }
//   };

//   const handleOnChange = (e: any) => {
//     const link = e.target.value;
//     const regex = /\/r\/(\d+)/;
//     const match = link.match(regex);

//     if (match) {
//       setRefId(match[1]);
//       console.log("Extracted referral ID:", match[1]);
//     } else {
//       console.log("Invalid link format");
//     }
//   };

//   return (
//     <div className="py-4 w-full rounded-lg mx-auto bg-[#660e22]">
//       <div className="flex justify-center">
//         <div className="text-lg text-white">BECOME A MEMBER</div>
//       </div>

//       {refId && <div className="mt-3 text-white text-center">Your Sponsor ID: {refId}</div>}

//       <div className="mt-3 mb-4">
//         <label className="block text-lg text-white text-center">Enter Registration Link:</label>
//         <input
//           name="id"
//           placeholder="Enter the link"
//           onChange={handleOnChange}
//           className="mt-1 p-2.5 w-full rounded-md bg-white text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-600"
//         />
//       </div>

//       {refId && (
//         <>
//           <div className="mt-1 mb-6">
//             <label className="block text-lg text-white text-center">Select your Membership:</label>
//             <select
//               onChange={(e) => setSelectedOption(e.target.value)}
//               className="mt-1 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-600"
//             >
//               <option value={"10.0"}>Premium 10 GENTOPS</option>
//               <option value={"1.0"}>Standard 1 GENTOP</option>
//             </select>
//           </div>

//           {Number(formatEther(String(allowance || 0))) < Number(selectedOption) &&
//             Number(formatEther(String(balance || 0))) >= Number(selectedOption) && (
//               <button
//                 className="mb-3 w-full rounded-lg bg-[#360712] px-3 py-3 text-white shadow-sm border-2 border-white/40 hover:opacity-60"
//                 onClick={callApprove}
//               >
//                 {approveIsLoading ? "Approving..." : `Approve ${selectedOption} GENTOP`}
//               </button>
//             )}

//           {Number(formatEther(String(balance || 0))) >= Number(selectedOption) ? (
//             <button
//               className="mt-3 w-full rounded-lg px-3 py-3 text-white shadow-sm border-2 border-white/40 hover:opacity-60"
//               onClick={callRegister}
//             >
//               {registerIsLoading ? "Registering..." : "Register"}
//             </button>
//           ) : (
//             <div className="text-center text-red-500">Insufficient balance for registration</div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// const Index = () => {
//   const address = useAddress();
//   const { contract } = useContract(LuckyMeAddress);
//   const { data, isLoading } = useContractRead(contract, "userDetail", address);

//   return (
//     <main className="mx-auto max-w-[500px] px-4 grid items-center py-8">
//       {!address ? (
//         <ConnectWallet className="!bg-[#660e22] !border-2 !border-white/40" />
//       ) : (
//         <div className="px-8 py-4 w-full rounded-lg mx-auto bg-[#660e22] border-2 border-white/40">
//           {String(data?.Id || 0) !== "0" ? (
//             <>
//               <p className="text-center text-lg text-white">You are already registered. Go to the dashboard.</p>
//               <Link className="mt-3 block text-center text-white bg-slate-900 rounded-full py-3 hover:bg-slate-700" href="/dashboard">
//                 Dashboard
//               </Link>
//             </>
//           ) : (
//             <UserRegisterThroughLink href="/dashboard" />
//           )}
//         </div>
//       )}
//     </main>
//   );
// };

// export default Index;

import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import Link from "next/link";
import { LuckyMeAddress, LuckyMeAbi, DaiAbi, DaiAddress } from "../../lib/contract";
import { formatEther, parseEther } from "ethers/lib/utils";
import { useRouter } from "next/router";
import { classNames } from "../../lib/classNames";
import { useState ,useEffect} from "react";
import Image from "next/image";

const GENTOPS_PER_USDT = 1340.4; // Conversion rate
const AMOUNT_IN_GENTOPS = 1340; // Fixed registration amount


const UserRegisterThroughLink = ({ href }: { href?: string }) => {
  const router = useRouter();
  const address = useAddress();
  
  const [refId, setRefId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState("26800.18");
  const [priceOftotalGentops,SetpriceOftotalGentops] = useState<string | null>(null)
  const [isApproved, setIsApproved] = useState(false);


  const { contract: daiContract } = useContract(DaiAddress, DaiAbi);
  const { contract: LuckyMeContract } = useContract(LuckyMeAddress, LuckyMeAbi);

  const { data: balance , isLoading: balanceIsLoading } = useContractRead(daiContract, "balanceOf", address);
  const { data: allowance , isLoading: allowanceIsLoading} = useContractRead(daiContract, "allowance", address, LuckyMeAddress);

  const { mutateAsync: approve, isLoading: approveIsLoading } = useContractWrite(daiContract, "approve");
  // const callApprove = async () => {
  //   try {
  //     const data = await approve([LuckyMeAddress, parseEther(AMOUNT_IN_GENTOPS.toString())]);
  //     console.info("Approval success", data);
  //   } catch (err) {
  //     console.error("Approval failed", err);
  //   }
  // };
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
    const priceInGentop = (usdtPrice / gentopPrice)*20;
    SetpriceOftotalGentops(priceInGentop.toFixed(2).toString());
    console.log(`1 USDT Price = ${priceInGentop} gentop`);
  }
  
  useEffect(() => {
    getPriceOfUSDTInGentop();
  }, []);
  const callApprove = async () => {
    try {
      const amountToApprove = parseEther(selectedOption.toString()); // Use selected option for approval
      console.log(`Approving: ${amountToApprove.toString()} Gentops`);
  
      const data = await approve([LuckyMeAddress,parseEther(selectedOption)]);
      // setIsApproved(true);
      console.info("Approval success", data);
    } catch (err) {
      console.error("Approval failed", err);
    }
  };
  

  const { mutateAsync: register, isLoading: registerIsLoading } = useContractWrite(LuckyMeContract, "register");
  // const callRegister = async () => {
  //   if (!refId) {
  //     console.error("Referral ID is missing.");
  //     return;
  //   }

  //   try {
  //     const planType = selectedOption === "1.0" ? 0 : 1;
  //     console.log("this is membership",selectedOption)
  //     const amount = parseEther(AMOUNT_IN_GENTOPS.toString());

  //     console.log("Registering with:", refId, planType, address, amount.toString());

  //     const data = await register([refId, planType, address, amount, { gasLimit: 3000000 }]);
  //     console.info("Registration successful", data);

  //     if (href) router.push(href);
  //   } catch (err) {
  //     console.error("Registration failed", err);
  //   }
  // };
  const callRegister = async () => {
    if (!refId) {
      console.error("Referral ID is missing.");
      return;
    }
  
    try {
      const planType = selectedOption === "0" ? "1" : 0; // Adjust plan type dynamically
      const amount = parseEther(selectedOption.toString()); // Use selectedOption
  
      console.log("Registering with:", refId, planType, address, amount.toString());
  
      const data = await register([refId, selectedOption == "26800.18" ||priceOftotalGentops?.toString() ? "1" : "0", address,amount, { gasLimit: 3000000 }]);
      console.info("Registration successful", data);
  
      if (href) router.push(href);
    } catch (err) {
      console.error("Registration failed", err);
    }
  };
  
  const handleOnChange = (e: any) => {
    const link = e.target.value;
 if (link===String)
  {
    const regex = /\/r\/(\d+)/;
    const match = link.match(regex)
 
    if (match) {

  setRefId(match[1]);
  console.log("Extracted referral ID:", match[1]);
}}
else{
    setRefId(link);
}
    
  };

  return (
    <div className="py-4 w-full rounded-lg mx-auto bg-[#660e22]">
      <div className="flex justify-center">
        <div className="text-lg text-white">BECOME A MEMBER</div>
      </div>

      {refId && <div className="mt-3 text-white text-center">Your Sponsor ID: {refId}</div>}

      <div className="mt-3 mb-4">
        <label className="block text-lg text-white text-center">Enter Referral Link Or eferral ID :</label>
        <input
          name="id"
          placeholder="Enter the link"
          onChange={handleOnChange}
          className="mt-1 p-2.5 w-full rounded-md bg-white text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {refId &&  (
        <>
          <div className="mt-1 mb-6">
            <label className="block text-lg text-white text-center">Select your Membership:</label>
            <select
              onChange={(e) => setSelectedOption(e.target.value)}
              className="mt-1 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-600"
            >
              {/* <option value={"68240.0"}>Premium 20 USDT</option> */}
              <option value={priceOftotalGentops?.toString()|| "26800"}>Premium 20 USDT</option>

              <option value={"0.0"}>Standard 1 USDT</option>
            </select>
          </div>

          {Number(formatEther(String(allowance || 0))) < AMOUNT_IN_GENTOPS &&
            Number(formatEther(String(balance || 0))) >= AMOUNT_IN_GENTOPS && (
              // !isApproved && ( // Hide the button if approval is successful
              <button
                className="mb-3 w-full rounded-lg bg-[#360712] px-3 py-3 text-white shadow-sm border-2 border-white/40 hover:opacity-60"
                onClick={callApprove}
              >
                {/* {approveIsLoading ? "Approving..." : `Approve ${AMOUNT_IN_GENTOPS} GENTOPS`} */}
                {approveIsLoading ? "Approving..." : `Approve ${selectedOption} GENTOPS`}

              </button>
            )}

          {Number(formatEther(String(balance || 0))) >= AMOUNT_IN_GENTOPS ? (
            <button
              className="mt-3 w-full rounded-lg px-3 py-3 text-white shadow-sm border-2 border-white/40 hover:opacity-60"
              onClick={callRegister}
            >
              {registerIsLoading ? "Registering..." : "Register"}
            </button>
          ) : (
            <div className="text-center text-red-500">Insufficient balance for registration</div>
          )}
           <div
        className={classNames(
          balanceIsLoading ? "animate-pulse" : "animate-none",
          "pointer-events-auto mt-3 rounded-lg  p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 bg-[#360712] ring-1 ring-slate-700/10"
        )}
      >
        <div className="flex justify-between text-[18px] text-white">
          <span>Your Balance</span>
          <span className="flex">
            <Image className="w-[24px] mr-1"  width={500}
      height={500} src="/assets/gLogo.png" alt="Gentop" />
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
            <Image className="w-[24px] mr-1"  width={500}
                height={500} src="/assets/gLogo.png" alt="Dai" />
            <p>{formatEther(String(allowance || 0))}</p>
          </span>
        </div>
      </div>
        </>
      )}
    </div>
  );
};

const Index = () => {
  const address = useAddress();
  const { contract } = useContract(LuckyMeAddress);
  const { data, isLoading } = useContractRead(contract, "userDetail", address);

  return (
    <main className="mx-auto max-w-[500px] px-4 grid items-center py-8">
      {!address ? (
        <ConnectWallet className="!bg-[#660e22] !border-2 !border-white/40" />
      ) : (
        <div className="px-8 py-4 w-full rounded-lg mx-auto bg-[#660e22] border-2 border-white/40">
          {String(data?.Id || 0) !== "0" ? (
            <>
              <p className="text-center text-lg text-white">You are already registered. Go to the dashboard.</p>
              <Link className="mt-3 block text-center text-white bg-slate-900 rounded-full py-3 hover:bg-slate-700" href="/dashboard">
                Dashboard
              </Link>
            </>
          ) : (
            <UserRegisterThroughLink href="/dashboard" />
          )}
        </div>
      )}
    </main>
  );
};

export default Index;
