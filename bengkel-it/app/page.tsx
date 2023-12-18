import Consult from "@/components/Consult/Index";
import Footer from "@/components/Footer/Index";
import Hero from "@/components/Hero/Index";
import HeroImage from "@/components/HeroImage/Index";
import Navbar from "@/components/Navbar/Index";
import Repair from "@/components/Repair/Index";
import Services from "@/components/Services/Index";
import Testimonials from "@/components/Testimonials/Index";

export default function Home() {
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
