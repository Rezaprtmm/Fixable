"use client";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const request = "halo";
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    fetch("http://localhost:3001/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ request }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          window.location.href = "http://localhost:3000/sign-in";
        } else {
          window.location.href = "http://localhost:3000/reservation/member";
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
      });
  };
  return (
    <div className="px-[100px] mx-auto flex flex-col items-center gap-[24px]">
      <h1 className="w-[1030px] bg-gradient-to-r from-black to-blue-main text-transparent bg-clip-text font-poppins text-[44px] font-bold leading-[130%] text-center z-10 mt-[120px]">
        Before it turns to dust, <br />
        everything can be fixed.
      </h1>
      <p className="text-black font-poppins text-[16px] font-normal leading-[170%] text-center">
        Quick solution to your technology problems, find your way at Bengkel IT!
      </p>
      <div className="flex flex-row items-center gap-[16px]">
        <button
          className="bg-gradient-to-r from-black to-blue-main rounded-[26px] px-[24px] py-[12px] text-white font-poppins text-[16px] font-normal leading-[170%]"
          onClick={handleSubmit}
        >
          Reserve now
        </button>
        <Link
          href={"#consultation"}
          className="relative inline-block rounded-[26px] p-[2px] bg-gradient-to-r from-black to-blue-main"
        >
          <div className="bg-white rounded-[24px] px-[24px] py-[12px]">
            <span className="bg-gradient-to-r from-black to-blue-main bg-clip-text text-transparent font-poppins text-[16px] font-normal leading-[170%]">
              Consultation
            </span>
          </div>
        </Link>
      </div>
      <Image
        src={"/images/hero.png"}
        width={1240}
        height={501}
        alt="hero"
        className="absolute -z-10"
      />
    </div>
  );
}
