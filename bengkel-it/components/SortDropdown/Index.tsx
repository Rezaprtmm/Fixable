"use client";
import { useState } from "react";
import ArrowNav from "@/public/svgs/arrow-nav";
import ButtonDropdown from "../ButtonDropdown/Index";

export default function SortDropdown() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState("Date");

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (option: string) => {
		setSelectedOption(option);
		setIsOpen(false);
	};
	return (
		<div className="relative mt-[8px]">
			<button className="border-[1px] border-[#D5D5D5] text-start bg-white shadow-input rounded-[6px] text-blue-main font-poppin text-[12px] font-poppins font-normal leading-[170%] pl-[8px] py-[8px] w-[7rem]" onClick={toggleDropdown}>
				{selectedOption}
			</button>
			{isOpen && (
				<div className="absolute mt-2 p-2 bg-white border-[1px] border-[#C3C3C3] rounded-[10px] w-full flex flex-col px-[20px] z-10">
					<ButtonDropdown title="Newest" className={`${selectedOption === "Newest" ? "font-bold" : ""}`} onClick={() => handleOptionClick("Newest")} />
					<ButtonDropdown title="Oldest" className={`${selectedOption === "Oldest" ? "font-bold" : ""}`} onClick={() => handleOptionClick("Oldest")} />
				</div>
			)}
			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center lg:pr-[8px]">
				<ArrowNav className="-rotate-90 w-[16px]" />
			</div>
		</div>
	);
}
