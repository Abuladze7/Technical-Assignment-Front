"use client";
import { BlogsType } from "@/types/blogsType";
import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetBlogs = () => {
  const [blogsData, setBlogsData] = useState<BlogsType[]>([]);
  const [blogsLoading, setBlogsLoading] = useState<boolean>(true);

  const getData = async () => {
    const res: any = await axios.get(`${process.env.NEXT_PUBLIC_API}/blogs`, {
      headers: {
        "Content-Type": "Application/json",
      },
    });
    setBlogsData(res.data);
    setBlogsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return { blogsData, blogsLoading };
};

export default useGetBlogs;
