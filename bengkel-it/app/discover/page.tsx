import CardDiscover from "@/components/CardDiscover/Index";
import Sidebar from "@/components/Sidebar/Index";
import StatusBar from "@/components/StatusBar/Index";
import Topbar from "@/components/Topbar/Index";

export default function Discover() {
  return (
    <div className="w-full overflow-hidden">
      <Sidebar activeMenu="discover" />
      <Topbar />
      <div className="ml-[296px] mt-[40px] pr-[40px] pb-[180px]">
        <h3 className="text-black font-poppins text-[22px] font-normal leading-[150%]">
          Discover
        </h3>
        <div className="grid grid-cols-1 mt-[40px] bg-blue-subtle p-[40px] rounded-[10px]">
          <h3 className="text-blue-main font-poppins text-[40px] font-normal leading-[130%]">
            Welcome, paatihqee 👋
          </h3>
          <p className="text-blue-darker font-poppins text-[20px] font-normal leading-[170%] mt-[16px]">
            Have a nice day! Is there anything we can help you with today?
          </p>
        </div>
        <div className="grid grid-cols-1 mt-[24px] p-[20px] border-[1px] border-warning-darker rounded-[10px]">
          <h3 className="text-black font-poppins text-[16px] font-normal leading-[170%]">
            Active Service
          </h3>
          <p className="text-dark-3 font-poppins text-[12px] font-normal leading-[170%] italic">
            61% completed
          </p>
          <div className="grid grid-cols-6 mt-[24px] items-start gap-[5px]">
            <StatusBar
              title="Reservation"
              desc1="Reservation accepted"
              className2="hidden"
              className3="hidden"
            />
            <StatusBar
              title="Appointment"
              desc1="Appointment approved"
              className2="hidden"
              className3="hidden"
            />
            <StatusBar
              title="Meeting"
              desc1="Meeting completed"
              className2="hidden"
              className3="hidden"
            />
            <StatusBar
              title="Working Process"
              desc1="In queue"
              desc2="In progress"
              desc3="Complete"
              className3="text-dark-4"
            />
            <StatusBar
              title="Payment"
              desc1="Payment paid"
              className2="hidden"
              className3="hidden"
            />
            <StatusBar
              title="End stage"
              desc1="Device ready"
              desc2="Device taken"
              className1="text-dark-4"
              className2="text-dark-4"
              className3="hidden"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 mt-[24px] gap-[40px]">
          <CardDiscover
            title="Reservation"
            num="3"
            desc1="reservations made"
            desc2="in this month"
          />
          <CardDiscover
            title="Services"
            num="2"
            desc1="services completed"
            desc2="in this month"
          />
          <CardDiscover
            title="Feedback"
            num="1"
            desc1="reviews given"
            desc2="in this month"
          />
        </div>
      </div>
    </div>
  );
}
