"use client";
import InputLabelProfile from "@/components/InputLabelProfile/Index";
import Sidebar from "@/components/Sidebar/Index";
import Topbar from "@/components/Topbar/Index";
import Copy from "@/public/svgs/copy";
import IconEditImage from "@/public/svgs/icon-edit-img";
import IconEditPhone from "@/public/svgs/icon-edit-phone";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
	const [username, setUserName] = useState("");
	const [fullname, setFullName] = useState("");
	const [registeredOn, setRegisteredOn] = useState("");
	const [role, setRole] = useState("");
	const [customerID, setCustomerID] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const getUsername = async (userName: any) => {
		setUserName(userName);
	};

	const handleFullname = (event: { target: { value: any } }) => {
		setFullName(event.target.value);
	};
	const handleUserName = (event: { target: { value: any } }) => {
		setUserName(event.target.value);
	};
	const handleRegisteredOn = (event: { target: { value: any } }) => {
		setRegisteredOn(event.target.value);
	};
	const handleRole = (event: { target: { value: any } }) => {
		setRole(event.target.value);
	};
	const handleCustomerID = (event: { target: { value: any } }) => {
		setCustomerID(event.target.value);
	};
	const handleEmail = (event: { target: { value: any } }) => {
		setEmail(event.target.value);
	};
	const handlePhone = (event: { target: { value: any } }) => {
		setPhone(event.target.value);
	};

	useEffect(() => {
		const getProfile = async function () {
			console.log(username);
			const setProfile = await axios.post("http://localhost:3001/getprofile", { username });

			if (setProfile.data) {
				setFullName(setProfile.data[0].fullName);
				setRegisteredOn(setProfile.data[0].datecreated);
				setRole(setProfile.data[0].role);
				setCustomerID(setProfile.data[0]._id);
				setEmail(setProfile.data[0].email);
				setPhone(setProfile.data[0].phonenumber);
			}
		};

		getProfile();
	}, [username]);

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		console.log(fullname, username, phone, email, role);

		fetch("http://localhost:3001/editprofile", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			mode: "cors",
			body: JSON.stringify({ username, phone, email, customerID }),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					window.location.href = "http://localhost:3000/profile";
				} else {
					alert("Gagal mengunggah data");
				}
			})
			.catch((error) => {
				console.error("Terjadi kesalahan:", error);
			});
	};

	return (
		<div>
			<Sidebar className="border-[3px] border-info-main" userName={getUsername} />
			<Topbar />
			<div className="ml-64 flex flex-col px-[40px] mt-[40px] pb-[67px]">
				<h3 className="text-black font-poppins text-[22px] font-normal leading-[150%]">Reservation</h3>
				<div className="mt-[24px] grid grid-cols-3 gap-[40px]">
					<div className="flex flex-col gap-[16px]">
						<p className="text-dark-1 font-poppins text-[16px] font-normal leading-[170%]">Profile Image</p>
						<Image src={"/images/set-profile.png"} width={300} height={300} alt="profile" className="w-full rounded-[15px]" />
						<button className="flex flex-row items-center gap-[8px] justify-center text-info-main font-poppins text-[12px] font-normal leading-[170%]">
							<IconEditImage />
							Change Profile Image
						</button>
					</div>
					<div className="col-span-2 flex flex-col">
						<p className="text-dark-1 font-poppins text-[16px] font-normal leading-[170%]">Onboarding</p>
						<div className="flex flex-col mt-[16px] gap-[16px]">
							<InputLabelProfile label="Registered on" onChange={handleRegisteredOn} disabled={true} value={registeredOn} />
							<InputLabelProfile label="Role" onChange={handleRole} disabled={true} value={role} />
						</div>
						<p className="text-dark-1 font-poppins text-[16px] font-normal leading-[170%] mt-[24px]">Onboarding</p>
						<div className="flex flex-col mt-[16px] gap-[16px]">
							<InputLabelProfile label="Customer ID" onChange={handleCustomerID} disabled={true} value={customerID} />
							<InputLabelProfile label="Full Name" onChange={handleFullname} disabled={true} value={fullname} />
							<InputLabelProfile label="Username" onChange={handleUserName} disabled={false} value={username} />
							<InputLabelProfile label="Email" onChange={handleEmail} disabled={false} value={email} icon={<Copy className="text-info-main" />} />
							<InputLabelProfile label="Phone" onChange={handlePhone} disabled={false} value={phone} icon={<IconEditPhone />} />
						</div>
						<button className="bg-info-main rounded-[10px] py-[16px] mt-[16px] text-white font-poppins text-[16px] font-normal leading-[170%]" onClick={handleSubmit}>
							Edit Information
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
