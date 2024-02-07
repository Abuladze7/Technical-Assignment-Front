"use client";
import axios from "axios";
import React, { useState } from "react";

const SignUpModel = ({ setIsLogin }: any) => {
  const [value, setValue] = useState<{
    name: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }>({
    name: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      value.name.trim() !== "" &&
      value.lastName.trim() !== "" &&
      value.email.trim() !== "" &&
      value.password.trim() !== "" &&
      value.passwordConfirm.trim() !== ""
    ) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/user/signup`,
        value
      );
      setIsLogin(true);
    }
  };
  return (
    <>
      <h3 className="text-2xl font-bold  text-gray-900">Sign Up</h3>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 mt-5">
        <div className="flex  gap-2">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-900">First Name</p>
            <input
              onChange={handleChange}
              value={value.name}
              type="text"
              name="name"
              className="px-4 py-2 rounded-xl border-[1.5px] border-[#5D37F3] outline-none bg-[#F7F7FF] max-w-[256px] w-full"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-900">Last Name</p>
            <input
              onChange={handleChange}
              value={value.lastName}
              type="text"
              name="lastName"
              className="px-4 py-2 rounded-xl border-[1.5px] border-[#5D37F3] outline-none bg-[#F7F7FF] max-w-[256px] w-full"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-900">Email</p>
          <input
            onChange={handleChange}
            value={value.email}
            type="email"
            name="email"
            className="px-4 py-2 rounded-xl border-[1.5px] border-[#5D37F3] outline-none bg-[#F7F7FF]"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-900">Password</p>
          <input
            onChange={handleChange}
            value={value.password}
            type="password"
            name="password"
            className="px-4 py-2 rounded-xl border-[1.5px] border-[#5D37F3] outline-none bg-[#F7F7FF]"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-900">Confirm Password</p>
          <input
            onChange={handleChange}
            value={value.passwordConfirm}
            type="password"
            name="passwordConfirm"
            className="px-4 py-2 rounded-xl border-[1.5px] border-[#5D37F3] outline-none bg-[#F7F7FF]"
            required
          />
        </div>
        <div className="w-full items-end">
          <p className=" text-xs">
            Already Have Account?{" "}
            <span
              className="text-[#5D37F3] cursor-pointer"
              onClick={() => setIsLogin(true)}
            >
              Log In Now
            </span>
          </p>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center items-center py-[10px] px-5 rounded-lg bg-[#5D37F3] text-white text-sm font-medium"
        >
          Create
        </button>
      </form>
    </>
  );
};

export default SignUpModel;
