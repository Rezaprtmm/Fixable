import LogoFooter from "@/public/svgs/logo-footer";

export default function Footer() {
  return (
    <div className="bg-blue-main py-[24px] mt-[120px]">
      <div className="px-[100px] mx-auto flex flex-row items-center justify-between">
        <p className="text-white font-poppins text-[16px] font-normal leading-[170%]">
          Copyright © 2023 Bengkel IT. All Rights Reserved.
        </p>
        <LogoFooter />
      </div>
    </div>
  );
}
