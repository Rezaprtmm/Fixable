export default function ButtonDay({ day, type, active, onClick }: any) {
  return (
    <button
      type={type}
      onClick={() => onClick(day)}
      className={`${
        active
          ? "bg-info-main  text-white "
          : "border-[1px] border-info-main text-info-main"
      } rounded-[4px] px-[24px] py-[12px] font-poppins text-[12px] font-bold leading-normal`}
    >
      {day}
    </button>
  );
}
