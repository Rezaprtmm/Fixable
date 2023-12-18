import NotifServices from "@/public/svgs/notif-services";
import Copy from "@/public/svgs/copy";

interface OutputTableRevProps {
  uniqCode: string;
  id: number;
  overalRate: string;
  comment: string;
  revDate: string;
  status: string;
}

export default function OutputTableRev(props: OutputTableRevProps) {
  const { uniqCode, id, overalRate, comment, revDate, status } = props;
  return (
    <div className="grid grid-cols-7 border-[1px] border-[#D5D5D5] rounded-[10px] items-center">
      <div className="pl-[20px] pr-[20px] py-[20px]">
        <p className="text-black font-poppins text-[12px] font-normal leading-[170%]">
          {uniqCode}
        </p>
      </div>
      <div className="pl-[20px] pr-[20px] py-[20px]">
        <p className="text-black font-poppins text-[12px] font-normal leading-[170%]">
          {id}
        </p>
      </div>
      <div className="pl-[20px] pr-[20px] py-[20px]">
        <p className="text-black font-poppins text-[12px] font-normal leading-[170%]">
          {overalRate}
        </p>
      </div>
      <div className="pl-[20px] col-span-2 pr-[20px] py-[20px] flex flex-row gap-[16px]">
        <p className="text-black font-poppins text-[12px] font-normal leading-[170%] flex flex-row items-center gap-[16px]">
          {comment}
        </p>
      </div>
      <div className="pl-[20px] pr-[20px] py-[20px]">
        <p className="text-black font-poppins text-[12px] font-normal leading-[170%]">
          {revDate}
        </p>
      </div>
      <div className="pl-[20px] pr-[20px] py-[20px]">
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
