"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Key, MinusCircle, ShoppingCart, X } from "lucide-react";
import { PImage, Product, Size } from "@/app/utils/types";
import pro from "../../public/project.png";
import React, { useContext, useState } from "react";
import { CartContext } from "../../src/providers/CartContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { sora, sora_d, sora_l, sora_light } from "@/app/layout";
import { PlusCircle } from "lucide-react";

export const ProductView = (product: Product) => {
  const {
    size,
    images,
    main_image,
    name,
    subCategory,
    category,
    description,
    isSoldOut,
  } = product;
  const [currentMainImage, setCurrentMainImage] = useState<string>(
    main_image.asset.url
  );
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [state, dispatch] = useContext(CartContext);

  return (
    <div className="bg-zinc-50 -mt-[2rem] lg:px-[8rem] lg:py-[4rem] p-[2rem]">
      <div className="flex gap-x-3 lg:flex-row flex-col">
        <div className="flex gap-x-[2rem]">
          <div className="flex flex-col gap-y-[1rem] cursor-pointer">
            {images.slice(0, 2).map((image: PImage, index: number) => (
              <React.Fragment>
                {index === 0 && (
                  <Image
                    onClick={() => setCurrentMainImage(main_image.asset.url)}
                    width={100}
                    height={100}
                    className="lg:w-[90px] lg:h-[100px] md:w-[90px] md:h-[100px] w-[76px] h-[76px]"
                    alt="sub_image"
                    src={main_image.asset.url}
                  />
                )}

                <Image
                  onClick={() => setCurrentMainImage(image.asset.url)}
                  width={100}
                  height={100}
                  className="lg:w-[90px] md:w-[90px] lg:h-[100px] md:h-[100px] w-[76px] h-[76px]"
                  alt="sub_image"
                  src={image.asset.url}
                />
              </React.Fragment>
            ))}
          </div>

          <div className="lg:w-[80%] w-[85%] h-[100%]">
            <Image
              className=""
              src={currentMainImage}
              alt="product image"
              width={500}
              height={500}
            ></Image>
          </div>
        </div>

        <div className="flex flex-col mt-16 ml-3">
          <h1 className={`my-1 font-poppins text-3xl ${sora_l.className}`}>
            {product.name}
          </h1>
          <h3
            className={`mb-4 text-xl font-semibold text-gray-400 ${sora_d.className}`}
          >
            {subCategory.name}
          </h3>
          <p className={`my-1  ${sora_d.className}`}>SELECT SIZE</p>
          <ul className="flex space-x-5 my-1">
            {size.map((s, i) => (
              <li
                key={i}
                onClick={() => {
                  router.push(pathName + `?size=${s.name}`);
                }}
                className={`h-10 w-10 hover:rounded-full hover:bg-gray-50 hover:shadow-lg flex justify-center items-center duration-200 ${
                  searchParams.get("size") === s.name
                    ? "bg-gray-50 shadow-lg rounded-full"
                    : " "
                }
                cursor-pointer ${sora_d.className} text-gray-700`}
              >
                {s.name}
              </li>
            ))}
          </ul>

          <div className="flex gap-3 py-4">
            <h3 className={`my-2 font-bold text-lg ${sora_d.className}`}>
              Quantity:
            </h3>
            <div className="flex gap-[0.3rem] items-center">
              <MinusCircle
                onClick={() => dispatch({ type: "DECREASE_QUANTITY" })}
                className="w-[2rem] h-[2rem] cursor-pointer"
              />
              <span className="w-[2.1rem] h-[2.1rem] justify-center items-center flex">
                {state.quantity}
              </span>
              <PlusCircle
                onClick={() => dispatch({ type: "INCREASE_QUANTITY" })}
                className="w-[2rem] h-[2rem] cursor-pointer"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-3">
            <Button
              className={`bg-black py-6  ${sora_d.className}`}
              onClick={() => {
                if (product.quantity === undefined) product.quantity = 0;
                if(product.subTotal === undefined) product.subTotal = 0;
                
                state.cartProducts = state.cartProducts.map((cp) => cp._rev === product._rev && cp.orderSize === searchParams.get("size") ? {
                  ...cp,
                  quantity: cp.quantity + state.quantity,
                  subTotal: (cp.quantity + state.quantity) * cp.price
                } : cp);

                dispatch({
                  type: "ADD_TO_CART",
                  payload: {
                    items: state.quantity,
                    product: {
                      ...product,
                      quantity: state.quantity,
                      subTotal: product.price * state.quantity,
                      orderSize: searchParams.get("size")!,
                    },
                  },
                });
              }}
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <div className="flex justify-center items-center text-2xl font-semibold font-poppins">
              <h1 className={`${sora.className}`}>
                <b>$ {product.price}.00</b>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white mt-[7rem] lg:px-[4rem] md:px-[4rem] px-[2rem]  py-[3rem] space-y-4">
        <div className="relative">
          <p
            className={`${sora.className} lg:text-[7.5rem] md:text-[5rem] text-[3rem] font-bold opacity-5 `}
          >
            Overview
          </p>
          <p className={`${sora.className} text-[1.4rem] absolute top-[40%]`}>
            Product Information
          </p>
          <hr className="font-extrabold"></hr>
        </div>

        <div className="flex gap-x-[3rem] gap-y-[2rem] mb-5 lg:flex-row flex-col">
          <p
            className={`tracking-tight text-gray-500 ${sora_d.className} whitespace-nowrap
            `}
          >
            PRODUCT DETAILS
          </p>
          <p className={`${sora_l.className}`}>{description}</p>
        </div>
      </div>
    </div>
  );
};
