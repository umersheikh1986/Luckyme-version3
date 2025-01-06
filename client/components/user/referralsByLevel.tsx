import { useContract, useContractRead } from "@thirdweb-dev/react";
import { LuckyMeAddress } from "../../lib/contract";
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../lib/classNames";

const ReferralsByLevel = ({ UserId }: { UserId: any }) => {
  const [plan, setPlan] = useState(2);

  const { contract } = useContract(LuckyMeAddress);
  const { data, isLoading } = useContractRead(contract, "userDetail", UserId);
  const { data: isUserExists } = useContractRead(
    contract,
    "isUserExists",
    data?.Address || "0x0000000000000000000000000000000000000000"
  );

  return (
    <div className="overflow-hidden bg-[#360712] border-2 border-white/40 sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex justify-between">
          <h3 className="text-xl leading-6 text-white">Total Referrals</h3>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-lg px-5 py-2 text-[16px] text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:opacity-50">
                {plan == 2 ? "All" : null}
                {plan == 0 ? "Standard" : null}
                {plan == 1 ? "Premium" : null}
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#660e22] text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setPlan(2)}
                        className={classNames(
                          active
                            ? "opacity-50"
                            : plan == 2
                            ? "bg-[#660e22]"
                            : "text-white",
                          "block w-full text-left px-4 py-2 text-[16px]"
                        )}
                      >
                        All
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setPlan(0)}
                        className={classNames(
                          active
                            ? "opacity-50"
                            : plan == 0
                            ? "bg-[#660e22]"
                            : "text-white",
                          "block w-full text-left px-4 py-2 text-[16px]"
                        )}
                      >
                        Standard
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setPlan(1)}
                        className={classNames(
                          active
                            ? "opacity-50"
                            : plan == 1
                            ? "bg-[#660e22]"
                            : "text-white",
                          "block w-full text-left px-4 py-2 text-[16px]"
                        )}
                      >
                        Premium
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      {isUserExists || data?.Address === undefined ? (
        <>
          {plan === 0 ? (
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-[#660e22] px-4 py-5 border-b-2 hidden sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                  <dt className="text-[16px] text-white">Level</dt>
                  <dt className="text-[16px] text-white">Standard</dt>
                </div>
                <div className="h-[430px] ">
                  {Array.from({ length: 5 }).map((i, j) => {
                    return (
                      <MembersRefByLevel
                        key={j}
                        level={j}
                        userId={String(UserId)}
                      />
                    );
                  })}
                  <div>
                    <TotalMembersRefByLevel userId={String(UserId)} />;
                  </div>
                </div>
              </dl>
            </div>
          ) : null}

          {plan === 1 ? (
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-[#660e22] px-4 py-5 border-b-2 hidden sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                  <dt className="text-[16px]  text-white">Level</dt>
                  <dt className="text-[16px]  text-white">Premium</dt>
                </div>

                <div className="h-[430px] ">
                  {Array.from({ length: 5 }).map((i, j) => {
                    return (
                      <PartnersRefByLevel
                        key={j}
                        level={j}
                        userId={String(UserId)}
                      />
                    );
                  })}
                  <div>
                    <TotalPartnersRefByLevel userId={String(UserId)} />
                  </div>
                </div>
              </dl>
            </div>
          ) : null}

          {plan === 2 ? (
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-[#660e22] px-4 py-5 border-b-2 hidden sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                  <dt className="text-[16px] text-white">Level</dt>
                  <dt className="text-[16px] text-white">Total Referrals</dt>
                </div>

                <div className="h-[430px] ">
                  {Array.from({ length: 5 }).map((i, j) => {
                    return (
                      <TotalReferralsByLevel
                        key={j}
                        level={j}
                        userId={String(UserId)}
                      />
                    );
                  })}
                  <div>
                    <TotalReferrals userId={String(UserId)} />
                  </div>
                </div>
              </dl>
            </div>
          ) : null}
        </>
      ) : (
        <div className="px-4 py-5 sm:px-6">
          <p className="text-center">
            You are not register / Wallet not connected{" "}
          </p>
        </div>
      )}
    </div>
  );
};

function MembersRefByLevel({ level, userId }: { level: number; userId: any }) {
  const { contract } = useContract(LuckyMeAddress);
  const { data, isLoading } = useContractRead(
    contract,
    "MembersRefByLevel",
    level,
    String(userId)
  );

  if (isLoading)
    return (
      <div className=" px-4 py-3 border-b-2 sm:grid items-center sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-[16px]  text-white">
          <span className="inline-flex sm:hidden text-[16px]  text-white">
            Level :
          </span>{" "}
          0
        </dt>
        <dt className="text-[16px]  text-white">
          <span className="inline-flex sm:hidden text-[16px]  text-white">
            Standard :
          </span>{" "}
          0
        </dt>
      </div>
    );

  return (
    <div className=" px-4 py-3 border-b-2 sm:grid items-center sm:grid-cols-2 sm:gap-4 sm:px-6">
      <dt className="text-[16px]  text-white">
        <span className="inline-flex sm:hidden text-[16px]  text-white">
          Level :
        </span>{" "}
        {level + 1}
      </dt>
      <dt className="text-[16px]  text-white">
        <span className="inline-flex sm:hidden text-[16px]  text-white">
          Standard :
        </span>{" "}
        {String(data)}
      </dt>
    </div>
  );
}

function TotalMembersRefByLevel({ userId }: { userId: any }) {
  const { contract } = useContract(LuckyMeAddress);
  const { data: level1, isLoading } = useContractRead(
    contract,
    "MembersRefByLevel",
    0,
    String(userId)
  );
  const { data: level2 } = useContractRead(
    contract,
    "MembersRefByLevel",
    1,
    String(userId)
  );
  const { data: level3 } = useContractRead(
    contract,
    "MembersRefByLevel",
    2,
    String(userId)
  );
  const { data: level4 } = useContractRead(
    contract,
    "MembersRefByLevel",
    3,
    String(userId)
  );
  const { data: level5 } = useContractRead(
    contract,
    "MembersRefByLevel",
    4,
    String(userId)
  );

  var total =
    Number(String(level1 || 0)) +
    Number(String(level2 || 0)) +
    Number(String(level3 || 0)) +
    Number(String(level4 || 0)) +
    Number(String(level5 || 0));

  if (isLoading)
    return (
      <div className=" px-4 py-3 border-b-2 sm:grid items-center sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-[16px]  text-white">
          <span className="inline-flex sm:hidden text-[16px]  text-white">
            Level :
          </span>{" "}
          0
        </dt>
        <dt className="text-[16px]  text-white">
          <span className="inline-flex sm:hidden text-[16px]  text-white">
            Standard :
          </span>{" "}
          0
        </dt>
      </div>
    );

  return (
    <div className="bg-[#660e22] px-4 py-3 sm:grid border sm:grid-cols-2 sm:gap-4 sm:px-6">
      <dt className="text-[16px]  text-white">
        <span className="inline-flex text-[16px]  text-white">Total</span>
      </dt>
      <dt className="text-[16px]  text-white">
        <span className="inline-flex text-[16px]  text-white">
          {Number(total)}
        </span>
      </dt>
    </div>
  );
}

function PartnersRefByLevel({ level, userId }: { level: number; userId: any }) {
  const { contract } = useContract(LuckyMeAddress);
  const { data, isLoading } = useContractRead(
    contract,
    "PartnersRefByLevel",
    level,
    String(userId)
  );

  if (isLoading)
    return (
      <div className=" px-4 py-3 border-b-2 sm:grid items-center sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-[16px]  text-white">
          <span className="inline-flex sm:hidden text-[16px]  text-white">
            Level :
          </span>{" "}
          0
        </dt>
        <dt className="text-[16px]  text-white">
          <span className="inline-flex sm:hidden text-[16px]  text-white">
            Standard :
          </span>{" "}
          0
        </dt>
      </div>
    );

  return (
    <div className=" px-4 py-3 border-b-2 sm:grid items-center sm:grid-cols-2 sm:gap-4 sm:px-6">
      <dt className="text-[16px]  text-white">
        <span className="inline-flex sm:hidden text-[16px]  text-white">
          Level :
        </span>{" "}
        {level + 1}
      </dt>
      <dt className="text-[16px]  text-white">
        <span className="inline-flex sm:hidden text-[16px]  text-white">
          Standard :
        </span>{" "}
        {String(data)}
      </dt>
    </div>
  );
}

function TotalPartnersRefByLevel({ userId }: { userId: any }) {
  const { contract } = useContract(LuckyMeAddress);
  const { data: level1, isLoading } = useContractRead(
    contract,
    "PartnersRefByLevel",
    0,
    String(userId)
  );
  const { data: level2 } = useContractRead(
    contract,
    "PartnersRefByLevel",
    1,
    String(userId)
  );
  const { data: level3 } = useContractRead(
    contract,
    "PartnersRefByLevel",
    2,
    String(userId)
  );
  const { data: level4 } = useContractRead(
    contract,
    "PartnersRefByLevel",
    3,
    String(userId)
  );
  const { data: level5 } = useContractRead(
    contract,
    "PartnersRefByLevel",
    4,
    String(userId)
  );

  var total =
    Number(String(level1 || 0)) +
    Number(String(level2 || 0)) +
    Number(String(level3 || 0)) +
    Number(String(level4 || 0)) +
    Number(String(level5 || 0));

  if (isLoading)
    return (
      <div className=" px-4 py-3 border-b-2 sm:grid items-center sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-[16px]  text-white">
          <span className="inline-flex sm:hidden text-[16px]  text-white">
            Level :
          </span>{" "}
          0
        </dt>
        <dt className="text-[16px]  text-white">
          <span className="inline-flex sm:hidden text-[16px]  text-white">
            Standard :
          </span>{" "}
          0
        </dt>
      </div>
    );

  return (
    <div className="bg-[#660e22] px-4 py-3 sm:grid border sm:grid-cols-2 sm:gap-4 sm:px-6">
      <dt className="text-[16px]  text-white">
        <span className="inline-flex text-[16px]  text-white">Total</span>
      </dt>
      <dt className="text-[16px]  text-white">
        <span className="inline-flex text-[16px]  text-white">{total}</span>
      </dt>
    </div>
  );
}

function TotalReferralsByLevel({
  level,
  userId,
}: {
  level: number;
  userId: any;
}) {
  const { contract } = useContract(LuckyMeAddress);
  const { data: Standard } = useContractRead(
    contract,
    "MembersRefByLevel",
    level,
    String(userId)
  );
  const { data: Premium, isLoading } = useContractRead(
    contract,
    "PartnersRefByLevel",
    level,
    String(userId)
  );

  if (isLoading)
    return (
      <div className=" px-4 py-3 border-b-2 sm:grid items-center sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-[16px]  text-white">
          <span className="inline-flex sm:hidden text-[16px]  text-white">
            Level :
          </span>{" "}
          0
        </dt>
        <dt className="text-[16px]  text-white">
          <span className="inline-flex sm:hidden text-[16px]  text-white">
            Total Referrals :
          </span>{" "}
          0
        </dt>
      </div>
    );

  return (
    <div className=" px-4 py-3 border-b-2 sm:grid items-center sm:grid-cols-2 sm:gap-4 sm:px-6">
      <dt className="text-[16px]  text-white">
        <span className="inline-flex sm:hidden text-[16px]  text-white">
          Level :
        </span>{" "}
        {Number(String(level || 0)) + 1}
      </dt>
      <dt className="text-[16px]  text-white">
        <span className="inline-flex sm:hidden text-[16px]  text-white">
          Standard :
        </span>{" "}
        {Number(String(Standard || 0)) + Number(String(Premium || 0))}
      </dt>
    </div>
  );
}

function TotalReferrals({ userId }: { userId: any }) {
  const { contract } = useContract(LuckyMeAddress);
  const { data: userTotalRefrerrs, isLoading } = useContractRead(
    contract,
    "userTotalRefrerrs",
    userId
  );
  const [totalRefrerrs, setTotalRefrerrs] = useState<number>(0);

  const userReferrals = () => {
    var total = 0;

    for (let i = 0; i < 5; i++) {
      const element1 = String(userTotalRefrerrs?.memberLevels[i] || 0);
      const element2 = String(userTotalRefrerrs?.partnersLevels[i] || 0);

      total += Number(element1);
      total += Number(element2);
    }

    setTotalRefrerrs(total);
  };

  useEffect(() => {
    if (userId) {
      userReferrals();
    }
  }, [userId, userTotalRefrerrs]);

  if (isLoading)
    return (
      <div className=" px-4 py-3 border-b-2 sm:grid items-center sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-[16px]  text-white">
          <span className="inline-flex sm:hidden text-[16px]  text-white">
            Level :
          </span>{" "}
          0
        </dt>
        <dt className="text-[16px]  text-white">
          <span className="inline-flex sm:hidden text-[16px]  text-white">
            Total Referrals :
          </span>{" "}
          0
        </dt>
      </div>
    );

  return (
    <div className="bg-[#660e22] px-4 py-3 sm:grid border sm:grid-cols-2 sm:gap-4 sm:px-6">
      <dt className="text-[16px] text-white">
        <span className="inline-flex text-[16px] text-white">Total</span>
      </dt>
      <dt className="text-[16px]  text-white">
        <span className="inline-flex text-[16px]  text-white">
          {totalRefrerrs}
        </span>
      </dt>
    </div>
  );
}

export default ReferralsByLevel;
