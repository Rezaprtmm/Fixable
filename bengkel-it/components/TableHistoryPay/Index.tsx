import FooterTable from "../FooterTable/Index";
import OutputTablePay from "./OutputTablePay/Index";

export default function TableHistoryPay() {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-7 bg-blue-subtle rounded-[10px] mt-[24px]">
        <p className="text-blue-main col-span-2 font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">
          Payment Invoice
        </p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">
          Payment ID
        </p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">
          Reservation ID
        </p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">
          Amount
        </p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">
          Date
        </p>
        <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%] pl-[20px] pr-[20px] py-[20px]">
          Status
        </p>
      </div>
      <div className="flex flex-col mt-[16px] gap-[8px]">
        {[1, 2, 3, 4, 5].map((index, items) => (
          <OutputTablePay
            key={`${index}-${items}`}
            inv="Payment Invoice#0003 - Nov 2023"
            id="014151120230001"
            resId={101120230005}
            amount="Rp. 172,000.00"
            date="15/11/2023"
            status="Done"
          />
        ))}
      </div>
      <FooterTable />
    </div>
  );
}
