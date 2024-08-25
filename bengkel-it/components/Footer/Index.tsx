import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-blue-main py-[24px] mt-[120px]">
      <div className="px-[100px] mx-auto flex flex-row items-center justify-between">
        <p className="text-white font-poppins text-[16px] font-normal leading-[170%]">
          Copyright © 2024 Fixable. All Rights Reserved.
        </p>
        <Image
          src={"/images/Logo-White.svg"}
          alt="Logo"
          width={0}
          height={0}
          sizes="100%"
          className="w-full max-w-[200px] h-12"
        />
      </div>
    </div>
  );
}
