import { useContract, useContractRead } from "@thirdweb-dev/react";
import { LuckyMeAddress } from "../../lib/contract";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../lib/classNames";

const AdminC = () => {
  const [plan, setPlan] = useState(2);

  const { contract } = useContract(LuckyMeAddress);
  const { data, isLoading } = useContractRead(contract, "UsersIds");

  return (
    <div className="overflow-hidden bg-[#360712] border-2 border-white/40 sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex justify-between">
          <h3 className="text-xl leading-6 text-white">Total Referrals</h3>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-lg px-5 py-2 text-[16px] text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:opacity-60">
                {plan == 2 ? "All" : null}
                {plan == 0 ? "Standard" : null}
                {plan == 1 ? "Premium" : null}
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-400"
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
                          "block w-full text-left px-4 py-2 text-sm"
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
                          "block w-full text-left px-4 py-2 text-sm"
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
                            : plan == 0
                            ? "bg-[#660e22]"
                            : "text-white",
                          "block w-full text-left px-4 py-2 text-sm"
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

      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-[#660e22] px-4 py-5 border-b-2 hidden sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-[16px] text-white">Plan</dt>
            <dt className="text-[16px] text-white">Id</dt>
            <dt className="text-[16px] text-white">Ref</dt>
            <dt className="text-[16px] text-white">Address</dt>
          </div>

          <div className="h-[430px]">
            {Array.from({ length: Number(String(data || 0)) + 1 }).map(
              (i, j) => {
                if (j === 0) return <></>;
                return <Users key={j} userId={j} plan={plan} />;
              }
            )}
          </div>
        </dl>
      </div>
    </div>
  );
};

function Users({ userId, plan }: { userId: any; plan: number }) {
  const { contract } = useContract(LuckyMeAddress);
  const { data, isLoading } = useContractRead(
    contract,
    "userDetail",
    String(userId)
  );

  if (Number(String(data?.Plan)) === plan || plan === 2) {
    return (
      <div className="bg-[#360712] px-4 py-3 border-b-2 sm:grid items-center sm:grid-cols-4 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-white">
          <span className="inline-flex sm:hidden text-sm font-medium text-white">
            Plan :
          </span>{" "}
          {String(data?.Plan || 0) === "0" ? "Standard" : "Premium"}
        </dt>
        <dt className="text-sm font-medium text-white">
          <span className="inline-flex sm:hidden text-sm font-medium text-white">
            Id :
          </span>{" "}
          {String(data?.Id || 0)}
        </dt>
        <dt className="text-sm font-medium text-white">
          <span className="inline-flex sm:hidden text-sm font-medium text-white">
            Ref :
          </span>{" "}
          {String(data?.Ref)}
        </dt>
        <dt className="text-sm font-medium text-white">
          <span className="inline-flex sm:hidden text-sm font-medium text-white">
            Address :
          </span>{" "}
          {data?.Address.slice(0, 6)}...{data?.Address.slice(-6)}
        </dt>
      </div>
    );
  }

  return <></>;
}

export default AdminC;
