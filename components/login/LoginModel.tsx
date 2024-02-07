"use client";
import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { notifySuccess } from "@/utils/toast";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const LoginModel = ({ setIsLogin }: any) => {
  const [value, setValue] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (value.email.trim() !== "" && value.password.trim() !== "") {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/user/login`,
        value
      );
      Cookies.set("_userInfo", res.data, { expires: 7 });
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <h3 className="text-2xl font-bold  text-gray-900">Log In</h3>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-900">Email</p>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={value.email}
            className="px-4 py-2 rounded-xl border-[1.5px] border-[#5D37F3] outline-none bg-[#F7F7FF]"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-900">Password</p>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={value.password}
            className="px-4 py-2 rounded-xl border-[1.5px] border-[#5D37F3] outline-none bg-[#F7F7FF]"
            required
          />
        </div>
        <div className="w-full items-end">
          <p className=" text-xs">
            Dont Have Account?{" "}
            <span
              className="text-[#5D37F3] cursor-pointer"
              onClick={() => setIsLogin(false)}
            >
              Create Now
            </span>
          </p>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center items-center py-[10px] px-5 rounded-lg bg-[#5D37F3] text-white text-sm font-medium"
        >
          Log In
        </button>
      </form>
    </>
  );
};

export default LoginModel;
