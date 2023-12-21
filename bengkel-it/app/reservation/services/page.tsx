"use client";
import Sidebar from "@/components/Sidebar/Index";
import Topbar from "@/components/Topbar/Index";
import LabelButtonServ from "@/components/LabelButtonServ/Index";
import LabelProblemServ from "@/components/LabelProblemServ/Index";
import ColumnOneRes from "@/components/ColumnOneRes/Index";
import { useState } from "react";

export default function Service() {
  const [username, setUserName] = useState("username");
  const [category, setCategory] = useState("");
  const [problem, setProblem] = useState("");
  const [details, setDetails] = useState("");
  const getUsername = async (userName: any) => {
    setUserName(userName);
  };

  const handleCategory = async (selectedMajor: any) => {
    setCategory(selectedMajor);
  };

  const handleProblem = async (selectedProblem: any) => {
    setProblem(selectedProblem);
  };

  const handleDetails = (event: { target: { value: any } }) => {
    setDetails(event.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    fetch("http://localhost:3001/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ category, problem, details }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          window.location.href = "http://localhost:3000/reservation/appointment";
        } else {
          alert("Gagal mengunggah data");
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
      });
  };

  return (
    <div className="w-full">
      <Sidebar activeMenu="reservation" userName={getUsername} />
      <Topbar />
      <div className="ml-64 flex flex-col px-[40px] mt-[40px] pb-[67px]">
        <h3 className="text-black font-poppins text-[22px] font-normal leading-[150%]">Reservation</h3>
        <div className="mt-[24px] grid grid-cols-3 gap-[40px]">
          <ColumnOneRes title="Get help as soon as possible" desc="In general, please fill in the form beside to provide us with an overview of the problem you are experiencing." />
          <div className="col-span-2 border-[1px] border-[#D5D5D5] rounded-[20px] p-[20px] h-[800px] flex flex-col justify-between">
            <div className="flex flex-col">
              <div className="w-full flex flex-row gap-[12px]">
                <hr className="w-1/3 h-[10px] bg-info-main rounded-[5px]" />
                <hr className="w-1/3 h-[10px] bg-info-main rounded-[5px]" />
                <hr className="w-1/3 h-[10px] bg-dark-4 rounded-[5px]" />
              </div>
              <p className="text-black font-poppins text-[16px] font-bold leading-[130%] mt-[60px]">Services</p>
              <div className="flex flex-col mt-[24px] gap-[16px]">
                {/* Service category */}
                <LabelButtonServ title="Service category" selectedCategory={handleCategory} />

                {/* Problem category */}
                <LabelProblemServ title="Problem" selectedProblem={handleProblem} />

                {/* Problem details */}
                <div className="flex flex-col">
                  <div className="flex flex-row items-center justify-between">
                    <label htmlFor="" className="text-black font-poppins text-[16px] font-normal leading-[170%]">
                      Problem details
                    </label>
                  </div>
                  <textarea
                    name=""
                    id=""
                    className="border-[1px] border-[#f8f8f8] h-[180px] rounded-[10px] shadow-input px-[20px] py-[17px] text-dark-2 font-poppinstext-[16px] font-normal leading-[170%] mt-[8px]"
                    onChange={handleDetails}
                  ></textarea>
                </div>

                {/* App or Website */}
                {/* <div className="flex flex-col">
                  <div className="flex flex-row items-center justify-between">
                    <label
                      htmlFor=""
                      className="text-black font-poppins text-[16px] font-normal leading-[170%]"
                    >
                      App or Website Description
                    </label>
                  </div>
                  <textarea
                    name=""
                    placeholder="Describe the app or website you want"
                    id=""
                    className="border-[1px] border-[#f8f8f8] h-[180px] rounded-[10px] shadow-input px-[20px] py-[17px] text-dark-2 font-poppinstext-[16px] font-normal leading-[170%] mt-[8px]"
                  ></textarea>
                </div> */}
              </div>
            </div>

            <div className="flex flex-row gap-[16px] items-center justify-end">
              <button className="bg-info-main px-[24px] py-[12px] flex flex-row items-center text-white font-poppins text-[16px] font-normal leading-[170%] rounded-[10px] gap-[8px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14.5 17.5L9.5 12.5L14.5 7.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Back
              </button>
              <button className="bg-info-main px-[24px] py-[12px] flex flex-row items-center text-white font-poppins text-[16px] font-normal leading-[170%] rounded-[10px] gap-[8px]" onClick={handleSubmit}>
                Next{" "}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9.5 17.5L14.5 12.5L9.5 7.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
