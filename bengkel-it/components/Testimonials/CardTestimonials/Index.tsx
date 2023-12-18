import Stars from "@/public/svgs/stars";
import Image from "next/image";

export default function CardTestimonials() {
  return (
    <div className="border-[1px] border-blue-lighter flex flex-col justify-center w-1/3 rounded-[30px] p-[20px]">
      <div className="flex flex-row items-center gap-[16px]">
        <Image
          src={"/images/users.png"}
          width={48}
          height={48}
          alt="users"
          className="w-[48px]"
        />
        <div className="flex flex-col">
          <h3 className="text-black font-poppins text-[16px] font-normal leading-[170%]">
            Username
          </h3>
          <p className="text-dark-3 font-poppins text-[12px] font-normal leading-[170%]">
            Customer
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center mt-[24px]">
        {[1, 2, 3, 4, 5].map((index, item) => (
          <Stars key={`${index}-${item}`} className="w-[24px]" />
        ))}
      </div>
      <p className="text-black font-poppins text-[12px] font-normal leading-[170%] mt-[16px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Dignissim sodales ut
        eu sem integer vitae justo. Quam quisque id diam vel quam. Tristique
        senectus et netus et malesuada. Gravida cum sociis natoque penatibus et
        magnis.
      </p>
    </div>
  );
}
