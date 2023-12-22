"use client";
import NotifServices from "@/public/svgs/notif-services";
import OutputTableSer from "./OutputTableSer/Index";
import FooterTable from "../FooterTable/Index";
import { useEffect, useState } from "react";
import axios from "axios";
interface FormDataItem {
  _id: string;
  category: string;
  problems: string;
  uniquecode: string;
  datecreated: string;
  datesolved: string;
}
export default function TableHistorySer({ getUsername }: any) {
  const [username, setUsername] = useState("test");
  const [formData, setFormData] = useState<FormDataItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      const getData = await axios.post("http://localhost:3001/getuser", { getUsername });
      if (getData.data) {
        setUsername(getData.data);
        const getForm = await axios.post("http://localhost:3001/getform", { username });
        if (getForm.data) {
          setFormData(getForm.data);
        }
      }
    }
    fetchData();
  }, [username]);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-7 bg-blue-subtle rounded-[10px] mt-[24px]">
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">Reservation ID</p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">Service category</p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">Problem area</p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">Unique Code</p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">Reservation Date</p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">Solved Date</p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">Status</p>
      </div>
      <div className="flex flex-col gap-[8px] mt-[16px]">
        {formData.map((index, items) => (
          <OutputTableSer key={`${index}-${items}`} id={index._id} category={index.category} problem={index.problems} uniqCode={index.uniquecode} resDate={index.datecreated} solveDate="-" status="On going" />
        ))}
      </div>
      <FooterTable />
    </div>
  );
}
