import IconEditImage from "@/public/svgs/icon-edit-img";

interface InputLabelProfileProps {
  label: string;
  icon?: React.ReactNode;
}

export default function InputLabelProfile(props: InputLabelProfileProps) {
  const { label, icon } = props;
  return (
    <div className="relative">
      <input
        type="text"
        className="block rounded-[10px] px-[20px] pb-[8px] pt-[28px] w-full text-black text-[14px] font-normal bg-[#F8F8F8] border-[1px] border-[#D5D5D5] appearance-none dark:text-white focus:outline-none focus:ring-0 peer"
        placeholder=" "
      />
      <button className="absolute inset-y-0 right-5">{icon}</button>
      <label
        htmlFor="filled_success"
        className="absolute text-[12px] text-dark-2 font-normal leading-[170%] duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
      >
        {label}
      </label>
    </div>
  );
}
