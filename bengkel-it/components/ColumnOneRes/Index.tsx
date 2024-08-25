import Arrow from "@/public/svgs/arrow";
import Link from "next/link";

interface ColumnOneResProps {
  title: string;
  desc: string;
  className?: string;
}
export default function ColumnOneRes(props: ColumnOneResProps) {
  const { title, desc, className } = props;
  return (
    <div className="flex flex-col h-[800px] justify-between">
      <div className="flex flex-col">
        <p className="text-black font-poppins text-[28px] font-bold leading-[130%]">
          {title}
        </p>
        <p className="text-dark-3 font-poppins text-[16px] font-normal leading-[170%] mt-[16px]">
          {desc}
        </p>
      </div>

      <div className={`flex flex-col ${className}`}>
        <div className="bg-blue-subtle p-[20px] rounded-[10px]">
          <p className="text-blue-main font-poppins text-[16px] font-bold leading-[130%]">
            Don&#39;t know what your problem is?
          </p>
          <p className="text-blue-darker font-poppins text-[14px] font-normal leading-[170%] mt-[16px]">
            If you don&#39;t understand the problem you are experiencing, you
            can consult first with our team.
          </p>
          <Link
            href={"/#consultation"}
            className="flex flex-row items-center gap-[8px]"
          >
            <p className="text-blue-darker font-poppins text-[14px] font-bold leading-[170%]">
              Consultation now
            </p>
            <Arrow className="text-blue-darker rotate-45 w-[24px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
