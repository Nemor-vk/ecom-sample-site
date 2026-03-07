import FeaturedCat from "@/components/FeaturedCat";
import Hero from "@/components/Hero";
import { PROMO_CARD } from "../constants";
import Cards from "@/components/Cards";
import DisplayCollage from "@/components/DisplayCollage";
import PromotionSliderWrapper from "@/components/product-slider/PromotionSliderWrapper";

export default async function Home() {

  return (
    <div className="flex flex-col items-center">
    <Hero/>
    <FeaturedCat/>

    <PromotionSliderWrapper>
      <DisplayCollage/>
    </PromotionSliderWrapper>

    {/* PROTIONAL CARDS */}
    <div className="flex flex-col md:flex-row gap-8 py-10 items-center justify-center w-[95%]">
      {PROMO_CARD.map((promoCard, index) => (
        <Cards key={index} {...promoCard}/>
      ))}
    </div>

    </div>
  );
}
