"use client";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
	const request = "halo";
	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		fetch("http://localhost:3001/session", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			mode: "cors",
			body: JSON.stringify({ request }),
		})
			.then((response) => response.json())
			.then((data) => {
				if (!data) {
					window.location.href = "http://localhost:3000/sign-in";
				} else {
					window.location.href = "http://localhost:3000/reservation/member";
				}
			})
			.catch((error) => {
				console.error("Terjadi kesalahan:", error);
			});
	};
	return (
		<div className="px-[100px] mx-auto flex flex-col items-center gap-[24px]">
			<h1 className="w-[1030px] text-black font-poppins text-[44px] font-bold leading-[130%] text-center z-10 mt-[120px]">
				Technology is the <span className="text-blue-main">ocean</span> and we are the <span className="text-blue-main">navigation</span>.
			</h1>
			<p className="text-black font-poppins text-[16px] font-normal leading-[170%] text-center">Quick solution to your technology problems, find your way at Bengkel IT!</p>
			<div className="flex flex-row items-center gap-[16px]">
				<button className="bg-blue-main rounded-[26px] px-[24px] py-[12px] text-white font-poppins text-[16px] font-normal leading-[170%]" onClick={handleSubmit}>
					Reserve now
				</button>
				<Link href={"#"} className="border-[1px] border-blue-main rounded-[26px] px-[24px] py-[12px] text-blue-main font-poppins text-[16px] font-normal leading-[170%]">
					Consultation
				</Link>
			</div>
			<Image src={"/images/hero.png"} width={1240} height={501} alt="hero" className="absolute -z-10" />
		</div>
	);
}
