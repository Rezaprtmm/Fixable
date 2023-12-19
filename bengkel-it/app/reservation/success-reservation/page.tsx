"use client";
import Sidebar from "@/components/Sidebar/Index";
import Topbar from "@/components/Topbar/Index";
import Success from "@/public/svgs/success";
import Link from "next/link";
import ColumnOneRes from "@/components/ColumnOneRes/Index";
import { useState } from "react";

export default function SuccessReservation() {
	const [username, setUserName] = useState("username");
	const getUsername = async (userName: any) => {
		setUserName(userName);
	};

	return (
		<div className="w-full overflow-hidden">
			<Sidebar activeMenu="reservation" userName={getUsername} />
			<Topbar />
			<div className="ml-64 flex flex-col px-[40px] mt-[40px] pb-[67px]">
				<h3 className="text-black font-poppins text-[22px] font-normal leading-[150%]">Reservation</h3>
				<div className="mt-[24px] grid grid-cols-3 gap-[40px]">
					<ColumnOneRes title="Get help as soon as possible" desc="In general, please fill in the form beside to provide us with an overview of the problem you are experiencing." />
					<div className="col-span-2 border-[1px] border-[#D5D5D5] rounded-[20px] p-[20px] h-[800px] flex flex-col">
						<hr className="w-full h-[10px] bg-success-main rounded-[5px]" />
						<div className="flex flex-col items-center mt-[60px] gap-[40px]">
							<h3 className="text-info-main font-poppins text-[20px] font-bold leading-[130%]">Reservation Success !</h3>
							<Success />
							<p className="text-dark-2 font-poppins text-[16px] font-normal leading-[130%] text-center">
								Your reservation has been successfully submitted, you will receive an email containing the ticket within a few moments. The meeting you are expecting will be announced via WhatsApp.
							</p>
						</div>
						<div className="flex flex-row items-center  justify-center mt-[40px]">
							<Link href={"#"} className="text-info-main font-poppins text-[16px] font-normal leading-normal border-b-[1px] border-info-main pb-[4px]">
								see history
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
