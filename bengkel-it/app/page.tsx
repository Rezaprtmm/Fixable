"use client";
import Consult from "@/components/Consult/Index";
import Footer from "@/components/Footer/Index";
import Hero from "@/components/Hero/Index";
import HeroImage from "@/components/HeroImage/Index";
import Navbar from "@/components/Navbar/Index";
import Repair from "@/components/Repair/Index";
import Services from "@/components/Services/Index";
import Testimonials from "@/components/Testimonials/Index";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
	const request = "load!";
	useEffect(() => {
		const loadDB = async function () {
			const loadData = await axios.post("http://localhost:3001/initdata", { request });
		};
		loadDB();
	}, []);

	return (
		<div>
			<Navbar />
			<Hero />
			<HeroImage />
			<Services />
			<Repair />
			<Consult />
			<Testimonials />
			<Footer />
		</div>
	);
}
