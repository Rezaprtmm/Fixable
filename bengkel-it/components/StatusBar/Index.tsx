import NotifServices from "@/public/svgs/notif-services";

interface StatusBarProps {
  title: string;
  desc1: string;
  desc2?: string;
  desc3?: string;
  className1?: string;
  className2?: string;
  className3?: string;
}
export default function StatusBar(props: StatusBarProps) {
  const { title, desc1, desc2, desc3, className1, className2, className3 } =
    props;
  return (
    <div className="grid grid-cols-1">
      <div className="flex flex-row items-center justify-center">
        <p className="bg-blue-subtle px-[8px] py-[4px] rounded-[16px] text-blue-main font-poppins text-[12px] font-normal leading-[170%]">
          {title}
        </p>
      </div>
      <hr className="w-full h-[10px] bg-blue-main mt-[8px] rounded-[10px]" />
      <div className="flex flex-col gap-[8px] mt-[8px]">
        <div className="flex flex-row items-center gap-[13px]">
          <NotifServices className={`text-success-main ${className1}`} />
          <p className="text-black font-poppins text-[12px] font-normal leading-[170%]">
            {desc1}
          </p>
        </div>
        <div className="flex flex-row items-center gap-[13px]">
          <NotifServices className={`text-success-main ${className2}`} />
          <p className="text-black font-poppins text-[12px] font-normal leading-[170%]">
            {desc2}
          </p>
        </div>
        <div className="flex flex-row items-center gap-[13px]">
          <NotifServices className={`text-success-main ${className3}`} />
          <p className="text-black font-poppins text-[12px] font-normal leading-[170%]">
            {desc3}
          </p>
        </div>
      </div>
    </div>
  );
}
