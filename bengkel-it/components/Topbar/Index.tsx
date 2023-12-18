import IconLogout from "@/public/images/icon-logout";
import IconNotification from "@/public/svgs/icon-notification";
import IconSettings from "@/public/svgs/icon-settings";
import Link from "next/link";

export default function Topbar() {
  return (
    <div className="grid grid-rows-1 items-center bg-white border-b-[1px] border-[#D5D5D5] ml-[256px] justify-end pr-[40px] py-[22px]">
      <div className="flex flex-row items-center gap-[24px] p-[8px]">
        <Link href={"#"}>
          <IconSettings />
        </Link>
        <Link href={"#"}>
          <IconNotification />
        </Link>
        <Link href={"#"}>
          <IconLogout />
        </Link>
      </div>
    </div>
  );
}
