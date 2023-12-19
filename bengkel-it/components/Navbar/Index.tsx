"use client";
import Logo from "@/public/svgs/logo";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

export default function Navbar() {
  const request = "halo";
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [username, setUsername] = useState("Sign In");
  window.onload = async function () {
    const checkSession = await axios.post("http://localhost:3001/session", { request });
    if (checkSession.data) {
      setUsername(checkSession.data);
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isLogin) {
      window.location.href = "/sign-in";
    }
  };
  return (
    <div className="bg-white w-full">
      <div className="px-[100px] mx-auto flex flex-row items-center justify-between py-[28px]">
        <Logo />
        <div className="flex flex-row items-center gap-[30px]">
          <Link href={"/reservation/member"} className="text-black font-poppins text-[16px] font-normal leading-[170%]">
            Reservation
          </Link>
          <Link href={"/reservation/services"} className="text-black font-poppins text-[16px] font-normal leading-[170%]">
            Services
          </Link>
          <Link href={"#"} className="text-black font-poppins text-[16px] font-normal leading-[170%]">
            Portofolio
          </Link>
          <Link href={"/discover"} className="text-black font-poppins text-[16px] font-normal leading-[170%]">
            Dashboard
          </Link>
        </div>
        {isLogin ? (
          <button className="bg-blue-main px-[24px] py-[12px] rounded-[26px] text-white font-poppins text-[16px] font-normal leading-[170%]" onClick={handleSubmit}>
            {username}
          </button>
        ) : (
          <button className="bg-blue-main px-[24px] py-[12px] rounded-[26px] text-white font-poppins text-[16px] font-normal leading-[170%]" onClick={handleSubmit}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
