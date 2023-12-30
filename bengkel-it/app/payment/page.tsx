"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar/Index";
import Topbar from "@/components/Topbar/Index";
import CardPayment from "@/components/CardPayment/Index";

export default function Payment() {
  const [username, setUserName] = useState("");
  const [reserveId, setReserveId] = useState("");
  const [isReserve, setIsReserve] = useState(false);
  const getUsername = async (userName: any) => {
    setUserName(userName);
  };
  var formCred = [username, reserveId];

  const handleReserveId = (event: { target: { value: any } }) => {
    setReserveId(event.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    fetch("http://localhost:3001/checkreserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ reserveId, username }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data == true) {
          setIsReserve(data);
        } else {
          setIsReserve(data);
          alert(
            "Reservation ID not found. Make sure you input the correct one."
          );
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
      });
  };

  return (
    <div>
      <Sidebar activeMenu="payment" userName={getUsername} />
      <Topbar />
      <div className="grid grid-rows-1 ml-64 px-[40px] mt-[40px] pb-[40px]">
        <h3 className="text-black font-poppins text-[22px] font-normal leading-[150%]">
          Reservation
        </h3>
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
            Enter the Reservation ID first to check your payment information.
          </p>
        </div>
        <div className="grid mt-[24px] border-b-[1px] border-[#D5D5D5] pb-[24px]">
          <h3 className="text-black font-poppins text-[16px] font-normal leading-[170%]">
            Reservation ID
          </h3>
          <div className="grid grid-cols-3 items-center mt-[8px] gap-[20px]">
            <input
              type="text"
              className="col-span-2 border-[1px] border-[#f8f8f8] h-[60px] rounded-[10px] shadow-input px-[20px] text-dark-2 font-poppins text-[16px] font-normal leading-[170%]"
              onChange={handleReserveId}
            />
            <button
              className="bg-info-main rounded-[10px] text-white font-poppins text-[16px] font-normal leading-[170%] h-[60px]"
              onClick={handleSubmit}
            >
              Check Payment
            </button>
          </div>
        </div>
        <div className="mt-[24px] pb-[50px]">
          {isReserve ? <CardPayment formCred={formCred} /> : <div> </div>}
        </div>
      </div>
    </div>
  );
}
