"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { HiFolderPlus } from "react-icons/hi2";
import useGetCategory from "@/hooks/useGetCategory";
import { Select } from "antd";
import classes from "./styles.module.scss";
import axios from "axios";

const page = () => {
  const { categoryData } = useGetCategory();
  const [prevImage, setPrevImage] = useState<any>();
  const [image, setImage] = useState();
  const [categories, setCategories] = useState<string[]>([]);

  const options = categoryData.map((e) => ({
    label: e.name,
    value: e.name,
  }));

  const handleImageChange = async (e: any) => {
    setPrevImage(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl;
    if (
      prevImage &&
      (prevImage.type === "image/png" ||
        prevImage.type === "image/jpg" ||
        prevImage.type === "image/jpeg")
    ) {
      const img = new FormData();
      img.append("file", prevImage);
      img.append("cloud_name", `${process.env.NEXT_CLOUDINARY_NAME}`);
      img.append(
        "upload_preset",
        `${process.env.NEXT_CLOUDINARY_UPLOAD_PRESET}`
      );
      const res = await axios.post(`${process.env.NEXT_CLOUDINARY_URL}`, img);
      console.log(res);
    }
  };

  const handleSelectChange = (value: string[]) => {
    setCategories(value);
  };

  useEffect(() => {
    if (!Cookies.get("_userInfo")) {
      redirect("/");
    }
  }, [Cookies.get("_userInfo")]);

  return (
    <div className="w-full py-16 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-[600px] w-full flex flex-col gap-10 items-start"
      >
        <h1 className="text-[32px] leading-10 font-bold">Create Blog</h1>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Upload Photo</p>
            <div className="w-full h-[180px] border-[2px] border-dashed border-[#85858D] rounded-xl bg-[#F4F3FF] flex justify-center items-center flex-col gap-6 relative">
              <HiFolderPlus size={40} color="#5D37F3" />
              <p className="text-sm font-normal text-gray-900 cursor-pointer">
                Drag & Drop Or{" "}
                <span className="underline font-bold">Choose File</span>
              </p>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full h-full opacity-0 absolute cursor-pointer"
              />
            </div>
          </div>

          {/* <div className="w-full flex gap-6 items-center">
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-sm font-medium text-gray-900">Author</p>
              <input
                type="text"
                name="author"
                placeholder="Enter Author"
                className="px-4 py-3 text-sm placeholder:text-gray-500 rounded-xl border border-[#e4e3eb] bg-[#F4F3FF]  outline-none"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-sm font-medium text-gray-900">Title</p>
              <input
                type="text"
                name="title"
                placeholder="Enter Title"
                className="px-4 py-3 text-sm placeholder:text-gray-500 rounded-xl border border-[#e4e3eb] bg-[#F4F3FF]  outline-none"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-900">Description</p>
            <textarea
              className="resize-none bg-[#f4f3ff] rounded-xl border border-[#e4e3eb] px-4 py-3 h-[124px] text-sm outline-none"
              placeholder="Enter Description "
            ></textarea>
          </div>
          <div className="flex flex-col gap-2 max-w-[288px] w-full">
            <p className="text-sm font-medium text-gray-900">Category</p>
            <Select
              mode="multiple"
              size="large"
              className={classes.select}
              allowClear
              placeholder={"Select Category"}
              onChange={handleSelectChange}
              options={options}
            ></Select>
          </div> */}
        </div>
        <button className="px-[100px] py-[10px] bg-[#5D37F3] text-white text-sm leading-5 font-medium rounded-xl">
          Publish
        </button>
      </form>
    </div>
  );
};

export default page;
