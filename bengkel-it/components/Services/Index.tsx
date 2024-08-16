"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Hardware from "@/public/svgs/hardware";
import CardServices from "./CardServices/Index";
import Software from "@/public/svgs/software";
import Consultation from "@/public/svgs/consultation";
import Creation from "@/public/svgs/creation";

export default function Services() {
  const request = "halo";
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const checkSession = await axios.post("http://localhost:3001/session", {
        request,
      });
      if (checkSession.data) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    };

    fetchData();
  }, []);

  const handleReservation = async (
    e: React.MouseEvent<HTMLButtonElement>,
    buttonText: string
  ) => {
    e.preventDefault();

    if (!isLogin) {
      window.location.href = "http://localhost:3000/sign-in";
    } else if (isLogin && buttonText == "Reservation") {
      window.location.href = "http://localhost:3000/reservation/member";
    } else if (isLogin && buttonText == "Dashboard") {
      window.location.href = "http://localhost:3000/discover";
    }
  };

  const handleConsult = async (
    e: React.MouseEvent<HTMLButtonElement>,
    buttonText: string
  ) => {
    e.preventDefault();
    window.location.href = "http://localhost:3000/#consultation";
  };

  return (
    <div
      className="px-[100px] flex flex-row gap-[125px] mt-[119px]"
      id="services"
    >
      <div className="w-[43%] flex flex-col">
        <h3 className="bg-gradient-to-r from-black to-blue-main text-transparent bg-clip-text font-poppins text-[44px] font-bold leading-[130%]">
          What we provide <br />
          for you
        </h3>
        <p className="text-dark-2 font-poppins text-[16px] font-normal leading-[170%] mt-[16px]">
          We try to help you solve{" "}
          <span className="text-error-main">
            your technology <br />
            problems
          </span>{" "}
          by providing the{" "}
          <span className="text-blue-main">best solutions</span>. Choose <br />a
          service and <span className="text-blue-main">have fun!</span>
        </p>
      </div>
      <div className="w-[57%]">
        <CardServices
          icon={<Hardware />}
          title="Hardware Repair"
          desc="Solve your hardware problems with us"
          className="mb-[24px]"
          onClick={(e) => handleReservation(e, "Reservation")}
        />
        <CardServices
          icon={<Software />}
          title="Software Repair"
          desc="Fix your software before damaging your hardware"
          className="mb-[24px]"
          onClick={(e) => handleReservation(e, "Reservation")}
        />
        <CardServices
          icon={<Consultation />}
          title="Consultation with Our Team"
          desc="Free technology consultation with our team, try it now!"
          className="mb-[24px]"
          onClick={(e) => handleConsult(e, "Consultation")}
        />
        <CardServices
          icon={<Creation />}
          title="Website/App Creation"
          desc="An easy way to create a website or application"
          className="mb-[24px]"
          classNameA="rotate-[135deg]"
          onClick={(e) => handleReservation(e, "Reservation")}
        />
      </div>
    </div>
  );
}
