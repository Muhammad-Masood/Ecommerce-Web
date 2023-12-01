import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Featured1 from "../../public/Featured1.webp";
import Featured2 from "../../public/Featured2.webp";
import Featured3 from "../../public/Featured3.webp";
import Featured4 from "../../public/Featured4.webp";
import Link from "next/link";
import { HeroSecData } from "@/app/utils/types";
import { Badge } from "components/ui/badge";
import { Lato, Roboto, Sora } from "next/font/google";
import "@/app/globals.css";
import { cabin, sora, sora_d, lato, sora_light } from "@/app/layout";

// const lato = Lato({
//   subsets: ["latin"],
//   weight: "900",
// });

const lato_light = Lato({
  subsets: ["latin"],
  weight: "400",
});

const Hero = ({ data }: { data: HeroSecData }) => {
  return (
    <main className="flex justify-between lg:flex-row sm:flex-col">
      <div
        className={`lg:mt-8 sm:mt-3 space-y-9 flex flex-col items-start`}
      >
        <Badge
          variant={"default"}
          className={`cursor-text bg-blue-100 text-blue-700 h-[40px] w-[120px] rounded-lg ${sora_d.className}  text-md flex items-center justify-center font-bold`}
        >
          Sale 70%
        </Badge>
        <p
          className={`font-extrabold text-[3rem] lg:text-[3.5rem] text-slate-900 dark:text-white lg:tracking-wider trackig-wide ${sora.className} leading-[55px] lg:leading-[60px]`}
        >
          An Industrial Take on Streetwear
        </p>
        <p
          className={`mt-4  text-slate-700 dark:text-slate-400 ${sora_light.className} lg:w-[70%]`}
        >
          Anyone can beat you but no one can beat your outfit as long as you
          wear Dine outfits.
        </p>
        <div>
          <Link href="/shop">
            <Button
              className={`bg-black py-[2rem] sm:text-left text-md ${sora_d.className} font-bold lg:max-w-[150px] tracking-wider space-x-3 leading-tight`}
            >
              <ShoppingCart className="h-7 w-7" />
              <p className="text-center">Start Shopping</p>
            </Button>
          </Link>
        </div>
        <div className="flex flex-wrap space-x-5 lg:flex-row space-y-2 opacity-50">
          <Image src={Featured1} alt="Featured1" className="pt-3"></Image>
          <Image src={Featured2} alt="Featured2"></Image>
          <Image src={Featured3} alt="Featured3"></Image>
          <Image src={Featured4} alt="Featured4"></Image>
        </div>
      </div>

      <div className="flex-shrink flex-grow flex">
        <div className="bg-orange-50 rounded-[45%] w-[600px] h-[600px] hidden lg:block">
          <Image
            src="/hero.png"
            alt="hero image"
            width={600}
            height={600}
            className="lg:top-14 absolute"
          ></Image>
        </div>
      </div>
    </main>
  );
};

export default Hero;
