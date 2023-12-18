import FooterTable from "../FooterTable/Index";
import OutputTableRev from "./OutputTableRev/Index";

export default function TableHistoryRev() {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-7 bg-blue-subtle rounded-[10px] mt-[24px]">
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">
          Unique Code
        </p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">
          Reservation ID
        </p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">
          Overal Rate
        </p>
        <p className="text-blue-main col-span-2 font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">
          Comment
        </p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">
          Review Date
        </p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">
          Status
        </p>
      </div>
      <div className="flex flex-col mt-[16px] gap-[8px]">
        {[1, 2, 3, 4, 5].map((index, items) => (
          <OutputTableRev
            key={`${index}-${items}`}
            uniqCode="10112023SRW10005"
            id={101120230005}
            overalRate="Good Level"
            comment="good service, very fast beyond ..."
            revDate="11/11/2023"
            status="Done"
          />
        ))}
      </div>
      <FooterTable />
    </div>
  );
}
