import { useState } from "react";
import { classNames } from "../../lib/classNames";
import BuyNumber from "./components/buyNumber";

const NumberCard = ({
  data,
  userId,
  number,
  Id,
}: {
  data: any;
  userId: any;
  number: number;
  Id: number;
}) => {
  const [open, setOpen] = useState(false);
  const [error, SetError] = useState("");

  const openCard = () => {
    SetError("");
    setOpen(true);
  };
  return (
    <>
      {open ? (
        <BuyNumber
          error={error}
          open={open}
          setOpen={setOpen}
          SetError={SetError}
          userId={userId}
          number={number}
          Id={Id}
          entryFee={data?.EntryFee}
        />
      ) : null}

      <div
        onClick={openCard}
        className={classNames(
          String(data?.AllParticipates[number] || 0) === String(userId) &&
            String(userId) !== "0"
            ? "ring-amber-500"
            : String(data?.AllParticipates[number] || 0) !== "0"
            ? "ring-green-700"
            : "ring-white/40 cursor-pointer hover:bg-[#660e22] hover:ring-amber-500",
          "pointer-events-auto rounded-lg bg-[#360712] text-white p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-2"
        )}
      >
        <div className="flex justify-between">
          <div className="font-medium">
            {String(data?.AllParticipates[number] || 0) === "0" ? (
              <span>Pick</span>
            ) : (
              <span>ID : {String(data?.AllParticipates[number] || 0)}</span>
            )}
          </div>

          {String(data?.AllParticipates[number]) === String(userId) &&
          String(userId) !== "0" ? (
            <svg className="h-5 w-5 flex-none" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
                fill="#f59e0b"
              ></path>
            </svg>
          ) : String(data?.AllParticipates[number] || 0) !== "0" ? (
            <svg className="h-5 w-5 flex-none" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
                fill="green"
              ></path>
            </svg>
          ) : null}
        </div>
        <div className="mt-3 text-lg font-medium">{number + 1}</div>
      </div>
    </>
  );
};

export default NumberCard;
