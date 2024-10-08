"use client";
import Link from "next/link";
import { useState } from "react";

interface LabelProps {
  name: string;
  type: string;
  icon: React.ReactNode;
  forgot?: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Label(props: LabelProps) {
  const [handle, setHandle] = useState("");
  const handler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHandle(event.target.value);
    props.onChange(event);
  };
  const { name, type, icon, forgot, className } = props;
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex flex-row justify-between">
        <label htmlFor="" className="text-black text-[16px] font-poppins font-normal leading-[170%]">
          {name}
        </label>
        <Link href={"#"} className="text-blue-main text-[16px] font-poppins font-normal leading-[170%]">
          {forgot}
        </Link>
      </div>
      <div className="relative mt-[8px]">
        <input type={type} className="w-full h-[60px] border-[1px] border-[#F8F8F8] bg-white rounded-[10px] px-[60px] shadow-input" onChange={handler} />
        <div className="pointer-events-none absolute inset-y-0 flex items-center justify-center pl-[20px]">{icon}</div>
      </div>
    </div>
  );
}
