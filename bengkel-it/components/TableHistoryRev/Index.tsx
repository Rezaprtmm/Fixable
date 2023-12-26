"use client";
import FooterTable from "../FooterTable/Index";
import OutputTableRev from "./OutputTableRev/Index";
import { useEffect, useState } from "react";
import axios from "axios";

interface HistoryDataItem {
  uniquecode: string;
  _id: number;
  message: string;
  reviewdate: string;
  review: string;
}

export default function TableHistoryRev({ getUsername }: any) {
  const [username, setUsername] = useState("");
  const [historyData, setHistoryData] = useState<HistoryDataItem[]>([]);
  const request = "history";

  useEffect(() => {
    const getPaymentHistory = async function () {
      const getData = await axios.post("http://localhost:3001/getuser", { getUsername });
      if (getData.data) {
        setUsername(getData.data);
        const getForm = await axios.post("http://localhost:3001/getreview", { getUsername, request });
        if (getForm.data) {
          setHistoryData(getForm.data);
        }
      }
    };
    getPaymentHistory();
  }, [getUsername]);
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-7 bg-blue-subtle rounded-[10px] mt-[24px]">
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">Unique Code</p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">Reservation ID</p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">Overall Rate</p>
        <p className="text-blue-main col-span-2 font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">Comment</p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">Review Date</p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">Status</p>
      </div>
      <div className="flex flex-col mt-[16px] gap-[8px]">
        {historyData.map((item, index) => (
          <OutputTableRev
            key={`${index}-${item}`}
            uniqCode={item.uniquecode}
            id={item._id}
            overalRate={item.review == "pending" ? "" : "Good Level"}
            comment={item.message}
            revDate={item.reviewdate}
            status={item.review == "complete" ? "Done" : "Waiting"}
          />
        ))}
      </div>
      <FooterTable />
    </div>
  );
}
