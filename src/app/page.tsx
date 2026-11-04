import HeroSlider from "@/components/HeroSlider";
import NewArrivals from "@/components/NewArrivals";
import HowItWorks from "@/components/HowItWorks";
import TopCategories from "@/components/TopCategories";

export const metadata = {
  title: "BookNook | Home",
};

export default function Home() {
  return (
    <>
      <HeroSlider />
      <NewArrivals />
      <HowItWorks />
      <TopCategories />
    </>
  );
}