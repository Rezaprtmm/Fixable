import Arrow from "@/public/svgs/arrow";
import React from "react";

interface CardServicesProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  className?: string;
  classNameA?: string;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    buttonText: string
  ) => Promise<void>;
}

export default function CardServices(props: CardServicesProps) {
  const { icon, title, desc, className, classNameA, onClick } = props;
  return (
    <div
      className={`w-full flex flex-row border-[1px] border-blue-main bg-white rounded-[20px] p-[20px] gap-[20px] ${className}`}
    >
      <div className="w-[20%]">{icon}</div>
      <div className="w-[70%] flex flex-col justify-center">
        <h3 className="text-black font-poppins text-[20px] font-bold leading-[130%]">
          {title}
        </h3>
        <p className="text-dark-2 font-poppins text-[16px] font-normal leading-[170%] mt-[8px]">
          {desc}
        </p>
      </div>
      <div className="w-[10%] flex flex-row justify-end">
        <button onClick={(e) => onClick(e, "")}>
          <Arrow className={`w-full text-blue-main ${classNameA}`} />
        </button>
      </div>
    </div>
  );
}
