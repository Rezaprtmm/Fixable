import Logo from "@/public/svgs/logo";
import Label from "@/components/Label/Index";
import IconUsername from "@/public/svgs/icon-username";
import IconPassword from "@/public/svgs/icon-password";
import Link from "next/link";
import Image from "next/image";
import IconEmail from "@/public/svgs/icon-email";

export default function SignUp() {
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
						<Label name="Fullname" type="text" icon={<IconUsername />} />
						<Label name="Username" type="text" icon={<IconUsername />} className="mt-[16px]" />
						<Label name="Email" type="text" icon={<IconEmail />} className="mt-[16px]" />
						<Label name="Password" type="password" icon={<IconPassword />} className="mt-[16px]" />
						<button className="w-full bg-blue-main py-[17px] rounded-[10px] text-[#ffff] text-[16px] font-poppins font-normal leading-[170%] mt-[16px]">Sign up</button>
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
