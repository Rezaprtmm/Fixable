"use client";
import Logo from "@/public/svgs/logo";
import Label from "@/components/Label/Index";
import IconUsername from "@/public/svgs/icon-username";
import IconPassword from "@/public/svgs/icon-password";
import Link from "next/link";
import Image from "next/image";
import IconEmail from "@/public/svgs/icon-email";
import { useState } from "react";

export default function SignUp() {
	const [fullName, setFullName] = useState("");
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [nim, setNim] = useState("");
	const [password, setPassword] = useState("");
	const [isFullName, setIsFullName] = useState<boolean>(false);
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const handleFullName = (event: { target: { value: any } }) => {
		setFullName(event.target.value);
	};
	const handleUserName = (event: { target: { value: any } }) => {
		setUserName(event.target.value);
	};
	const handleNIM = (event: { target: { value: any } }) => {
		setNim(event.target.value);
	};
	const handleEmail = (event: { target: { value: any } }) => {
		setEmail(event.target.value);
	};
	const handlePassword = (event: { target: { value: any } }) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		if (fullName == "") {
			alert("Please insert your full name");
		} else if (fullName.length < 3 && isFullName == false) {
			const confirmName = confirm("Your full name is too short. Are you sure to proceed?");
			if (confirmName) {
				setIsFullName(true);
			} else {
				setIsFullName(false);
			}
		} else if (userName == "") {
			alert("Please insert username");
		} else if (userName.length < 4) {
			alert("Your username is too short");
		} else if (nim == "") {
			alert("Please insert your NIM");
		} else if (nim.length < 9) {
			alert("Please insert valid NIM");
		} else if (email == "") {
			alert("Please insert your email");
		} else if (!emailPattern.test(email)) {
			alert("Please insert valid email");
		} else if (password == "") {
			alert("Please insert password");
		} else if (password.length < 8) {
			alert("Your password is too short");
		} else {
			fetch("http://localhost:3001/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				mode: "cors",
				body: JSON.stringify({ fullName, userName, email, nim, password }),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data == true) {
						window.location.href = "http://localhost:3000/discover";
					} else if (data == "nim-exist") {
						alert("NIM sudah terdaftar");
					} else if (data == "data-exist") {
						alert("Username atau email sudah terdaftar");
					} else {
						alert("Format email salah");
					}
				})
				.catch((error) => {
					console.error("Terjadi kesalahan:", error);
				});
		}
	};

	return (
		<div className="pl-[100px] flex flex-col mt-[28px]">
			<Logo />
			<div className="flex flex-row items-center mt-[64px]">
				<div className="w-[40%]">
					<div className="flex flex-col">
						<h1 className="font-poppins text-black text-[44px] font-bold leading-[130%]">
							Get your <br />
							<span className="text-blue-main">navigation</span>.
						</h1>
						<p className="text-[#6B7588] text-[16px] font-poppins font-bold leading-[130%] mt-[16px]">
							Welcome to Bengkel IT, <br />
							please complete your data.
						</p>
					</div>
					<div className="flex flex-col mt-[24px] w-[51vh]">
						<Label name="Fullname" type="text" icon={<IconUsername />} onChange={handleFullName} />
						<Label name="Username" type="text" icon={<IconUsername />} className="mt-[16px]" onChange={handleUserName} />
						<Label name="NIM" type="text" icon={<IconUsername />} className="mt-[16px]" onChange={handleNIM} />
						<Label name="Email" type="text" icon={<IconEmail />} className="mt-[16px]" onChange={handleEmail} />
						<Label name="Password" type="password" icon={<IconPassword />} className="mt-[16px]" onChange={handlePassword} />
						<button className="w-full bg-blue-main py-[17px] rounded-[10px] text-[#ffff] text-[16px] font-poppins font-normal leading-[170%] mt-[16px]" onClick={handleSubmit}>
							Sign up
						</button>
					</div>
					<div className="flex flex-row gap-[3px] mt-[8px]">
						<p className="text-black text-[16px] font-normal leading-[170%]">Already have an account?</p>
						<Link href={"/sign-in"} className="text-blue-main text-[16px] font-normal leading-[170%]">
							Login
						</Link>
					</div>
				</div>
				<div className="w-[60%]">
					<Image src={"/images/signup.png"} width={885} height={800} alt="signup" className="w-full" />
				</div>
			</div>
		</div>
	);
}
