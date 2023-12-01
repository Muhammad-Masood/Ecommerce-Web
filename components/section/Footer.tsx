import { sora_light } from "@/app/layout";
import {
  FacebookIcon,
  LinkedinIcon,
  LucideTwitter,
  TwitchIcon,
  TwitterIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="pt-8 main">
      <div className="m-4 mt-24 mb-40 lg:flex gap-x-40 lg:space-y-0 space-y-6">
        <div className="flex flex-col w-40 gap-y-10">
          <Image src="/Logo.webp" alt="logo" width={150} height={50}></Image>
          <p
            className={`leading-tight tracking-wide w-80 text-gray-600 font-poppins ${sora_light.className}`}
          >
            Small, artisan label that offers a thoughtfully curated collection
            of high quality everyday essentials made.
          </p>
          <div className="flex space-x-4">
            <Link href="/" className="bg-gray-200 rounded-lg p-2">
              <TwitterIcon />
            </Link>
            <Link href="/" className="bg-gray-200 rounded-lg p-2">
              <FacebookIcon />
            </Link>
            <Link href="https://www.linkedin.com/in/muhammad-masood-b9a091248/" className="bg-gray-200 rounded-lg p-2">
              <LinkedinIcon />
            </Link>
          </div>
        </div>
        <div className="lg:flex lg:ml-28 lg:space-x-16 lg:space-y-0 space-y-8 ">
          <div>
            <h4 className="scroll-m-20 text-xl font-bold tracking-wide text-gray-600">
              Company
            </h4>
            <div
              className={`mt-5 space-y-3 w-40 tracking-wide text-gray-600 font-poppins ${sora_light.className}`}
            >
              <p>
                <Link href="/" className="">
                  About
                </Link>
              </p>
              <p>
                <Link href="/">Terms Of Use</Link>
              </p>
              <p>
                <Link href="/"> Privacy Policy</Link>
              </p>
              <p>
                <Link href="/">How it Works</Link>
              </p>
              <p>
                <Link href="/">Contact Us</Link>
              </p>
            </div>
          </div>
          <div>
            <h4 className="scroll-m-20 text-xl font-bold tracking-wide text-gray-600">
              Support
            </h4>
            <div
              className={`mt-5 space-y-3 w-40 tracking-wide text-gray-600 font-poppins ${sora_light.className}`}
            >
              <p>
                <Link href="/">Support Carrer</Link>
              </p>
              <p>
                <Link href="/">24h Service</Link>
              </p>
              <p>
                <Link href="/"> Quick Chat</Link>
              </p>
            </div>
          </div>
          <div>
            <h4 className="scroll-m-20 text-xl font-bold tracking-wide text-gray-600">
              Contact
            </h4>
            <div className="mt-5 space-y-3 w-40 tracking-wide text-gray-600">
              <p className="">Whatsapp</p>
              <p>Support 24h</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-black"></hr>
      <div className="flex justify-between  mt-5 flex-wrap lg:space-y-0 md:space-y-0 space-y-4">
        <p className="font-semibold text-gray-500 min-w-max">
          Copyright © 2023 Muhammad Masood
        </p>
        {/* <p className={`lg:w-40 min-w-max text-gray-500 ${sora_light.className}`}>
          Design by. <span className="font-bold text-black">Sameer Nadir</span>
        </p> */}
        <Link href="https://github.com/Muhammad-Masood">
        <p className={`lg:w-64 min-w-max text-gray-500 ${sora_light.className}`}>
          Code by.{" "}
          <span className="text-black font-bold">
            {" "}
            Muhammad-Masood on github{" "}
          </span>
        </p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
