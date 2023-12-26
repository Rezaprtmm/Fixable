"use client";
import CardTestimonials from "./CardTestimonials/Index";
import { useEffect, useState } from "react";
import axios from "axios";

interface Item {
  username: string;
  message: string;
}

export default function Testimonials() {
  const [reviewData, setReviewData] = useState<Item[]>([]);
  const request = "halo";
  useEffect(() => {
    const fetchReview = async function () {
      const getReview = await axios.post("http://localhost:3001/getallreview", { request });

      setReviewData(getReview.data);
    };

    fetchReview();
  }, []);
  return (
    <div className="px-[100px] flex flex-col mt-[120px]">
      <h3 className="text-black font-poppins text-[44px] font-bold leading-[130%]">Testimonials</h3>
      <div className="flex flex-row items-center mt-[60px] gap-[20px]">
        {reviewData.map((item, index) => (
          <CardTestimonials key={`${index}-${item}`} username={item.username} message={item.message} />
        ))}
      </div>
    </div>
  );
}
