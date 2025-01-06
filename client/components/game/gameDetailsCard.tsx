import { Dialog } from "@headlessui/react";
import { formatEther } from "ethers/lib/utils";
import SlideOvers from "../ui/slideOvers";
import TotalParticipatesBar from "./components/totalParticipatesBar";
import NumberCard from "./numberCard";

interface Props {
  name: string;
  open: boolean;
  setOpen: any;
  data: any;
  Id: number;
  userId: any;
  tAmount: string;
}

const GameDetailsCard = ({
  name,
  open,
  setOpen,
  data,
  Id,
  userId,
  tAmount,
}: Props) => {
  return (
    <SlideOvers open={open} setOpen={setOpen}>
      <div className="flex h-full flex-col bg-[#660e22] text-white shadow-xl">
        <div className="p-3 sm:p-6">
          <Dialog.Title className="text-xl leading-6">
            {name} - Game {Number(String(data?.Id || 0)) + 1}
          </Dialog.Title>
        </div>
        <div className="relative flex-1 h-[100vh]">
          <div
            style={{ height: "calc(100vh - 250px)" }}
            className="p-4 sm:p-6 grid grid-cols-3 gap-4 overflow-y-scroll"
          >
            {Array.from({ length: 100 }).map((i, j) => {
              return (
                <NumberCard
                  key={j}
                  data={data}
                  userId={userId}
                  Id={Id}
                  number={j}
                />
              );
            })}
          </div>
          <div className="p-4 sm:p-6">
            <TotalParticipatesBar data={data} />
            <div className="mt-6">
              Entry Fee{" "}
              {Number(formatEther(String(data?.EntryFee || 0))).toLocaleString(
                "en-US"
              )}
              <img
                className="w-[16px] h-[16px] ml-1 inline-flex"
                src="/Dai.png"
                alt="Dai"
              />
            </div>
            <div className="mt-1">
              Total Prize Amount {""}
              {tAmount}
              <img
                className="w-[16px] h-[16px] ml-1 inline-flex"
                src="/Dai.png"
                alt="Dai"
              />
            </div>
          </div>
        </div>
      </div>
    </SlideOvers>
  );
};

export default GameDetailsCard;
