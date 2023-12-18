import Sidebar from "@/components/Sidebar/Index";
import Topbar from "@/components/Topbar/Index";
import ColumnOneRes from "@/components/ColumnOneRes/Index";
import Link from "next/link";

export default function validation() {
  return (
    <div>
      <Sidebar activeMenu="review" />
      <Topbar />
      <div className="ml-64 flex flex-col px-[40px] mt-[40px] h-full">
        <h3 className="text-black font-poppins text-[22px] font-normal leading-[150%]">
          Review
        </h3>
        <div className="mt-[24px] grid grid-cols-3 gap-[40px]">
          <ColumnOneRes
            title="Your assessment will be very valuable"
            desc="Give your assessment of our service. Use the unique code on the receipt we send via email to start your review."
            className="hidden"
          />
          <div className="col-span-2 border-[1px] border-[#D5D5D5] rounded-[20px] p-[20px] h-[800px] flex flex-col justify-between">
            <div className="flex flex-col">
              <div className="w-full flex flex-row gap-[12px]">
                <hr className="w-1/2 h-[10px] bg-info-main rounded-[5px]" />
                <hr className="w-1/2 h-[10px] bg-dark-4 rounded-[5px]" />
              </div>
              <p className="text-black font-poppins text-[16px] font-bold leading-[130%] mt-[60px]">
                Validation
              </p>
              <div className="flex flex-row items-start mt-[14px] gap-[8px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                    stroke="#6B7588"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 5.33337H8.00667V5.34004H8V5.33337Z"
                    stroke="#6B7588"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 8V10.6667"
                    stroke="#6B7588"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="text-dark-2 font-poppins text-[12px] font-normal leading-[170%]">
                  Assessments can only be carried out by people who have
                  received our services and the problem has been resolved. Enter
                  the unique code to start your review.
                </p>
              </div>
              <div className="mt-[16px] flex flex-col">
                <label
                  htmlFor=""
                  className="text-black font-poppins text-[16px] font-normal leading-[170%]"
                >
                  Unique Code
                </label>
                <div className="mt-[8px] flex flex-row gap-[4px]">
                  <p className="text-dark-2 font-poppinstext-[12px] font-normal leading-[170%]">
                    Your unique code can be found in your{" "}
                  </p>
                  <Link
                    href={"#"}
                    className="text-info-main font-poppinstext-[12px] font-normal leading-[170%]"
                  >
                    reservation history.
                  </Link>
                </div>
                <input
                  type="text"
                  className="border-[1px] border-[#f8f8f8] h-[60px] rounded-[10px] shadow-input px-[20px] text-dark-2 font-poppinstext-[16px] font-normal leading-[170%] mt-[16px]"
                />
              </div>
              <div>
                <p className="text-dark-3 font-poppins text-[16px] font-normal leading-normal">
                  Code status:{" "}
                  <span className="text-success-main font-poppins text-[16px] font-normal leading-normal">
                    Valid
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <button className="bg-info-main px-[24px] py-[12px] flex flex-row items-center text-white font-poppins text-[16px] font-normal leading-[170%] rounded-[10px] gap-[8px]">
                Next{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9.5 17.5L14.5 12.5L9.5 7.5"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
