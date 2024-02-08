"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { HiFolderPlus } from "react-icons/hi2";
import useGetCategory from "@/hooks/useGetCategory";
import { Select } from "antd";
import classes from "./styles.module.scss";
import axios from "axios";
import { notifySuccess } from "@/utils/toast";
import { ToastContainer } from "react-toastify";
import Image from "next/image";

const page = () => {
  const { categoryData } = useGetCategory();
  const [prevImage, setPrevImage] = useState<any>();
  const userInfo = Cookies.get("_userToken");
  const [value, setValue] = useState<{
    author: string;
    title: string;
    description: string;
  }>({
    author: "",
    title: "",
    description: "",
  });
  const [image, setImage] = useState<string>();
  const [categories, setCategories] = useState<string[]>([]);

  const options = categoryData.map((e) => ({
    label: e.name,
    value: e.name,
  }));

  const handleImageChange = async (e: any) => {
    setPrevImage(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
    if (
      e.target.files[0] &&
      (e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpg" ||
        e.target.files[0].type === "image/jpeg")
    ) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append(
        "cloud_name",
        `${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}`
      );
      formData.append(
        "upload_preset",
        `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
      );
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`,
          formData
        );
        console.log(res.data.url);
        setImage(res.data.url);
        notifySuccess("Image uploaded successfully");
      } catch (err) {
        console.log("Upload error ", err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      categories.length !== 0 &&
      image &&
      value.author.trim() !== "" &&
      value.description.trim() !== "" &&
      value.title.trim() !== ""
    ) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/blogs`,
        {
          ...value,
          image,
          categories,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo && userInfo}`,
          },
        }
      );
      notifySuccess("Blog Created Successfully");
      setPrevImage("");
      setImage("");
      setCategories([]);
      setValue({ author: "", title: "", description: "" });
    }
  };

  const handleValueChange = (e: any) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string[]) => {
    setCategories(value);
  };

  useEffect(() => {
    if (!Cookies.get("_userToken")) {
      redirect("/");
    }
  }, [Cookies.get("_userToken")]);

  return (
    <>
      <ToastContainer />
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
                {prevImage ? (
                  <Image
                    src={prevImage}
                    alt="uploaded-picture"
                    width={600}
                    height={180}
                    className="w-full h-full"
                  />
                ) : (
                  <>
                    <HiFolderPlus size={40} color="#5D37F3" />
                    <p className="text-sm font-normal text-gray-900 cursor-pointer">
                      Drag & Drop Or{" "}
                      <span className="underline font-bold">Choose File</span>
                    </p>
                  </>
                )}
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full h-full opacity-0 absolute cursor-pointer"
                />
              </div>
            </div>

            <div className="w-full flex gap-6 items-center">
              <div className="flex flex-col gap-2 flex-1">
                <p className="text-sm font-medium text-gray-900">Author</p>
                <input
                  type="text"
                  name="author"
                  value={value.author}
                  onChange={handleValueChange}
                  placeholder="Enter Author"
                  className="px-4 py-3 text-sm placeholder:text-gray-500 rounded-xl border border-[#e4e3eb] bg-[#F4F3FF]  outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <p className="text-sm font-medium text-gray-900">Title</p>
                <input
                  type="text"
                  name="title"
                  value={value.title}
                  onChange={handleValueChange}
                  placeholder="Enter Title"
                  className="px-4 py-3 text-sm placeholder:text-gray-500 rounded-xl border border-[#e4e3eb] bg-[#F4F3FF]  outline-none"
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <p className="text-sm font-medium text-gray-900">Description</p>
              <textarea
                name="description"
                value={value.description}
                onChange={handleValueChange}
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
            </div>
          </div>
          <button className="px-[100px] py-[10px] bg-[#5D37F3] text-white text-sm leading-5 font-medium rounded-xl">
            Publish
          </button>
        </form>
      </div>
    </>
  );
};

export default page;
