import InputLabelProfile from "@/components/InputLabelProfile/Index";
import Sidebar from "@/components/Sidebar/Index";
import Topbar from "@/components/Topbar/Index";
import Copy from "@/public/svgs/copy";
import IconEditImage from "@/public/svgs/icon-edit-img";
import IconEditPhone from "@/public/svgs/icon-edit-phone";
import Image from "next/image";

export default function Profile() {
  return (
    <div>
      <Sidebar className="border-[3px] border-info-main" />
      <Topbar />
      <div className="ml-64 flex flex-col px-[40px] mt-[40px] pb-[67px]">
        <h3 className="text-black font-poppins text-[22px] font-normal leading-[150%]">
          Reservation
        </h3>
        <div className="mt-[24px] grid grid-cols-3 gap-[40px]">
          <div className="flex flex-col gap-[16px]">
            <p className="text-dark-1 font-poppins text-[16px] font-normal leading-[170%]">
              Profile Image
            </p>
            <Image
              src={"/images/set-profile.png"}
              width={300}
              height={300}
              alt="profile"
              className="w-full rounded-[15px]"
            />
            <button className="flex flex-row items-center gap-[8px] justify-center text-info-main font-poppins text-[12px] font-normal leading-[170%]">
              <IconEditImage />
              Change Profile Image
            </button>
          </div>
          <div className="col-span-2 flex flex-col">
            <p className="text-dark-1 font-poppins text-[16px] font-normal leading-[170%]">
              Onboarding
            </p>
            <div className="flex flex-col mt-[16px] gap-[16px]">
              <InputLabelProfile label="Registered on" />
              <InputLabelProfile label="Role" />
            </div>
            <p className="text-dark-1 font-poppins text-[16px] font-normal leading-[170%] mt-[24px]">
              Onboarding
            </p>
            <div className="flex flex-col mt-[16px] gap-[16px]">
              <InputLabelProfile label="Customer ID" />
              <InputLabelProfile label="Full Name" />
              <InputLabelProfile label="Username" />
              <InputLabelProfile
                label="Email"
                icon={<Copy className="text-info-main" />}
              />
              <InputLabelProfile label="Phone" icon={<IconEditPhone />} />
            </div>
            <button className="bg-info-main rounded-[10px] py-[16px] mt-[16px] text-white font-poppins text-[16px] font-normal leading-[170%]">
              Edit Information
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
