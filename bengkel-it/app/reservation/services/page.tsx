"use client";
import Sidebar from "@/components/Sidebar/Index";
import Topbar from "@/components/Topbar/Index";
import LabelButtonServ from "@/components/LabelButtonServ/Index";
import LabelProblemServ from "@/components/LabelProblemServ/Index";
import ColumnOneRes from "@/components/ColumnOneRes/Index";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Service() {
  const [username, setUserName] = useState("");
  const [category, setCategory] = useState("Choose a category");
  const [problem, setProblem] = useState("Choose a problem");
  const [details, setDetails] = useState("");
  const [detailsAffirm, setDetailsAffirm] = useState(false);
  const request = "cancel";

  const getUsername = async (userName: any) => {
    if (userName != undefined) {
      var username = userName;
      const getForm = await axios.post("http://localhost:3001/recentform", {
        username,
      });

      if (getForm.data) {
        if (getForm.data[0].category != null) {
          setCategory(getForm.data[0].category);
        }

        if (getForm.data[0].problems != null) {
          setProblem(getForm.data[0].problems);
        }

        if (getForm.data[0].details != null) {
          setDetails(getForm.data[0].details);
        }
      }
    }

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

  const isRequiredFieldsFilled =
    category !== "Choose a category" &&
    problem !== "Choose a problem" &&
    details !== "";

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (category == "Choose a category") {
      alert("Please choose a category");
    } else if (problem == "Choose a problem") {
      alert("Please choose a problem");
    } else if (details == "") {
      alert("Please tells us the details");
    } else if (details.length < 10 && detailsAffirm == false) {
      const konfirm = confirm("The details too short. Are you sure?");

      if (konfirm) {
        setDetailsAffirm(true);
      } else {
        setDetailsAffirm(false);
      }
    } else {
      fetch("http://localhost:3001/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({ category, problem, details, username }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            window.location.href =
              "http://localhost:3000/reservation/appointment";
          } else {
            alert("Failed to upload your request");
          }
        })
        .catch((error) => {
          console.error("Unexpected error occured:", error);
        });
    }
  };

  const handleBack = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const cancelPurge = await axios.post("http://localhost:3001/purge", {
      request,
      username,
    });
    window.location.href = "http://localhost:3000/reservation/member";
  };

  return (
    <div className="w-full">
      <Sidebar activeMenu="reservation" userName={getUsername} />
      <Topbar />
      <div className="ml-64 flex flex-col px-[40px] mt-[40px] pb-[67px]">
        <h3 className="text-black font-poppins text-[22px] font-normal leading-[150%]">
          Reservation
        </h3>
        <div className="mt-[24px] grid grid-cols-3 gap-[40px]">
          <ColumnOneRes
            title="Get help as soon as possible"
            desc="In general, please fill in the form beside to provide us with an overview of the problem you are experiencing."
          />
          <div className="col-span-2 border-[1px] border-[#D5D5D5] rounded-[20px] p-[20px] h-[800px] flex flex-col justify-between">
            <div className="flex flex-col">
              <div className="w-full flex flex-row gap-[12px]">
                <hr className="w-1/3 h-[10px] bg-info-main rounded-[5px]" />
                <hr className="w-1/3 h-[10px] bg-info-main rounded-[5px]" />
                <hr className="w-1/3 h-[10px] bg-dark-4 rounded-[5px]" />
              </div>
              <p className="text-black font-poppins text-[16px] font-bold leading-[130%] mt-[60px]">
                Services
              </p>
              <div className="flex flex-col mt-[24px] gap-[16px]">
                {/* Service category */}
                <LabelButtonServ
                  title="Service category"
                  value={category}
                  selectedCategory={handleCategory}
                />

                {/* Problem category */}
                <LabelProblemServ
                  title="Problem"
                  value={problem}
                  selectedProblem={handleProblem}
                  selectedCategory={category}
                />

                {/* Problem details */}
                <div className="flex flex-col">
                  <div className="flex flex-row items-center justify-between">
                    <label
                      htmlFor=""
                      className="text-black font-poppins text-[16px] font-normal leading-[170%]"
                    >
                      Problem details
                    </label>
                  </div>
                  <textarea
                    name=""
                    id=""
                    className="border-[1px] border-[#f8f8f8] h-[180px] rounded-[10px] shadow-input px-[20px] py-[17px] text-dark-2 font-poppinstext-[16px] font-normal leading-[170%] mt-[8px]"
                    onChange={handleDetails}
                    value={details}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-[16px] items-center justify-end">
              <button
                className="bg-info-main px-[24px] py-[12px] flex flex-row items-center text-white font-poppins text-[16px] font-normal leading-[170%] rounded-[10px] gap-[8px]"
                onClick={handleBack}
              >
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
              <button
                className={`${
                  isRequiredFieldsFilled ? "bg-info-main" : "bg-dark-4"
                } px-[24px] py-[12px] flex flex-row items-center text-white font-poppins text-[16px] font-normal leading-[170%] rounded-[10px] gap-[8px]`}
                onClick={handleSubmit}
                disabled={!isRequiredFieldsFilled}
              >
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
