"use client";
import ArrowNav from "@/public/svgs/arrow-nav";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect, useRef } from "react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function Repair() {
  const navigationPrev = useRef(null);
  const navigationNext = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState<any | null>(null);

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.params.navigation.prevEl = navigationPrev.current;
      swiperInstance.params.navigation.nextEl = navigationNext.current;

      swiperInstance.navigation.destroy(); // Reset navigation
      swiperInstance.navigation.init(); // Initialize navigation again
      swiperInstance.navigation.update(); // Update navigation
    }
  }, [swiperInstance]);

  return (
    <div className="bg-blue-darker w-full mt-[120px]" id="portofolio">
      <div className="pl-[170px] flex flex-row pt-[120px] gap-[125px]">
        <div className="w-[43%]">
          <h3 className="bg-gradient-to-r from-blue-lighter to-white bg-clip-text text-transparent font-poppins text-[44px] font-bold leading-[130%]">
            What we&lsquo;ve done
          </h3>
          <p className="text-light-1 font-poppins text-[16px] font-normal leading-[170%] mt-[16px]">
            Some problems we have resolved.
          </p>
          <div className="flex flex-row gap-[10px] mt-[16px]">
            <button ref={navigationPrev}>
              <ArrowNav className="bg-white p-[8px] rounded-[32px]" />
            </button>
            <button ref={navigationNext}>
              <ArrowNav className="bg-white p-[8px] rounded-[32px] rotate-180" />
            </button>
          </div>
        </div>
        <div className="w-[57%] flex flex-row">
          <Swiper
            modules={[Navigation]}
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            navigation={{
              nextEl: navigationNext.current,
              prevEl: navigationPrev.current,
            }}
            className="swiperRepair"
          >
            <SwiperSlide>
              <Image
                src={"/images/harddisk.png"}
                width={815}
                height={580}
                alt="harddisk"
                className="w-full"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={"/images/harddisk.png"}
                width={815}
                height={580}
                alt="harddisk"
                className="w-full"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={"/images/harddisk.png"}
                width={815}
                height={580}
                alt="harddisk"
                className="w-full"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
