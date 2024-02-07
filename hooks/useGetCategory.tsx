"use client";
import { CategoryType } from "@/types/categoryType";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetCategory = () => {
  const [categoryData, setCategoryData] = useState<CategoryType[]>([]);
  const [catLoading, setCatLoading] = useState<boolean>(true);

  const getData = async () => {
    const res: any = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/category`,
      {
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    setCategoryData(res.data);

    setCatLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    categoryData,
    catLoading,
  };
};

export default useGetCategory;
