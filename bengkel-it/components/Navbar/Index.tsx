"use client";
import Logo from "@/public/svgs/logo";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Navbar() {
	const request = "halo";
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const [username, setUsername] = useState("Sign In");

	useEffect(() => {
		const fetchData = async () => {
			const checkSession = await axios.post("http://localhost:3001/session", { request });
			if (checkSession.data) {
				setUsername(checkSession.data);
				setIsLogin(true);
			} else {
				setIsLogin(false);
			}
		};

		fetchData();
	}, []);
	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>, buttonText: string) => {
		e.preventDefault();

		if (!isLogin) {
			window.location.href = "http://localhost:3000/sign-in";
		} else if (isLogin && buttonText == "Reservation") {
			window.location.href = "http://localhost:3000/reservation/member";
		} else if (isLogin && buttonText == "Dashboard") {
			window.location.href = "http://localhost:3000/discover";
		}
	};

	return (
		<div className="bg-white w-full">
			<div className="px-[100px] mx-auto flex flex-row items-center justify-between py-[28px]">
				<Logo />
				<div className="flex flex-row items-center gap-[30px]">
					<button onClick={(e) => handleSubmit(e, "Reservation")} className="text-black font-poppins text-[16px] font-normal leading-[170%]">
						Reservation
					</button>
					<Link href={"#"} className="text-black font-poppins text-[16px] font-normal leading-[170%]">
						Services
					</Link>
					<Link href={"#"} className="text-black font-poppins text-[16px] font-normal leading-[170%]">
						Portofolio
					</Link>
					<button onClick={(e) => handleSubmit(e, "Dashboard")} className="text-black font-poppins text-[16px] font-normal leading-[170%]">
						Dashboard
					</button>
				</div>
				{isLogin ? (
					<button className="bg-blue-main px-[24px] py-[12px] rounded-[26px] text-white font-poppins text-[16px] font-normal leading-[170%]" onClick={(e) => handleSubmit(e, "Login")}>
						{username}
					</button>
				) : (
					<button className="bg-blue-main px-[24px] py-[12px] rounded-[26px] text-white font-poppins text-[16px] font-normal leading-[170%]" onClick={(e) => handleSubmit(e, "Login")}>
						Sign In
					</button>
				)}
			</div>
		</div>
	);
}
