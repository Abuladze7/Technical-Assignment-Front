"use client";
import BlogCard from "@/components/blogcard/BlogCard";
import useGetBlogs from "@/hooks/useGetBlogs";
import useGetCategory from "@/hooks/useGetCategory";
import { BlogsType } from "@/types/blogsType";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const { blogsData, blogsLoading } = useGetBlogs();
  const { categoryData } = useGetCategory();
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (str: string) => {
    if (selected.includes(str)) {
      setSelected((prev) => prev.filter((e) => e !== str));
    } else {
      setSelected([...selected, str]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-16">
      <div className="w-full flex items-center justify-between pt-16">
        <h1 className="text-[64px] leading-[72px] font-bold">BLOGS</h1>
        <Image
          src={"/images/home/home-img.png"}
          alt="main-img"
          width={624}
          height={200}
        />
      </div>
      <div className="mx-auto flex items-center gap-6">
        {categoryData.map((e, i) => (
          <button
            key={i}
            className={`py-2 px-4 rounded-[30px] bg-[#f6f6f6] text-[#191a4e] border ${
              selected.includes(e.name) && "border-[#191a4e]"
            }`}
            onClick={() => handleSelect(e.name)}
          >
            {e.name}
          </button>
        ))}
      </div>
      <div className="w-full flex gap-8 items-center flex-wrap">
        {blogsLoading ? (
          <p className="mx-auto">loading...</p>
        ) : (
          blogsData.map((e) => <BlogCard {...e} key={e._id} />)
        )}
      </div>
    </div>
  );
}
