"use client";
import Logo from "@/public/svgs/logo";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Navbar() {
  const request = "halo";
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [username, setUsername] = useState("Sign In");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const checkSession = await axios.post("http://localhost:3001/session", {
        request,
      });
      if (checkSession.data) {
        setUsername(checkSession.data);
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    };

    fetchData();
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>,
    buttonText: string
  ) => {
    e.preventDefault();

    if (!isLogin) {
      window.location.href = "http://localhost:3000/sign-in";
    } else if (isLogin && buttonText == "Reservation") {
      window.location.href = "http://localhost:3000/reservation/member";
    } else if (isLogin && buttonText == "Dashboard") {
      window.location.href = "http://localhost:3000/discover";
    }
  };

  const handleLogout = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    fetch("http://localhost:3001/signout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ request }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          window.location.href = "http://localhost:3000";
        } else {
          alert("Gagal logout. Coba lagi.");
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
      });
  };

  return (
    <div className="w-full px-[100px] mx-auto flex flex-row items-center justify-between py-[28px]">
      <div className="w-full max-w-[150px]">
        <Image
          src={"/images/Logo.svg"}
          alt="Logo"
          width={0}
          height={0}
          sizes="100%"
          className="w-full h-12"
        />
      </div>
      <div className="w-full flex flex-row items-center justify-center gap-[30px]">
        <button
          onClick={(e) => handleSubmit(e, "Reservation")}
          className="text-black font-poppins text-[16px] font-normal leading-[170%]"
        >
          Reservation
        </button>
        <Link
          href={"#services"}
          className="text-black font-poppins text-[16px] font-normal leading-[170%]"
        >
          Services
        </Link>
        <Link
          href={"#portofolio"}
          className="text-black font-poppins text-[16px] font-normal leading-[170%]"
        >
          Portofolio
        </Link>
        <button
          onClick={(e) => handleSubmit(e, "Dashboard")}
          className="text-black font-poppins text-[16px] font-normal leading-[170%]"
        >
          Dashboard
        </button>
      </div>
      {isLogin ? (
        <div className="flex flex-col relative w-full max-w-[150px]">
          <button
            className="bg-gradient-to-r from-black to-blue-main bg-transparent px-[24px] py-[12px] rounded-[26px] text-white font-poppins text-[16px] font-normal leading-[170%]"
            onClick={handleOpen}
          >
            {username}
          </button>
          {isOpen && (
            <div className="bg-white w-[220px] flex flex-col absolute top-[50px] z-10 px-[20px] right-0 border-[1px] border-[#D5D5D5] mt-[10px] rounded-[10px] divide-[#D5D5D5] divide-y-[1px]">
              <Link
                href={"/profile"}
                className="text-black font-poppins text-[16px] font-normal leading-normal py-[20px]"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-black font-poppins text-[16px] text-start font-normal leading-normal py-[20px]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          className="bg-gradient-to-r from-black to-blue-main w-full max-w-[150px] py-[12px] rounded-[26px] text-white font-poppins text-[16px] font-normal leading-[170%]"
          onClick={(e) => handleSubmit(e, "Login")}
        >
          Sign In
        </button>
      )}
    </div>
  );
}
