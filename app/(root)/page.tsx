import FeaturedCat from "@/components/FeaturedCat";
import Hero from "@/components/Hero";
import ProductSlide from "@/components/ProductSlide";
import { PROMO_CARD } from "../constants";
import Cards from "@/components/Cards";
import DisplayCollage from "@/components/DisplayCollage";
import { getAllPromotionalTags } from "@/prisma/repository/sectionRepo";

export default async function Home() {

  const promotionalTags = await getAllPromotionalTags();

  return (
    <div className="flex flex-col items-center">
    <Hero/>
    <FeaturedCat/>
    {promotionalTags && promotionalTags.map((promotion) => (
      <ProductSlide key={promotion.name} pageTitle={promotion.name} featuredProducts={promotion.products} description={promotion.description || ""} />
    ))}
    <DisplayCollage/>
    <div className="flex flex-col md:flex-row gap-8 py-10 items-center justify-center w-[95%]">
      {PROMO_CARD.map((promoCard, index) => (
        <Cards key={index} {...promoCard}/>
      ))}
    </div>
    </div>
  );
}
