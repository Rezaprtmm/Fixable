"use client";
import CardDiscover from "@/components/CardDiscover/Index";
import Sidebar from "@/components/Sidebar/Index";
import StatusBar from "@/components/StatusBar/Index";
import Topbar from "@/components/Topbar/Index";
import { useEffect, useState } from "react";
import axios from "axios";
import { Item } from "@/lib/types/item-services";

export default function Discover() {
  const [username, setUserName] = useState("username");
  const [reserveStat, setReserveStat] = useState("-");
  const [completedStat, setCompletedStat] = useState("-");
  const [reviewStat, setReviewStat] = useState("-");
  const [activeForm, setActiveForm] = useState<Item[]>([]);
  const [percentProgress, setPercentProgress] = useState("text-[#E5B800]");
  const [openWatch, setOpenWatch] = useState<boolean>(false);
  const [dataWatch, setDataWatch] = useState<Item | null>(null);
  const request = "halo";
  const completedColor = "text-success-main";

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post("http://localhost:3001/session", {
        request,
        username,
      });
      setUserName(response.data);
    };
    fetchData();
  }, [username]);

  const getUsername = async (userName: string) => {
    const fetchData = await axios.post("http://localhost:3001/getstat", {
      userName,
    });
    const getReserve = await axios.post("http://localhost:3001/getreserve", {
      userName,
    });

    if (getReserve.data) {
      setActiveForm(getReserve.data);

      if (getReserve.data.some((item: Item) => item.ispaid)) {
        setPercentProgress(completedColor);
      }
    }

    if (fetchData.data) {
      setReserveStat(fetchData.data[0]);
      setCompletedStat(fetchData.data[1]);
      setReviewStat(fetchData.data[2]);
    }

    setUserName(userName);
  };

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const handleWatch = (id: string) => {
    console.log("ini id", id);
    const selectedItem = activeForm.find((item) => item._id === id);
    console.log("ini data id", selectedItem);
    if (selectedItem) {
      setDataWatch(selectedItem);
      setOpenWatch(true);
    }
  };

  const handleBack = () => {
    setOpenWatch(false);
    setDataWatch(null);
  };

  return (
    <div className="w-full overflow-hidden">
      <Sidebar activeMenu="discover" userName={getUsername} />
      <Topbar />
      <div className="ml-[296px] mt-[40px] pr-[40px] pb-[180px]">
        <h3 className="text-black font-poppins text-[22px] font-normal leading-[150%]">
          Discover
        </h3>
        <div className="grid grid-cols-1 mt-[40px] bg-blue-subtle p-[40px] rounded-[10px]">
          <h3 className="text-blue-main font-poppins text-[40px] font-normal leading-[130%]">
            Welcome, {username} 👋
          </h3>
          <p className="text-blue-darker font-poppins text-[20px] font-normal leading-[170%] mt-[16px]">
            Have a nice day! Is there anything we can help you with today?
          </p>
        </div>

        {!openWatch ? (
          <div className="grid grid-cols-1 mt-[24px] p-[20px] border-[1px] border-[#D5D5D5] rounded-[10px]">
            <h3 className="text-black font-poppins text-[16px] font-normal leading-[170%]">
              Active Service
            </h3>
            <p className="text-dark-3 font-poppins text-[12px] font-normal leading-[170%] italic">
              {activeForm.length} services are currently active
            </p>
            <div className="w-full flex flex-row overflow-x-auto whitespace-nowrap mt-5 gap-5 scrollbar pb-2">
              {activeForm.map((item, index) => (
                <div
                  className="w-1/3 border border-warning-darker rounded-xl p-5 flex flex-col space-y-2 items-center justify-center"
                  key={index}
                >
                  <div className="text-black text-xs font-bold text-center">
                    <span>{item.category}</span> -{" "}
                    <span>{item.uniquecode}</span>
                  </div>
                  <span className="text-xs text-[#737373]">
                    {truncateText(item.details, 6)}
                  </span>
                  <button
                    className="border border-blue-main text-xs text-blue-main py-2 px-4 rounded-2xl"
                    onClick={() => handleWatch(item._id)}
                  >
                    Watch here
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          dataWatch && (
            <div className="grid grid-cols-1 mt-[24px] p-[20px] border-[1px] border-warning-darker rounded-[10px]">
              <div className="flex flex-row items-start justify-between">
                <div>
                  <div className="text-black font-poppins text-[16px] font-normal leading-[170%]">
                    {dataWatch.category} - {dataWatch.uniquecode}
                  </div>
                  <p className="text-dark-3 font-poppins text-[12px] font-normal leading-[170%] italic">
                    61% on going
                  </p>
                </div>
                <button
                  className="text-blue-main text-sm border border-blue-main px-4 py-2 rounded-md"
                  onClick={handleBack}
                >
                  Back
                </button>
              </div>
              <div className="grid grid-cols-6 mt-[24px] items-start gap-[5px]">
                <StatusBar
                  title="Reservation"
                  desc1="Reservation accepted"
                  className2="hidden"
                  className3="hidden"
                  ispaid={true}
                  review={""}
                />
                <StatusBar
                  title="Appointment"
                  desc1="Appointment approved"
                  className2="hidden"
                  className3="hidden"
                  ispaid={true}
                  review={""}
                />
                <StatusBar
                  title="Meeting"
                  desc1="Meeting completed"
                  className2="hidden"
                  className3="hidden"
                  ispaid={true}
                  review={""}
                />
                <StatusBar
                  title="Working Process"
                  desc1="In queue"
                  desc2="In progress"
                  desc3="Complete"
                  className3="text-dark-4"
                  ispaid={true}
                  review={""}
                />
                <StatusBar
                  title="Payment"
                  desc1="Payment paid"
                  className2="hidden"
                  className3="hidden"
                  ispaid={dataWatch.ispaid}
                  review=""
                />
                <StatusBar
                  title="End stage"
                  desc1="Device ready"
                  desc2="Device taken"
                  className1="text-dark-4"
                  className2="text-dark-4"
                  className3="hidden"
                  ispaid={dataWatch.ispaid}
                  review=""
                />
              </div>
            </div>
          )
        )}

        <div className="grid grid-cols-3 mt-[24px] gap-[40px]">
          <CardDiscover
            title="Reservations"
            num={reserveStat}
            desc1="reservations made"
            desc2="in this month"
          />
          <CardDiscover
            title="Service"
            num={completedStat}
            desc1="services completed"
            desc2="in this month"
          />
          <CardDiscover
            title="Feedback"
            num={reviewStat}
            desc1="reviews given"
            desc2="in this month"
          />
        </div>
      </div>
    </div>
  );
}
