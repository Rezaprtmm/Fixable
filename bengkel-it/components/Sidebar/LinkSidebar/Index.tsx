import Link from "next/link";

interface LinkSidebarProps {
  title: string;
  active?: boolean;
  icon: React.ReactNode;
  className?: string;
  href: string;
}

export default function LinkSidebar(props: LinkSidebarProps) {
  const { title, active, icon, className, href } = props;
  return (
    <Link
      href={href}
      className={`${
        active ? "bg-blue-main text-white" : "text-black"
      } flex flex-row items-center gap-[8px]  px-[40px] py-[16px] font-poppins text-[14px] font-normal leading-[170%] ${className}`}
    >
      <span>{icon}</span>
      {title}
    </Link>
  );
}
