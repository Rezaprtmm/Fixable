import NotifServices from "@/public/svgs/notif-services";

interface OutputTablePayProps {
  inv: string;
  id: string;
  resId: number;
  amount: string;
  date: string;
  status: string;
}

export default function OutputTablePay(props: OutputTablePayProps) {
  const { inv, id, resId, amount, date, status } = props;
  return (
    <div className="grid grid-cols-7 border-[1px] border-[#D5D5D5] rounded-[10px] items-center">
      <div className="pl-[20px] col-span-2 pr-[20px] py-[20px]">
        <p className="text-black font-poppins text-[12px] font-normal leading-[170%]">
          {inv}
        </p>
      </div>
      <div className="pl-[20px] pr-[20px] py-[20px]">
        <p className="text-black font-poppins text-[12px] font-normal leading-[170%]">
          {id}
        </p>
      </div>
      <div className="pl-[20px] pr-[20px] py-[20px]">
        <p className="text-black font-poppins text-[12px] font-normal leading-[170%]">
          {resId}
        </p>
      </div>
      <div className="pl-[20px] pr-[20px] py-[20px] flex flex-row gap-[16px]">
        <p className="text-black font-poppins text-[12px] font-normal leading-[170%] flex flex-row items-center gap-[16px]">
          {amount}
        </p>
      </div>
      <div className="pl-[20px] pr-[20px] py-[20px]">
        <p className="text-black font-poppins text-[12px] font-normal leading-[170%]">
          {date}
        </p>
      </div>
      <div className="pl-[20px] pr-[20px] py-[20px] ">
        <div className="flex flex-row items-center justify-center gap-[4px] border-[1px] border-success-darker text-success-darker font-poppins text-[12px] font-normal leading-[170%] py-[4px] px-[16px] rounded-[18px]">
          <span>
            <NotifServices />
          </span>
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
}
