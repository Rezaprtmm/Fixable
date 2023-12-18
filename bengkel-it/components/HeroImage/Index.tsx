import Image from "next/image";
import React from "react";

export default function HeroImage() {
  return (
    <div className="flex flex-row items-center gap-[16px] mt-[120px]">
      <Image
        src={"/images/hero-2.png"}
        width={540}
        height={300}
        alt="hero"
        className="w-[38%] -z-30"
      />
      <Image
        src={"/images/hero-3.png"}
        width={402}
        height={300}
        alt="hero"
        className="w-[28.3%] -z-30"
      />
      <Image
        src={"/images/hero-4.png"}
        width={450}
        height={300}
        alt="hero"
        className="w-[31.4%] -z-30"
      />
    </div>
  );
}
