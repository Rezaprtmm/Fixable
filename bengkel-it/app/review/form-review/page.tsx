import Sidebar from "@/components/Sidebar/Index";
import Topbar from "@/components/Topbar/Index";
import ColumnOneRes from "@/components/ColumnOneRes/Index";
import LabelButtonServ from "@/components/LabelButtonServ/Index";
import Stars from "@/public/svgs/stars";

export default function FormReview() {
  return (
    <div>
      <Sidebar activeMenu="review" />
      <Topbar />
      <div className="ml-64 flex flex-col px-[40px] mt-[40px] h-full pb-[67px]">
        <h3 className="text-black font-poppins text-[22px] font-normal leading-[150%]">
          Review
        </h3>
        <div className="mt-[24px] grid grid-cols-3 gap-[40px] ">
          <ColumnOneRes
            title="Your assessment will be very valuable"
            desc="Give your assessment of our service. Use the unique code on the receipt we send via email to start your review."
            className="hidden"
          />
          <div className="col-span-2 border-[1px] border-[#D5D5D5] rounded-[20px] p-[20px] h-[800px] flex flex-col justify-between">
            <div className="flex flex-col">
              <div className="w-full flex flex-row gap-[12px]">
                <hr className="w-1/2 h-[10px] bg-info-main rounded-[5px]" />
                <hr className="w-1/2 h-[10px] bg-info-main rounded-[5px]" />
              </div>
              <p className="text-black font-poppins text-[16px] font-bold leading-[130%] mt-[60px]">
                Review
              </p>
              <div className="w-full flex flex-col mt-[24px]">
                <LabelButtonServ />
                <div className="w-full mt-[16px] flex flex-row items-center justify-between">
                  <p className="text-black font-poppins text-[16px] font-normal leading-[170%]">
                    Service Quality
                  </p>
                  <div className="flex flex-row items-center">
                    {[1, 2, 3, 4, 5].map((index, items) => (
                      <button key={`${index}-${items}`}>
                        <Stars className="w-[48px]" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="w-full mt-[16px] flex flex-row items-center justify-between">
                  <p className="text-black font-poppins text-[16px] font-normal leading-[170%]">
                    Service Quickness
                  </p>
                  <div className="flex flex-row items-center">
                    {[1, 2, 3, 4, 5].map((index, items) => (
                      <button key={`${index}-${items}`}>
                        <Stars className="w-[48px]" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col mt-[16px]">
                  <div className="flex flex-row items-center justify-between">
                    <label
                      htmlFor=""
                      className="text-black font-poppins text-[16px] font-normal leading-[170%]"
                    >
                      Review Messages
                    </label>
                  </div>
                  <textarea
                    name=""
                    placeholder="Type your review messages"
                    id=""
                    className="border-[1px] border-[#f8f8f8] h-[180px] rounded-[10px] shadow-input px-[20px] py-[17px] text-dark-2 font-poppinstext-[16px] font-normal leading-[170%] mt-[8px]"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-[16px] items-center justify-end">
              <button className="bg-info-main px-[24px] py-[12px] flex flex-row items-center text-white font-poppins text-[16px] font-normal leading-[170%] rounded-[10px] gap-[8px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M14.5 17.5L9.5 12.5L14.5 7.5"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Back
              </button>
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
