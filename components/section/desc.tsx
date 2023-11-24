import Image from "next/image";
import { Button } from "../ui/button";
import { PImage } from "@/app/utils/types";
import { sora, sora_light } from "@/app/layout";

const Desc = ({ descImage }: { descImage: PImage }) => {
  return (
    <div className="relative">
      <div className="flex lg:justify-end justify-center">
        <h1
          className={`scroll-m-20 text-4xl tracking-wide lg:text-[2.75rem] max-w-[29rem] ${sora.className} leading-[55px] absolute top-[-6rem] px-[2rem]`}
        >
          Unique and Authentic Vintage Designer Jewellery
        </h1>
      </div>

      <div className={`bg-slate-50 ${sora_light.className} lg:px-[8rem] md:px-[4rem] sm:px-[2rem]  pt-[7rem] pb-[3.5rem]`}>
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:space-y-0 sm:space-y-[4rem]">
          <div className="grid grid-cols-2 pt-8">
          <div className={`space-y-4`}>
            {/* <p className={`text-[6.875rem] ${sora.className} leading-[110px] absolute -mt-4 -z-10`}>Different<br/>from<br/>others</p> */}
            <h4 className="scroll-m-20  text-lg font-semibold tracking-wide leading-6">
              Using Good Quality Materials
            </h4>
            <p className="opacity-75">
              Lorem ipsum dolor sit amt, consectetur adipiscing elit.
            </p>
            <h4 className="scroll-m-20 text-lg font-semibold tracking-wide leading-6">
              Modern Fashion Design
            </h4>
            <p className="">
              Lorem ipsum dolor sit amt, consectetur adipiscing elit.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="scroll-m-20 text-lg font-semibold tracking-wide leading-6">
              100% Handmade Products
            </h4>
            <p className="">
              Lorem ipsum dolor sit amt, consectetur adipiscing elit.
            </p>
            <h4 className="scroll-m-20 text-lg font-semibold tracking-wide leading-6">
              Discount for Bulk Orders
            </h4>
            <p className="">
              Lorem ipsum dolor sit amt, consectetur adipiscing elit.
            </p>
          </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <Image
              src={descImage.asset.url}
              width={400}
              alt="pm3"
              height={400}
            ></Image>
          </div>

          <div className="space-y-5 pl-6 pt-8">
            <p style={{ wordSpacing: "0.8rem" }} className="opacity-75">
              This piece is ethically crafted in our small family-owned workshop
              in Peru with unmatched attention to detail and care. The Natural
              color is the actual natural color of the fiber, undyed and 100%
              traceable.
            </p>
            <Button className="bg-black py-5 text-base ">See All Product</Button>
          </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Desc;
