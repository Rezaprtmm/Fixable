import CardTestimonials from "./CardTestimonials/Index";

export default function Testimonials() {
  return (
    <div className="px-[100px] flex flex-col mt-[120px]">
      <h3 className="text-black font-poppins text-[44px] font-bold leading-[130%]">
        Testimonials
      </h3>
      <div className="flex flex-row items-center mt-[60px] gap-[20px]">
        {[1, 2, 3].map((index, item) => (
          <CardTestimonials key={`${index}-${item}`} />
        ))}
      </div>
    </div>
  );
}
