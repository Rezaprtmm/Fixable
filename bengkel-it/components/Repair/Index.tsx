import ArrowNav from "@/public/svgs/arrow-nav";
import Image from "next/image";

export default function Repair() {
  return (
    <div className="bg-blue-darker w-full mt-[120px]" id="portofolio">
      <div className="pl-[170px] flex flex-row pt-[120px] gap-[125px]">
        <div className="w-[43%]">
          <h3 className="bg-gradient-to-r from-blue-lighter to-white bg-clip-text text-transparent font-poppins text-[44px] font-bold leading-[130%]">
            What we&lsquo;ve done
          </h3>
          <p className="text-light-1 font-poppins text-[16px] font-normal leading-[170%] mt-[16px]">
            Some problems we have resolved.
          </p>
          <div className="flex flex-row gap-[10px] mt-[16px]">
            <ArrowNav className="bg-white p-[8px] rounded-[32px]" />
            <ArrowNav className="bg-white p-[8px] rounded-[32px] rotate-180" />
          </div>
        </div>
        <div className="w-[57%] flex flex-row">
          <Image
            src={"/images/harddisk.png"}
            width={815}
            height={580}
            alt="harddisk"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
