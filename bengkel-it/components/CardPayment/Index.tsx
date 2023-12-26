"use client";
import Image from "next/image";
import LabelCoupon from "../Coupon/Index";
import LabelBank from "../LabelBank/Index";
import LabelRes from "../LabelRes/Index";
import Transaction from "@/public/svgs/transaction";
import TextPayment from "../TextPayment/Index";
import LabelEWallet from "../LabelEWallet/Index";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CardPayment({ formCred }: any) {
  const [bank, setBank] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [vaNumber, setVaNumber] = useState("");
  const [eWallet, setEWallet] = useState("");
  const [eWalletNumber, setEWalletNumber] = useState("");
  const [coupon, setCoupon] = useState("");
  const [confirmCoupon, setConfirmCoupon] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(true);
  const [bankColor, setBankColor] = useState("info-main");
  const [eWalletColor, setEWalletColor] = useState("stone-700");
  const [repairFee, setRepairFee] = useState<number>(0);
  const [PPN, setPPN] = useState<number>(0);
  const [serviceFee, setServiceFee] = useState<number>(0);
  const [discCoupon, setDiscCoupon] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const selectedColor = "info-main";
  const unselectedColor = "stone-700";
  const username = formCred[0];
  const reserveId = formCred[1];

  const handleBank = async (selectedBank: any) => {
    setBank(selectedBank);

    if (selectedBank == "BCA") {
      setCompanyCode("014");
      setVaNumber(`14119${reserveId}`);
    } else if (selectedBank == "Mandiri") {
      setCompanyCode("008");
      setVaNumber(`14118${reserveId}`);
    }
  };

  const handleCompanyCode = (event: { target: { value: any } }) => {
    setCompanyCode(event.target.value);
  };

  const handleVaNumber = (event: { target: { value: any } }) => {
    setVaNumber(event.target.value);
  };

  const handleEWallet = async (selectedEWallet: any) => {
    setEWallet(selectedEWallet);
  };

  const handleEWalletNumber = (event: { target: { value: any } }) => {
    setEWalletNumber(event.target.value);
  };

  const handleCoupon = async (selectedCoupon: any) => {
    setCoupon(selectedCoupon);

    if (selectedCoupon.split(" ")[0] == "12.12") {
      setDiscCoupon(totalPrice * 0.3);
      setTotalPrice(totalPrice - discCoupon);
    } else if (selectedCoupon.split(" ")[0] == "HIMTI") {
      setDiscCoupon(totalPrice * 0.1);
      setTotalPrice(totalPrice - discCoupon);
    }
  };

  const handleBankBtn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setBankColor(selectedColor);
    setEWalletColor(unselectedColor);
    setPaymentMethod(true);
    setEWalletNumber("");
    setEWallet("");
    setDiscCoupon(0);
  };

  const handleEWalletBtn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setBankColor(unselectedColor);
    setEWalletColor(selectedColor);
    setPaymentMethod(false);
    setCompanyCode("");
    setVaNumber("");
    setBank("");
    setDiscCoupon(0);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(bank, companyCode, vaNumber, coupon, eWallet, eWalletNumber);
    console.log(formCred);

    if (paymentMethod == true) {
      if (bank == "") {
        alert("Please choose the bank");
      } else if (coupon == "" && confirmCoupon == false) {
        const isCoupon = confirm("Are you sure to proceed without using coupon?");

        if (isCoupon) {
          setConfirmCoupon(true);
        } else {
          setConfirmCoupon(false);
        }
      } else {
        fetch(`http://localhost:3001/vacheckout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify({ username, reserveId, bank, vaNumber, totalPrice }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data == true) {
              window.location.href = "http://localhost:3000/payment";
            } else {
              alert("Gagal memproses pembayaran");
            }
          })
          .catch((error) => {
            console.error("Terjadi kesalahan:", error);
          });
      }
    } else {
      if (eWallet == "") {
        alert("Please choose the e-wallet");
      } else if (eWalletNumber == "") {
        alert(`Please insert the ${eWallet} number`);
      } else {
        fetch(`http://localhost:3001/ewcheckout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify({ username, reserveId, eWallet, eWalletNumber, totalPrice }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data == true) {
              window.location.href = "http://localhost:3000/payment";
            } else {
              alert("Gagal memproses pembayaran");
            }
          })
          .catch((error) => {
            console.error("Terjadi kesalahan:", error);
          });
      }
    }
  };

  useEffect(() => {
    const fetchPrice = async function () {
      const fetch = await axios.post("http://localhost:3001/getprice", { username, reserveId });
      setRepairFee(parseInt(fetch.data[0].partprice));
      setServiceFee(parseInt(fetch.data[0].servicefee));
      setPPN(repairFee * 0.11);
      setTotalPrice(PPN + repairFee + serviceFee - discCoupon);
    };
    fetchPrice();
  });

  return (
    <div className="grid grid-cols-2 mt-[24px] border-[1px] border-[#D5D5D5] rounded-[20px]">
      <div className="flex flex-col p-[20px]">
        <h3 className="text-black font-poppins text-[22px] font-normal leading-[150%]">Payment Details</h3>
        <p className="text-dark-1 font-poppins text-[16px] font-normal leading-[170%] mt-[8px]">Complete your payment</p>
        <div className="flex flex-row items-center mt-[24px] gap-[28px]">
          <button className={`text-${bankColor} font-poppins text-[16px] border-b-[2px] border-${bankColor} pb-[8px]`} onClick={handleBankBtn}>
            Virtual Account
          </button>
          <button className={`text-${eWalletColor} font-poppins text-[16px] border-b-[2px] border-${eWalletColor} pb-[8px]`} onClick={handleEWalletBtn}>
            e-Wallet
          </button>
        </div>
        {paymentMethod ? (
          <div className="flex flex-col mt-[24px] gap-[16px] pb-[57px]">
            <LabelBank title="Choose Bank" onChange={handleBank} />
            <LabelRes title="Company code" value={companyCode} onChange={handleCompanyCode} type="text" className="hidden" disabled={true} />
            <LabelRes title="Virtual account number" value={vaNumber} onChange={handleVaNumber} type="text" className="hidden" disabled={true} />
            <LabelCoupon title="Coupon" onChange={handleCoupon} />
          </div>
        ) : (
          <div className="flex flex-col mt-[24px] gap-[16px] pb-[57px]">
            <LabelEWallet title="Choose e-wallet" onChange={handleEWallet} />
            <LabelRes title="e-wallet number" value={eWalletNumber} onChange={handleEWalletNumber} type="text" className="hidden" placeholder="Type your e-wallet number" disabled={false} />
            <LabelCoupon title="Coupon" onChange={handleCoupon} />
          </div>
        )}
      </div>
      <div className="bg-va cover bg-no-repeat rounded-r-[20px] h-full flex flex-col items-center justify-center">
        <div className="bg-white w-[70%] shadow-payment flex flex-col p-[20px] rounded-[10px]">
          <div className="flex flex-col items-center">
            <Transaction />
          </div>
          <h3 className="text-black font-poppins text-[16px] font-bold leading-[170%] text-start mt-[20px]">Payment Summary</h3>
          <div className="flex flex-col mt-[16px] gap-[8px]">
            <TextPayment title="Repair fee" price={repairFee} className1="text-dark-2" />
            <TextPayment title="PPN (11%)" price={PPN} plus="+ " className1="text-success-main" />
            <TextPayment title="Services fee" price={serviceFee} plus="+ " className1="text-success-main" />
            <TextPayment title="Coupon" price={discCoupon} plus="- " className1="text-success-main" />
            <TextPayment title="Total" price={totalPrice} className1="text-dark-2" />
          </div>
          <button className="bg-info-main rounded-[10px] py-[13px] text-white font-poppins text-[14px] font-normal leading-[170%] mt-[52px]" onClick={handleSubmit}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
