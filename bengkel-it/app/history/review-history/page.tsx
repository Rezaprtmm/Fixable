"use client";
import Sidebar from "@/components/Sidebar/Index";
import Topbar from "@/components/Topbar/Index";
import ShowDropdown from "@/components/ShowDropdown/Index";
import SortDropdown from "@/components/SortDropdown/Index";
import TableHistoryRev from "@/components/TableHistoryRev/Index";
import ButtonHistory from "@/components/ButtonHistory/Index";
import { useState } from "react";

export default function ReviewHistory() {
	const [username, setUserName] = useState("");
	const getUsername = async (userName: any) => {
		setUserName(userName);
	};

	return (
		<div>
			<Sidebar activeMenu="history" userName={getUsername} />
			<Topbar />
			<div className="ml-[296px] mt-[40px] pr-[40px] pb-[180px]">
				<h3 className="text-black font-poppins text-[22px] font-normal leading-[150%]">History</h3>
				<ButtonHistory activeMenu="review history" />
				<div className="w-full flex flex-row items-center justify-end gap-[20px] mt-[24px]">
					<div className="flex flex-row items-center gap-[8px]">
						<p className="text-black font-poppins text-[16px] font-normal leading-[170%]">show : </p>
						<ShowDropdown />
					</div>
					<div className="flex flex-row items-center gap-[8px]">
						<p>sort : </p>
						<SortDropdown />
					</div>
				</div>
				<div>
					<TableHistoryRev getUsername={username} />
				</div>
			</div>
		</div>
	);
}
