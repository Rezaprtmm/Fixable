import Link from "next/link";

interface ButtonServiceProps {
  title: string;
  active?: boolean;
  href: string;
}

export default function ButtonService(props: ButtonServiceProps) {
  const { title, active, href } = props;
  return (
    <Link
      href={href}
      className={`${
        active ? "bg-info-main text-white" : "border-[1px] border-[#D5D5D5]"
      } text-center border-[#D5D5D5] py-[18px] rounded-[10px] font-poppins text-[14px] font-normal leading-[170%]`}
    >
      {title}
    </Link>
  );
}
