"use client";
import CardTestimonials from "./CardTestimonials/Index";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import "swiper/css";

interface Item {
  username: string;
  message: string;
}

export default function Testimonials() {
  const [reviewData, setReviewData] = useState<Item[]>([]);
  const [isReview, setIsReview] = useState(false);
  const request = "halo";
  useEffect(() => {
    const fetchReview = async function () {
      const getReview = await axios.post("http://localhost:3001/getallreview", {
        request,
      });

      if (getReview.data) {
        setIsReview(true);
        setReviewData(getReview.data);
      } else {
        setReviewData(getReview.data);
        setIsReview(false);
      }
    };

    fetchReview();
  });
  return (
    <div className="px-[100px] flex flex-col mt-[120px]">
      <h3 className="text-black font-poppins text-[44px] font-bold leading-[130%]">
        Testimonials
      </h3>
      {isReview ? (
        <div className="flex flex-row items-center mt-[60px] gap-[20px]">
          <Swiper slidesPerView={3} spaceBetween={20}>
            {reviewData.map((item, index) => (
              <SwiperSlide key={index}>
                <CardTestimonials
                  username={item.username}
                  message={item.message}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
