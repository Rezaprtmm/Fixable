"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/svgs/logo";
import IconPassword from "@/public/svgs/icon-password";
import IconUsername from "@/public/svgs/icon-username";
import Label from "@/components/Label/Index";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SignIn() {
	const [userCred, setUserCred] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const request = "halo";

	const handleUserCred = (event: { target: { value: any } }) => {
		setUserCred(event.target.value);
	};
	const handlePassword = (event: { target: { value: any } }) => {
		setUserPassword(event.target.value);
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		fetch("http://localhost:3001/signin", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			mode: "cors",
			body: JSON.stringify({ userCred, userPassword }),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					window.location.href = "http://localhost:3000/discover";
				} else {
					alert("Username/email atau password salah");
				}
			})
			.catch((error) => {
				console.error("Terjadi kesalahan:", error);
			});
	};

	useEffect(() => {
		const isLogin = async function () {
			const loginCheck = await axios.post("http://localhost:3001/session", { request });

			if (loginCheck.data != false) {
				window.location.href = "http://localhost:3000/discover";
			}
		};

		isLogin();
	});

	return (
		<div className="pl-[100px] mx-auto flex flex-row h-screen">
			<div className="flex flex-col w-[40%] pr-[125px]">
				<Logo className="mt-[28px]" />
				<div className="flex flex-col mt-[100px]">
					<h1 className="font-poppins text-black text-[44px] font-bold leading-[130%]">
						We are <br />
						the <span className="text-blue-main">navigation</span>.
					</h1>
					<p className="text-[#6B7588] text-[16px] font-poppins font-bold leading-[130%] mt-[16px]">
						Welcome back, <br />
						please login to your account.
					</p>
				</div>
				<div className="flex flex-col mt-[25px] w-[51vh]">
					<Label name="Username or email" type="email" icon={<IconUsername />} onChange={handleUserCred} />
					<Label name="Password" forgot="Forgot Password?" type="password" icon={<IconPassword />} className="mt-[16px]" onChange={handlePassword} />
					<button className="w-full bg-blue-main py-[17px] rounded-[10px] text-[#ffff] text-[16px] font-poppins font-normal leading-[170%] mt-[24px]" onClick={handleSubmit}>
						Sign in
					</button>
				</div>
				<div className="flex flex-row gap-[3px] mt-[8px]">
					<p className="text-black text-[16px] font-normal leading-[170%]">Not have an account?</p>
					<Link href={"/sign-up"} className="text-blue-main text-[16px] font-normal leading-[170%]">
						Sign Up
					</Link>
				</div>
			</div>
			<div className="w-[60%]">
				<Image src={"/images/login.png"} width={1000} height={1024} alt="hero" className="w-full" />
			</div>
		</div>
	);
}
