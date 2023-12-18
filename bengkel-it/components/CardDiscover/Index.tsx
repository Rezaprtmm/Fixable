import Arrow from "@/public/svgs/arrow";

interface CardDiscoverProps {
  title: string;
  num: string;
  desc1: string;
  desc2: string;
}
export default function CardDiscover(props: CardDiscoverProps) {
  const { title, num, desc1, desc2 } = props;
  return (
    <div className="grid grid-cols-1 border-[1px] border-[#D5D5D5] py-[20px] px-[40px] rounded-[10px]">
      <div className="flex flex-row items-center justify-between">
        <p>{title}</p>
        <Arrow className="w-[24px] text-black" />
      </div>
      <div className="flex flex-row items-center gap-[4px]">
        <h3 className="text-blue-main font-poppins text-[128px] font-bold leading-[130%]">
          {num}
        </h3>
        <p className="text-black font-poppins text-[16px] font-normal leading-[170%]">
          {desc1} <br />
          {desc2}
        </p>
      </div>
    </div>
  );
}
