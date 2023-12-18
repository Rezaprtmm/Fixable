import ArrowNav from "@/public/svgs/arrow-nav";

export default function FooterTable() {
  return (
    <div className="flex flex-row items-center justify-end bg-blue-subtle h-[40px] rounded-[10px] mt-[16px] px-[20px] gap-[10px]">
      <p className="text-blue-main font-poppins text-[12px] font-bold leading-[170%]">
        Show <span>3/3</span> entries
      </p>
      <div className="flex flex-row items-center">
        <button>
          <ArrowNav className="w-[24px]" />
        </button>
        <button>
          <ArrowNav className="w-[24px] rotate-180" />
        </button>
      </div>
    </div>
  );
}
