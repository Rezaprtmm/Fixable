"use client";
import IconDiscover from "@/public/svgs/icon-discover";
import IconHistory from "@/public/svgs/icon-history";
import IconHomepage from "@/public/svgs/icon-homepage";
import IconPayment from "@/public/svgs/icon-payment";
import IconReservation from "@/public/svgs/icon-reservation";
import IconReview from "@/public/svgs/icon-review";
import Logo from "@/public/svgs/logo";
import Image from "next/image";
import Link from "next/link";
import LinkSidebar from "./LinkSidebar/Index";
import { useEffect, useState } from "react";
import axios from "axios";

interface SidebarProps {
  activeMenu?: "homepage" | "discover" | "reservation" | "review" | "history" | "payment";
  className?: string;
  userName: any;
}

export default function Sidebar(props: SidebarProps) {
  const { activeMenu, className, userName } = props;
  const [username, setUserName] = useState("");
  const request = "halo";

  useEffect(() => {
    const fetchData = async () => {
      const getData = await axios.post("http://localhost:3001/session", { request });
      if (getData.data) {
        userName(getData.data);
        setUserName(getData.data);
      } else {
        window.location.href = "http://localhost:3000/sign-in";
      }
    };

    fetchData();
  }, []);

  return (
    <aside className="fixed top-0 flex flex-col w-64 h-screen shadow-sidebar">
      <div className="border-b-[1px] border-[#D5D5D5] pl-[40px] py-[14px]">
        <Logo />
      </div>
      <div className="px-[40px] mt-[40px]">
        <Link href={"/profile"} className={`flex flex-row bg-blue-subtle p-[16px] items-center gap-[16px] rounded-[10px] ${className}`}>
          <Image src={"/images/profile-login.png"} width={40} height={40} alt="profile" />
          <p className="text-blue-main font-poppins text-[16px] font-bold leading-[170%]">{username}</p>
        </Link>
      </div>
      <div className="flex flex-col justify-center mt-[40px]">
        <p className="pl-[40px] text-[#737373] font-poppins text-[12px] font-normal leading-[170%]">Menu</p>
        <div className="flex flex-col mt-[24px]">
          <LinkSidebar title="Homepage" href={"/"} icon={<IconHomepage />} active={activeMenu === "homepage"} />
          <LinkSidebar title="Discover" href="/discover" icon={<IconDiscover />} active={activeMenu === "discover"} />
          <LinkSidebar title="Reservation" href="/reservation/member" icon={<IconReservation />} active={activeMenu === "reservation"} />
          <LinkSidebar title="Review" href="/review/validation" icon={<IconReview />} active={activeMenu === "review"} />
          <LinkSidebar title="History" href="/history/service-history" icon={<IconHistory />} active={activeMenu === "history"} />
          <LinkSidebar title="Payment" href="/" icon={<IconPayment />} active={activeMenu === "payment"} />
        </div>
      </div>
    </aside>
  );
}
