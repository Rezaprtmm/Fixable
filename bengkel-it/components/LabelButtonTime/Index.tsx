"use client";
import { useState } from "react";
import ArrowNav from "@/public/svgs/arrow-nav";
import ButtonDropdown from "../ButtonDropdown/Index";

interface LabelTimeProps {
	title: string;
	setTime: any;
}

export default function LabelButtonTime(props: LabelTimeProps) {
	const { title, setTime } = props;
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState("Choose your time preference");

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (option: string) => {
		setSelectedOption(option);
		setIsOpen(false);
		setTime(option);
	};
	return (
		<div className="flex flex-col">
			<div className="flex flex-row items-center justify-between">
				<label htmlFor="" className="text-black font-poppins text-[16px] font-normal leading-[170%]">
					{title}
				</label>
			</div>
			<div className="relative mt-[8px]">
				<button className="border-[1px] border-[#F8F8F8] text-start bg-white shadow-input w-full h-[60px] rounded-[10px] text-dark-2 text-[16px] font-poppins font-normal leading-[170%] pl-[20px]" onClick={toggleDropdown}>
					{selectedOption}
				</button>
				{isOpen && (
					<div className="absolute mt-2 p-2 bg-white border-[1px] border-[#C3C3C3] rounded-[10px] w-full flex flex-col px-[20px] z-10">
						<ButtonDropdown title="9.00 AM - 11.59 AM" className={`${selectedOption === "9.00 AM - 11.59 AM" ? "font-bold" : ""}`} onClick={() => handleOptionClick("9.00 AM - 11.59 AM")} />
						<ButtonDropdown title="zzzzzz" className={`${selectedOption === "zzzzzz" ? "font-bold" : ""}`} onClick={() => handleOptionClick("zzzzzz")} />
						<ButtonDropdown title="zzzzzz" className={`${selectedOption === "zzzzzz" ? "font-bold" : ""}`} onClick={() => handleOptionClick("zzzzzz")} />
					</div>
				)}
				<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 pt-1 lg:pt-1 lg:pr-4">
					<ArrowNav className="-rotate-90 w-[24px]" />
				</div>
			</div>
		</div>
	);
}
