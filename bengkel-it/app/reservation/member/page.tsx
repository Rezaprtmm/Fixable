"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar/Index";
import Topbar from "@/components/Topbar/Index";
import ColumnOneRes from "@/components/ColumnOneRes/Index";
import LabelRes from "@/components/LabelRes/Index";
import LabelButton from "@/components/LabelButton/Index";
import { useEffect } from "react";
import axios from "axios";

export default function Member() {
	const [username, setUserName] = useState("");
	const [nameChecked, setNameChecked] = useState(false);
	const [emailChecked, setEmailChecked] = useState(false);
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [major, setMajor] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [nim, setNim] = useState("");
	const request = "reserve";

	const handleNameCheckboxChange = (checked: boolean) => {
		setNameChecked(checked);
	};

	const handleEmailCheckboxChange = (checked: boolean) => {
		setEmailChecked(checked);
	};

	const handleFullname = (event: { target: { value: any } }) => {
		setFullname(event.target.value);
	};

	const handleEmail = (event: { target: { value: any } }) => {
		setEmail(event.target.value);
	};

	const handleMajor = async (selectedMajor: any) => {
		setMajor(selectedMajor);
	};

	const handlePhoneNumber = (event: { target: { value: any } }) => {
		setPhoneNumber(event.target.value);
	};

	const getUsername = async (userName: any) => {
		setUserName(userName);
		const fetchUserName = await axios.post("http://localhost:3001/session", { request, userName });
	};

	useEffect(() => {
		const fetchData = async () => {
			const getData = await axios.post("http://localhost:3001/getuserdata", { username });
			setNim(getData.data[2]);

			if (nameChecked) {
				setFullname(getData.data[0]);
			}

			if (emailChecked) {
				setEmail(getData.data[1]);
			}
		};

		if (nameChecked) {
			fetchData();
		} else {
			setFullname("");
		}

		if (emailChecked) {
			fetchData();
		} else {
			setEmail("");
		}
	}, [nameChecked, emailChecked]);

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		fetch("http://localhost:3001/reserve", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			mode: "cors",
			body: JSON.stringify({ fullname, email, major, phoneNumber, nim, username }),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					window.location.href = "http://localhost:3000/reservation/services";
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
			<div className="ml-64 flex flex-col px-[40px] mt-[40px] h-full pb-[67px]">
				<h3 className="text-black font-poppins text-[22px] font-normal leading-[150%]">Reservation</h3>
				<div className="mt-[24px] grid grid-cols-3 gap-[40px]">
					<ColumnOneRes title="Get help as soon as possible" desc="In general, please fill in the form beside to provide us with an overview of the problem you are experiencing." />
					<div className="col-span-2 border-[1px] border-[#D5D5D5] rounded-[20px] p-[20px] h-[800px] flex flex-col justify-between">
						<div className="flex flex-col">
							<div className="w-full flex flex-row gap-[12px]">
								<hr className="w-1/3 h-[10px] bg-info-main rounded-[5px]" />
								<hr className="w-1/3 h-[10px] bg-dark-4 rounded-[5px]" />
								<hr className="w-1/3 h-[10px] bg-dark-4 rounded-[5px]" />
							</div>
							<p className="text-black font-poppins text-[16px] font-bold leading-[130%] mt-[60px]">Member Information</p>
							<div className="flex flex-col mt-[24px] gap-[16px]">
								{/* Fulname */}
								<LabelRes title="Fullname" type="text" isChecked={nameChecked} onCheckboxChange={handleNameCheckboxChange} onChange={handleFullname} value={fullname} placeholder={""} />

								{/* EMail */}
								<LabelRes title="Active email" type="text" isChecked={emailChecked} onCheckboxChange={handleEmailCheckboxChange} onChange={handleEmail} value={email} placeholder={""} />

								{/* Major */}
								<LabelButton title="Major" selectedMajor={handleMajor} />

								{/* Telephone */}
								<div className="flex flex-col">
									<div className="flex flex-row items-center justify-between">
										<label htmlFor="" className="text-black font-poppins text-[16px] font-normal leading-[170%]">
											Phone number
										</label>
										<div className="flex flex-row items-center gap-[8px]">
											<p className="text-dark-2 font-poppins text-[12px] font-normal leading-[170%]">Connected to WhatsApp</p>
										</div>
									</div>
									<div className="relative w-full flex items-center">
										<div className="absolute h-[60px] inset-y-0 left-0 mt-[8px] flex items-center">
											<label className="py-[10px] px-[20px] text-dark-2 font-poppins text-[16px] font-normal leading-[170%] border-r-[1px] border-dark-2">+62</label>
										</div>
										<input type="tel" className="w-full border-[1px] border-[#f8f8f8] h-[60px] rounded-[10px] shadow-input px-[90px] text-dark-2 font-poppins text-[16px] font-normal leading-[170%] mt-[8px]" onChange={handlePhoneNumber} />
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col items-end">
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
