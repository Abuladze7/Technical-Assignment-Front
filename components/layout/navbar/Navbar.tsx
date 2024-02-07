"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import RegisterDialog from "@/components/login/RegisterDialog";
import Link from "next/link";
import useGetBlogs from "@/hooks/useGetBlogs";
import useGetUserInfo from "@/hooks/useGetUserInfo";

const Navbar = () => {
  // const token = Cookies.get("_userInfo");
  const { userLoading } = useGetUserInfo();
  const [open, setOpen] = useState<boolean>(false);

  // useEffect(() => {
  //   Cookies.get("_userInfo");
  // }, [token]);

  return (
    <>
      <RegisterDialog open={open} onClose={() => setOpen(false)} />
      <header className="w-full flex justify-center items-center bg-white px-6">
        <nav className="max-w-[1288px] w-full flex items-center justify-between">
          <h1 className="text-4xl text-red-500 font-bold uppercase py-7">
            Research
          </h1>
          <div className="max-w-[356px] w-full">
            <form className="w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full p-3 rounded-full bg-slate-100 outline-none border-none"
              />
            </form>
          </div>
          <div className="flex items-center gap-2">
            {!userLoading ? (
              Cookies.get("_userInfo") ? (
                <>
                  <Link
                    href={"/profile"}
                    className="py-[10px] px-5 bg-white border border-[#5D37F3] text-[#5D37F3] text-sm leading-5 font-normal rounded-lg"
                  >
                    Profile
                  </Link>
                  <Link
                    href={"/create"}
                    className="py-[10px] px-5 bg-[#5D37F3] text-white text-sm leading-5 font-normal rounded-lg ml-3"
                  >
                    Create Blog
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => setOpen(true)}
                  className="py-[10px] px-5 bg-[#5D37F3] text-white text-sm leading-5 font-normal rounded-lg"
                >
                  Login
                </button>
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
