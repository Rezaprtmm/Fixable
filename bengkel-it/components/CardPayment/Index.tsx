import Image from "next/image";
import LabelCoupon from "../Coupon/Index";
import LabelBank from "../LabelBank/Index";
import LabelRes from "../LabelRes/Index";
import Transaction from "@/public/svgs/transaction";
import TextPayment from "../TextPayment/Index";
import LabelEWallet from "../LabelEWallet/Index";

export default function CardPayment() {
  return (
    <div className="grid grid-cols-2 mt-[24px] border-[1px] border-[#D5D5D5] rounded-[20px]">
      <div className="flex flex-col p-[20px]">
        <h3 className="text-black font-poppins text-[22px] font-normal leading-[150%]">
          Payment Details
        </h3>
        <p className="text-dark-1 font-poppins text-[16px] font-normal leading-[170%] mt-[8px]">
          Complete your payment
        </p>
        <div className="flex flex-row items-center mt-[24px] gap-[28px]">
          <button className="text-info-main font-poppins text-[16px] border-b-[2px] border-info-main pb-[8px]">
            Virtual Account
          </button>
          <button className="text-info-main font-poppins text-[16px] border-b-[2px] border-info-main pb-[8px]">
            e-Wallet
          </button>
        </div>
        <div className="flex flex-col mt-[24px] gap-[16px] pb-[57px]">
          <LabelBank title="Choose Bank" />
          <LabelRes title="Company code" type="text" className="hidden" />
          <LabelRes
            title="Virtual account number"
            type="text"
            className="hidden"
          />
          <LabelCoupon title="Coupon" />
        </div>
        <div className="flex flex-col mt-[24px] gap-[16px] pb-[57px]">
          <LabelEWallet title="Choose e-wallet" />
          <LabelRes
            title="e-wallet number"
            type="text"
            className="hidden"
            placeholder="Type your e-wallet number"
          />
          <LabelCoupon title="Coupon" />
        </div>
      </div>
      <div className="bg-va cover bg-no-repeat rounded-r-[20px] h-full flex flex-col items-center justify-center">
        <div className="bg-white w-[70%] shadow-payment flex flex-col p-[20px] rounded-[10px]">
          <div className="flex flex-col items-center">
            <Transaction />
          </div>
          <h3 className="text-black font-poppins text-[16px] font-bold leading-[170%] text-start mt-[20px]">
            Payment Summary
          </h3>
          <div className="flex flex-col mt-[16px] gap-[8px]">
            <TextPayment
              title="Repair fee"
              price="200,000"
              className1="text-dark-2"
            />
            <TextPayment
              title="PPN (11%)"
              price="22,000"
              plus="+ "
              className1="text-success-main"
            />
            <TextPayment
              title="Services fee"
              price="10,000"
              plus="+ "
              className1="text-success-main"
            />
            <TextPayment
              title="Coupon"
              price="0"
              plus="- "
              className1="text-success-main"
            />
            <TextPayment
              title="Total"
              price="232,000"
              className1="text-dark-2"
            />
          </div>
          <button className="bg-info-main rounded-[10px] py-[13px] text-white font-poppins text-[14px] font-normal leading-[170%] mt-[52px]">
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
