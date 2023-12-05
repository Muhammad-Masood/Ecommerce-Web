import Image from "next/image";
import { Button } from "../ui/button";
import { PImage } from "@/app/utils/types";
import { sora, sora_d, sora_l, sora_light } from "@/app/()/layout";

const Desc = ({ descImage }: { descImage: PImage }) => {
  return (
    <div className="relative">
      <div className="flex lg:justify-end justify-center">
        <h1
          className={`scroll-m-20 text-4xl tracking-wide lg:text-[2.75rem] max-w-[39rem] ${sora.className} leading-[55px] absolute top-[-6rem] px-[2rem]`}
        >
          Unique and Authentic Vintage Designer Jewellery
        </h1>
      </div>

      <div
        className={`bg-slate-50  lg:px-[8rem] md:px-[4rem] sm:px-[2rem]  pt-[7rem] pb-[3.8rem]`}
      >
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:space-y-0 sm:space-y-[4rem] lg:px-0 px-[2rem] lg:pt-0 pt-[4rem] gap-x-[6rem] gap-y-[2rem]">
          <div className="grid grid-cols-2 pt-4 lg:gap-x-[8rem] gap-x-[2rem]">
            <div className={`space-y-4`}>
              {/* <p className={`text-[6.875rem] ${sora.className} leading-[110px] absolute -mt-4 -z-10`}>Different<br/>from<br/>others</p> */}
              <h4 className={`desc-heading ${sora_d.className}`}>
                Using Good Quality Materials
              </h4>
              <p className={`desc-subheading`}>
                Lorem ipsum dolor sit amt, consectetur adipiscing elit.
              </p>
              <h4 className={`desc-heading ${sora_d.className}`}>
                Modern Fashion Design
              </h4>
              <p className={`desc-subheading ${sora_l.className}`}>
                Lorem ipsum dolor sit amt, consectetur adipiscing elit.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className={`desc-heading ${sora_d.className}`}>
                100% Handmade Products
              </h4>
              <p className={`desc-subheading ${sora_l.className}`}>
                Lorem ipsum dolor sit amt, consectetur adipiscing elit.
              </p>
              <h4 className={`desc-heading ${sora_d.className}`}>
                Discount for Bulk Orders
              </h4>
              <p className={`desc-subheading ${sora_l.className}`}>
                Lorem ipsum dolor sit amt, consectetur adipiscing elit.
              </p>
            </div>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-x-[6rem] ${sora_light.className} `}
          >
            {/* <div> */}
            <Image
              src={descImage.asset.url}
              width={500}
              alt="pm3"
              height={500}
              className="w-[25rem] h-[20rem] max-w-max"
            ></Image>
            {/* </div> */}

            <div className="space-y-5 pt-4 max-w-max ">
              <p
                style={{ wordSpacing: "0.8rem" }}
                className={` opacity-75 leading-[1.4rem] ${sora_light.className}`}
              >
                This piece is ethically crafted in our small family-owned
                workshop in Peru with unmatched attention to detail and care.
                The Natural color is the actual natural color of the fiber,
                undyed and 100% traceable.
              </p>
              <Button className="bg-black py-5 text-base ">
                See All Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desc;
