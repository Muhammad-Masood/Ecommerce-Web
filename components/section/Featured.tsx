import Image from "next/image";
import ProductCard from "./ProductCard";
import { fetchFeaturedProducts } from "@/app/data";
import { FeaturedData, Product } from "@/app/utils/types";
import { sora_d } from "@/app/layout";

const Featured = ({ featuredProducts, data }: { featuredProducts: Product[], data: FeaturedData}) => {
  // console.log(featuredProducts[0]);
  return (
    <div  className={`space-y-7 ${sora_d.className}`}>
      <div className="space-y-3 flex flex-col justify-center items-center">
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-sm font-bold tracking-wider text-blue-600">
          PRODUCTS
        </p>
        <h2 className="text-center scroll-m-20 pb-2 text-4xl font-bold tracking-wide transition-colors first:mt-0">
          Check What We Have
        </h2>
      </div>
      <div className="flex flex-wrap justify-center">
        {featuredProducts.map((product) => (
          <ProductCard prop={product} key={product._rev} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
