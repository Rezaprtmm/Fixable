import NotifServices from "@/public/svgs/notif-services";
import OutputTableSer from "./OutputTableSer/Index";
import FooterTable from "../FooterTable/Index";

export default function TableHistorySer() {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-7 bg-blue-subtle rounded-[10px] mt-[24px]">
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">
          Reservation ID
        </p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">
          Service category
        </p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">
          Problem area
        </p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">
          Unique Code
        </p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">
          Reservation Date
        </p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">
          Solved Date
        </p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">
          Status
        </p>
      </div>
      <div className="flex flex-col gap-[8px] mt-[16px]">
        {[1, 2, 3, 4, 5].map((index, items) => (
          <OutputTableSer
            key={`${index}-${items}`}
            id={191120230017}
            category="Hardware repair"
            problem="Screen"
            uniqCode="19112023HRS10009"
            resDate="19/11/2023"
            solveDate="-"
            status="On going"
          />
        ))}
      </div>
      <FooterTable />
    </div>
  );
}
