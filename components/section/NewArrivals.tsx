"use client";

import Image from "next/image";
import { Product } from "@/app/utils/types";
import ProductCard from "./ProductCard";
import { Cinzel, Cinzel_Decorative, Lato, Sora } from "next/font/google";
import { lato, sora_light } from "@/app/layout";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';

const NewArrivals = ({ data }: { data: Product[] }) => {
  return (
    <div className="space-y-7">
      <div
        className={`space-y-3 mt-40 flex flex-col ${sora_light.className} justify-center items-center`}
      >
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-sm font-bold tracking-wider text-blue-600 ">
          New Arrivals
        </p>
        <h2 className="text-center scroll-m-20 pb-2 text-4xl font-bold tracking-wide transition-colors first:mt-0 p-1 sm:text-left">
          Latest Collections
        </h2>
      </div>
      <Swiper
        watchSlidesProgress={true}
        slidesPerView={3}
        className="mySwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        modules={[EffectCoverflow]}
        effect="coverflow"
      >
        {data.slice(0, 6).map((product) => (
          <SwiperSlide key={product._rev} >
            <ProductCard
              prop={product}
              width={345}
              height={400}
              key={product._rev}
              hover={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewArrivals;
