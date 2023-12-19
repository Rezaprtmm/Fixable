import IconLogout from "@/public/images/icon-logout";
import IconNotification from "@/public/svgs/icon-notification";
import IconSettings from "@/public/svgs/icon-settings";
import Link from "next/link";

export default function Topbar() {
  const request = "halo";
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    fetch("http://localhost:3001/signout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ request }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          window.location.href = "http://localhost:3000";
        } else {
          alert("Gagal logout. Coba lagi.");
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
      });
  };
  return (
    <div className="grid grid-rows-1 items-center bg-white border-b-[1px] border-[#D5D5D5] ml-[256px] justify-end pr-[40px] py-[22px]">
      <div className="flex flex-row items-center gap-[24px] p-[8px]">
        <Link href={"#"}>
          <IconSettings />
        </Link>
        <Link href={"#"}>
          <IconNotification />
        </Link>
        <button onClick={handleSubmit}>
          <IconLogout />
        </button>
      </div>
    </div>
  );
}
