"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

const page = () => {
  const handleLogOut = () => {
    Cookies.remove("_userInfo");
    setTimeout(() => {
      location.reload();
    }, 2000);
  };

  useEffect(() => {
    if (!Cookies.get("_userInfo")) {
      redirect("/");
    }
  }, [Cookies.get("_userInfo")]);

  return (
    <div>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default page;
