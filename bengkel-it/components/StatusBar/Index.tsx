"use client";
import NotifServices from "@/public/svgs/notif-services";
import { useEffect, useState } from "react";

interface StatusBarProps {
  title: string;
  desc1: string;
  desc2?: string;
  desc3?: string;
  className1?: string;
  className2?: string;
  className3?: string;
  ispaid: boolean;
  review: string;
}
export default function StatusBar(props: StatusBarProps) {
  const { title, desc1, desc2, desc3, className1, className2, className3, ispaid, review } = props;
  const [desc1Color, setDesc1Color] = useState("text-success-main");
  const [desc2Color, setDesc2Color] = useState("text-success-main");
  const [desc3Color, setDesc3Color] = useState("text-success-main");
  const [statusBarColor, setStatusBarColor] = useState("bg-blue-main");
  const incompleteColor = "text-[#C7C9D9]";
  const pendingColor = "text-[#FFCC00]";
  const completeColor = "text-success-main";
  const statusBarIncompleteColor = "bg-[#C7C9D9]";
  const statusBarCompleteColor = "bg-blue-main";

  useEffect(() => {
    if (ispaid) {
      setDesc1Color(completeColor);
      setDesc2Color(completeColor);
      setStatusBarColor(statusBarCompleteColor);
    } else {
      setDesc1Color(incompleteColor);
      setDesc2Color(incompleteColor);
      setStatusBarColor(statusBarIncompleteColor);
    }

    if (review == "pending") {
      setDesc1Color(incompleteColor);
      setDesc2Color(incompleteColor);
      setStatusBarColor(statusBarIncompleteColor);
    } else if (review == "complete") {
      setDesc1Color(completeColor);
      setDesc2Color(completeColor);
      setStatusBarColor(statusBarCompleteColor);
    }
  });

  return (
    <div className="grid grid-cols-1">
      <div className="flex flex-row items-center justify-center">
        <p className="bg-blue-subtle px-[8px] py-[4px] rounded-[16px] text-blue-main font-poppins text-[12px] font-normal leading-[170%]">{title}</p>
      </div>
      <hr className={`w-full h-[10px] ${statusBarColor} mt-[8px] rounded-[10px]`} />
      <div className="flex flex-col gap-[8px] mt-[8px]">
        <div className="flex flex-row items-center gap-[13px]">
          <NotifServices className={`${desc1Color} ${className1}`} />
          <p className="text-black font-poppins text-[12px] font-normal leading-[170%]">{desc1}</p>
        </div>
        <div className="flex flex-row items-center gap-[13px]">
          <NotifServices className={`${desc2Color}  ${className2}`} />
          <p className="text-black font-poppins text-[12px] font-normal leading-[170%]">{desc2}</p>
        </div>
        <div className="flex flex-row items-center gap-[13px]">
          <NotifServices className={`${desc3Color}  ${className3}`} />
          <p className="text-black font-poppins text-[12px] font-normal leading-[170%]">{desc3}</p>
        </div>
      </div>
    </div>
  );
}
