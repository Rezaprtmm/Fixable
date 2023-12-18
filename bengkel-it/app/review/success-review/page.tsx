import Sidebar from "@/components/Sidebar/Index";
import Topbar from "@/components/Topbar/Index";
import Success from "@/public/svgs/success";
import Link from "next/link";
import ColumnOneRes from "@/components/ColumnOneRes/Index";

export default function SuccessReservation() {
  return (
    <div className="w-full overflow-hidden">
      <Sidebar activeMenu="review" />
      <Topbar />
      <div className="ml-64 flex flex-col px-[40px] mt-[40px] pb-[67px]">
        <h3 className="text-black font-poppins text-[22px] font-normal leading-[150%]">
          Reservation
        </h3>
        <div className="mt-[24px] grid grid-cols-3 gap-[40px]">
          <ColumnOneRes
            title="Your assessment will be very valuable"
            desc="Give your assessment of our service. Use the unique code on the receipt we send via email to start your review."
            className="hidden"
          />
          <div className="col-span-2 border-[1px] border-[#D5D5D5] rounded-[20px] p-[20px] h-[800px] flex flex-col">
            <hr className="w-full h-[10px] bg-success-main rounded-[5px]" />
            <div className="flex flex-col items-center mt-[60px] gap-[40px]">
              <h3 className="text-info-main font-poppins text-[20px] font-bold leading-[130%]">
                Review Success !
              </h3>
              <Success />
              <p className="text-dark-2 font-poppins text-[16px] font-normal leading-[130%] text-center">
                Thank you for providing your assessment of our service.
                Don&#39;t hesitate to come back if you encounter any problems.
              </p>
            </div>
            <div className="flex flex-row items-center  justify-center mt-[40px]">
              <Link
                href={"#"}
                className="text-info-main font-poppins text-[16px] font-normal leading-normal border-b-[1px] border-info-main pb-[4px]"
              >
                see history
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
