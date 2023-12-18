import Hardware from "@/public/svgs/hardware";
import CardServices from "./CardServices/Index";
import Software from "@/public/svgs/software";
import Consultation from "@/public/svgs/consultation";
import Creation from "@/public/svgs/creation";

export default function Services() {
  return (
    <div className="px-[100px] flex flex-row gap-[125px] mt-[119px]">
      <div className="w-[43%] flex flex-col">
        <h3 className="text-black font-poppins text-[44px] font-bold leading-[130%]">
          What we provide for you
        </h3>
        <p className="text-dark-2 font-poppins text-[16px] font-normal leading-[170%] mt-[16px]">
          We try to help you solve{" "}
          <span className="text-error-main">your technology problems</span> by
          providing the <span className="text-blue-main">best solutions</span>.
          Choose a service and <span className="text-blue-main">have fun!</span>
        </p>
      </div>
      <div className="w-[57%]">
        <CardServices
          icon={<Hardware />}
          title="Hardware Repair"
          desc="Solve your hardware problems with us"
          className="mb-[24px]"
        />
        <CardServices
          icon={<Software />}
          title="Software Repair"
          desc="Fix your software before damaging your hardware"
          className="mb-[24px]"
        />
        <CardServices
          icon={<Consultation />}
          title="Consultation with Our Team"
          desc="Free technology consultation with our team, try it now!"
          className="mb-[24px]"
          classNameA="rotate-90"
        />
        <CardServices
          icon={<Creation />}
          title="Website/App Creation"
          desc="An easy way to create a website or application"
          className="mb-[24px]"
        />
      </div>
    </div>
  );
}
