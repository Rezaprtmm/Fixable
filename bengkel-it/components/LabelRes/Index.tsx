interface LabelResProps {
  title: string;
  type: string;
  className?: string;
}
export default function LabelRes(props: LabelResProps) {
  const { title, type, className } = props;
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <label
          htmlFor=""
          className="text-black font-poppins text-[16px] font-normal leading-[170%]"
        >
          {title}
        </label>
        <div className={`flex flex-row items-center gap-[8px] ${className}`}>
          <p className="text-dark-2 font-poppins text-[12px] font-normal leading-[170%]">
            same as account
          </p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only  peer" />
            <div className="w-7 h-4 bg-dark-2 peer-focus:outline-none peer-focus:ring-4 rounded-[20px] peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
          </label>
        </div>
      </div>
      <input
        type={type}
        className="border-[1px] border-[#f8f8f8] h-[60px] rounded-[10px] shadow-input px-[20px] text-dark-2 font-poppinstext-[16px] font-normal leading-[170%] mt-[8px]"
      />
    </div>
  );
}
