import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { sora, sora_light } from "@/app/()/layout";

const Newsletter = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2
        className={`text-center text-3xl font-bold tracking-wide transition-colors first:mt-0 ${sora.className}`}
      >
        Subscribe Our Newsletter
      </h2>
      <p
        className={`text-center leading-7 mt-3 ${sora_light.className} opacity-90`}
      >
        Get the latest information and promo offers directly
      </p>
      <p
        className={`absolute ${sora.className} text-[4rem] lg:text-[7.4rem] text-gray-200 opacity-40 -z-10`}
      >
        Newsletter
      </p>
      <div className="flex w-full max-w-sm items-center space-x-2 mt-8 lg:px-0 px-[2rem] lg:flex-row flex-col space-y-4 lg:space-y-0">
        <Input
          className="border-black rounded-none w-full pr-10"
          type="email"
          placeholder="Input email address"
        />
        <Button
          className="w-48 bg-black rounded-none"
          type="submit"
          variant={"default"}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Newsletter;
