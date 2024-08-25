import Gmail from "@/public/svgs/gmail";
import Telegram from "@/public/svgs/telegram";
import WhatsApp from "@/public/svgs/whatsapp";
import React from "react";
import { Icon } from "@iconify/react";

export default function Consult() {
  return (
    <div className="px-[100px] flex flex-col  mt-[120px]" id="consultation">
      <div className="bg-blue-subtle rounded-[30px] py-[60px]">
        <h3 className="text-blue-main font-poppins text-center text-[44px] font-bold leading-[130%]">
          Want to consult with us?
        </h3>
        <p className="text-dark-1 text-center font-poppins text-[16px] font-normal leading-[170%] mt-[16px]">
          Please contact us via
        </p>
        <div className="w-full flex flex-row items-center justify-center mt-[60px] gap-[16px]">
          <div className="bg-success-main px-[24px] py-[12px] flex flex-row gap-[10px] rounded-[4px]">
            <Icon icon={"logos:whatsapp-icon"} className="w-6 h-6" />
            <p className="text-white font-poppins text-[14px] font-normal leading-[170%]">
              WhatsApp
            </p>
          </div>
          <div className="bg-white px-[24px] py-[12px] flex flex-row gap-[10px] rounded-[4px]">
            <Icon icon={"logos:google-gmail"} className="w-6 h-6" />
            <p className="text-black font-poppins text-[14px] font-normal leading-[170%]">
              Gmail
            </p>
          </div>
          <div className="bg-[#29AAED] px-[24px] py-[12px] flex flex-row items-center gap-[10px] rounded-[4px]">
            <Icon icon={"logos:telegram"} className="w-6 h-6" />
            <p className="text-white font-poppins text-[14px] font-normal leading-[170%]">
              Telegram
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
