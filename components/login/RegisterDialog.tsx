"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import React from "react";
import LoginModel from "./LoginModel";
import SignUpModel from "./SignUpModel";

const RegisterDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  // useEffect(() => {
  //   console.log(isLogin);
  // }, [isLogin]);
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col items-center">
                {/* <h3 className="text-2xl font-bold  text-gray-900">Log In</h3>
                <form className="w-full flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <input
                      type="email"
                      className="px-4 py-2 rounded-xl border-[1.5px] border-[#5D37F3] outline-none bg-[#F7F7FF]"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-gray-900">
                      Password
                    </p>
                    <input
                      type="password"
                      className="px-4 py-2 rounded-xl border-[1.5px] border-[#5D37F3] outline-none bg-[#F7F7FF]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center py-[10px] px-5 rounded-lg bg-[#5D37F3] text-white text-sm font-medium"
                  >
                    Log In
                  </button>
                </form> */}
                {isLogin ? (
                  <LoginModel setIsLogin={setIsLogin} onClose={onClose} />
                ) : (
                  <SignUpModel setIsLogin={setIsLogin} />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RegisterDialog;
