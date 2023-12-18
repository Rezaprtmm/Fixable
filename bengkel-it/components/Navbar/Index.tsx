import Logo from "@/public/svgs/logo";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-white w-full">
      <div className="px-[100px] mx-auto flex flex-row items-center justify-between py-[28px]">
        <Logo />
        <div className="flex flex-row items-center gap-[30px]">
          <Link
            href={"/reservation/member"}
            className="text-black font-poppins text-[16px] font-normal leading-[170%]"
          >
            Reservation
          </Link>
          <Link
            href={"/reservation/services"}
            className="text-black font-poppins text-[16px] font-normal leading-[170%]"
          >
            Services
          </Link>
          <Link
            href={"#"}
            className="text-black font-poppins text-[16px] font-normal leading-[170%]"
          >
            Portofolio
          </Link>
          <Link
            href={"/discover"}
            className="text-black font-poppins text-[16px] font-normal leading-[170%]"
          >
            Dashboard
          </Link>
        </div>
        <button className="bg-blue-main px-[24px] py-[12px] rounded-[26px] text-white font-poppins text-[16px] font-normal leading-[170%]">
          Sign In
        </button>
      </div>
    </div>
  );
}
