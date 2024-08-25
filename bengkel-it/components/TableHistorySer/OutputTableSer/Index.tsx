"use client";
import NotifServices from "@/public/svgs/notif-services";
import Copy from "@/public/svgs/copy";
import { useState } from "react";

interface OutputTableSerProps {
  id: string;
  category: string;
  problem: string;
  uniqCode: string;
  resDate: string;
  solveDate: string;
  status: string;
  ispaid: boolean;
}

export default function OutputTableSer(props: OutputTableSerProps) {
  const {
    id,
    category,
    problem,
    uniqCode,
    resDate,
    solveDate,
    status,
    ispaid,
  } = props;

  const handleCopyClick = () => {
    // Create a textarea element to hold the value
    const textarea = document.createElement("textarea");
    textarea.value = uniqCode;

    // Append the textarea to the DOM
    document.body.appendChild(textarea);

    // Select the text in the textarea
    textarea.select();

    try {
      document.execCommand("copy");
      // alert("Text has been copied to the clipboard");
    } catch (err) {
      console.error("Unable to copy text to the clipboard", err);
    } finally {
      // Remove the textarea from the DOM
      document.body.removeChild(textarea);
    }
  };

  const handleCopyResId = () => {
    // Create a textarea element to hold the value
    const textarea = document.createElement("textarea");
    textarea.value = id;

    // Append the textarea to the DOM
    document.body.appendChild(textarea);

    // Select the text in the textarea
    textarea.select();

    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Unable to copy text to the clipboard", err);
    } finally {
      // Remove the textarea from the DOM
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="grid grid-cols-7 border-[1px] border-[#D5D5D5] rounded-[10px] items-center">
      <div className="pl-[20px] pr-[20px] py-[20px]">
        <p className="flex flex-row items-center gap-4 text-black font-poppins text-[12px] font-normal leading-[170%]">
          {id}
          <button onClick={handleCopyResId}>
            <Copy className="text-info-main" />
          </button>
        </p>
      </div>
      <div className="pl-[20px] pr-[20px] py-[20px]">
        <p className="text-black font-poppins text-[12px] font-normal leading-[170%]">
          {category}
        </p>
      </div>
      <div className="pl-[20px] pr-[20px] py-[20px]">
        <p className="text-black font-poppins text-[12px] font-normal leading-[170%]">
          {problem}
        </p>
      </div>
      <div className="pl-[20px] pr-[20px] py-[20px] flex flex-row gap-[16px]">
        <p className="text-black font-poppins text-[12px] font-normal leading-[170%] flex flex-row items-center gap-[16px]">
          {uniqCode}
          <button onClick={handleCopyClick}>
            <Copy className="text-info-main" />
          </button>
        </p>
      </div>
      <div className="pl-[20px] pr-[20px] py-[20px]">
        <p className="text-black font-poppins text-[12px] font-normal leading-[170%]">
          {resDate}
        </p>
      </div>
      <div className="pl-[20px] pr-[20px] py-[20px]">
        <p className="text-black font-poppins text-[12px] font-normal leading-[170%]">
          {solveDate}
        </p>
      </div>
      <div className="pl-[20px] pr-[20px] py-[20px]">
        {ispaid ? (
          <div
            className={`flex flex-row items-center justify-center gap-[4px] border-[1px] border-green-600 text-green-600 font-poppins text-[12px] font-normal leading-[170%] py-[4px] px-[16px] rounded-[18px]`}
          >
            <span>
              <NotifServices />
            </span>
            <p>{status}</p>
          </div>
        ) : (
          <div
            className={`flex flex-row items-center justify-center gap-[4px] border-[1px] border-warning-darker text-warning-darker font-poppins text-[12px] font-normal leading-[170%] py-[4px] px-[16px] rounded-[18px]`}
          >
            <span>
              <NotifServices />
            </span>
            <p>{status}</p>
          </div>
        )}
      </div>
    </div>
  );
}
