"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar/Index";
import Topbar from "@/components/Topbar/Index";
import Arrow from "@/public/svgs/arrow";
import LabelButtonMeeting from "@/components/LabelButtonMeeting/Index";
import LabelButtonTime from "@/components/LabelButtonTime/Index";
import ButtonDay from "@/components/ButtonDay/Index";
import axios from "axios";

export default function Appointment() {
  const [activeDay, isActiveDay] = useState<string>("Monday");
  const [meetType, setMeetType] = useState("Choose a meeting type");
  const [timePref, setTimePref] = useState("Choose your time preference");
  const [username, setUserName] = useState("username");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const getUsername = async (userName: any) => {
    if (userName != undefined) {
      var username = userName;
      const getForm = await axios.post("http://localhost:3001/recentform", {
        username,
      });

      if (getForm.data) {
        if (getForm.data[0].activeDay != null) {
          isActiveDay(getForm.data[0].activeDay);
        }

        if (getForm.data[0].meetType != null) {
          setMeetType(getForm.data[0].meetType);
        }

        if (getForm.data[0].timePref != null) {
          setTimePref(getForm.data[0].timePref);
        }
      } else {
        window.location.href = "http://localhost:3000/reservation/member";
      }
    }
    setUserName(userName);
  };

  const handleDaySelect = (selectedDay: string) => {
    const isAlreadySelected = selectedDays.includes(selectedDay);

    if (isAlreadySelected) {
      const updatedDays = selectedDays.filter((day) => day !== selectedDay);
      setSelectedDays(updatedDays);
    } else {
      if (selectedDays.length < 3) {
        setSelectedDays([...selectedDays, selectedDay]);
      } else {
        alert("You can only select up to 3 days.");
      }
    }
  };

  const handleMeet = (setMeet: string) => {
    setMeetType(setMeet);
  };

  const handleTime = (setTime: string) => {
    setTimePref(setTime);
  };

  const isRequiredFieldsFilled =
    meetType !== "Choose a meeting type" &&
    timePref !== "Choose your time preference" &&
    selectedDays.length > 0;

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (meetType == "Choose a meeting type") {
      alert("Please choose the meeting type");
    } else if (timePref == "Choose your time preference") {
      alert("Plase choose your time preference");
    } else {
      fetch("http://localhost:3001/appoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({ activeDay, meetType, timePref, username }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            window.location.href =
              "http://localhost:3000/reservation/success-reservation";
          } else {
            alert("Gagal mengunggah data");
          }
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
        });
    }
  };

  const handleBack = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    window.location.href = "http://localhost:3000/reservation/services";
  };

  return (
    <div className="w-full overflow-hidden">
      <Sidebar activeMenu="reservation" userName={getUsername} />
      <Topbar />
      <div className="ml-64 flex flex-col px-[40px] mt-[40px] pb-[67px]">
        <h3 className="text-black font-poppins text-[22px] font-normal leading-[150%]">
          Reservation
        </h3>
        <div className="mt-[24px] grid grid-cols-3 gap-[40px]">
          <div className="flex flex-col h-[800px] justify-between">
            <div className="flex flex-col">
              <p className="text-black font-poppins text-[28px] font-bold leading-[130%]">
                Get help as soon as possible
              </p>
              <p className="text-dark-3 font-poppins text-[16px] font-normal leading-[170%] mt-[16px]">
                In general, please fill in the form beside to provide us with an
                overview of the problem you are experiencing.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="bg-blue-subtle p-[20px] rounded-[10px]">
                <p className="text-blue-main font-poppins text-[16px] font-bold leading-[130%]">
                  Don&#39;t know what your problem is?
                </p>
                <p className="text-blue-darker font-poppins text-[14px] font-normal leading-[170%] mt-[16px]">
                  If you don&#39;t understand the problem you are experiencing,
                  you can consult first with our team.
                </p>
                <div className="flex flex-row items-center gap-[8px]">
                  <p className="text-blue-darker font-poppins text-[14px] font-bold leading-[170%]">
                    Consultation now
                  </p>
                  <Arrow className="text-blue-darker rotate-45 w-[24px]" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 border-[1px] border-[#D5D5D5] rounded-[20px] p-[20px] h-[800px] flex flex-col justify-between">
            <div className="flex flex-col">
              <div className="w-full flex flex-row gap-[12px]">
                <hr className="w-1/3 h-[10px] bg-info-main rounded-[5px]" />
                <hr className="w-1/3 h-[10px] bg-info-main rounded-[5px]" />
                <hr className="w-1/3 h-[10px] bg-info-main rounded-[5px]" />
              </div>
              <p className="text-black font-poppins text-[16px] font-bold leading-[130%] mt-[60px]">
                Appointment
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
                  This section is not a definite appointment, but in this
                  section the data you fill in becomes our preference for making
                  an appointment
                </p>
              </div>
              <div className="flex flex-col mt-[24px] gap-[16px]">
                {/* Meeting type */}
                <LabelButtonMeeting
                  title="Meeting type"
                  value={meetType}
                  setMeet={handleMeet}
                />

                {/* Time preference */}
                <LabelButtonTime
                  title="Time preference"
                  value={timePref}
                  setTime={handleTime}
                />

                {/* Day you are available */}
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-black font-poppins text-[16px] font-normal leading-[170%]"
                  >
                    Day you are available
                  </label>
                  <div className="flex flex-row gap-[16px] mt-[16px]">
                    <ButtonDay
                      day="Monday"
                      type="button"
                      active={selectedDays.includes("Monday")}
                      onClick={() => handleDaySelect("Monday")}
                    />
                    <ButtonDay
                      day="Tuesday"
                      type="button"
                      active={selectedDays.includes("Tueday")}
                      onClick={() => handleDaySelect("Tuesday")}
                    />
                    <ButtonDay
                      day="Wednesday"
                      type="button"
                      active={selectedDays.includes("Wednesday")}
                      onClick={() => handleDaySelect("Wednesday")}
                    />
                    <ButtonDay
                      day="Thursday"
                      type="button"
                      active={selectedDays.includes("Thursday")}
                      onClick={() => handleDaySelect("Thursday")}
                    />
                    <ButtonDay
                      day="Friday"
                      type="button"
                      active={selectedDays.includes("Friday")}
                      onClick={() => handleDaySelect("Friday")}
                    />
                  </div>
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
