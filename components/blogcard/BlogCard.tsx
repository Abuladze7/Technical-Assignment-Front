"use client";
import { formattedDate } from "@/lib/formatedDate";
import { BlogsType } from "@/types/blogsType";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect } from "react";

const BlogCard = ({
  image,
  author,
  title,
  categories,
  updatedAt,
  description,
}: BlogsType) => {
  return (
    <div className="max-w-[408px] w-full flex flex-col gap-6">
      <img
        src={image}
        alt={title}
        width={408}
        height={328}
        className="h-[328px] rounded-xl"
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-base leading-5 font-medium text-[#1a1a1f]">
            {author}
          </p>
          <p className="text-xs font-normal text-[#85858D]">
            {formattedDate(updatedAt)}
          </p>
        </div>
        <div className="w-full flex flex-wrap items-center gap-4">
          {categories.map((e, i) => (
            <div
              key={i}
              className={`py-2 px-4 rounded-[30px] bg-[#f6f6f6] text-[#191a4e] border border-[#191a4e]`}
            >
              {e}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
