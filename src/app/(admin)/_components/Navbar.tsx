import { sora_l } from "@/app/()/layout";
import { PImage } from "@/app/utils/types";
import { AdminLink, adminLinks } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Navbar = ({ logo }: { logo: PImage }) => {
  return (
    <div
      className={`flex justify-between items-center ${sora_l.className} space-x-4 main`}
    >
      <Link href="/">
        <Image
          src={logo.asset.url}
          className="w-auto h-auto"
          alt="logo"
          width={140}
          height={140}
        />
      </Link>

      <div className="hidden lg:block pt-1">
        <NavigationMenu>
          <NavigationMenuList className="space-x-14">
            {adminLinks != null
              ? adminLinks.slice(0, 4).map((link: AdminLink, index: number) => (
                  <NavigationMenuItem className=" text-[18px]" key={index}>
                    <Link href={`/admin/${link.href}`}>{link.name}</Link>
                  </NavigationMenuItem>
                ))
              : null}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <UserButton />

      {/* <div className="lg:hidden">
      <Sheet open={isOpen}>
        <SheetTrigger onClick={() => setIsOpen(true)}>
          <Menu />
        </SheetTrigger>
        <SheetContent className="w-[300px]">
          <SheetHeader className="gap-y-1">
            {navLinks != null
              ? navLinks.slice(0, 6).map((category: Category) => (
                  <SheetTitle
                    className=" text-lg"
                    key={category.id}
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href={`/shop/${category.name}`} key={category.id}>
                      {category.name}
                    </Link>
                  </SheetTitle>
                ))
              : null}
            <SheetTitle>
              <Button
                className={`w-full gap-x-2 ${sora.className} tracking-wider`}
                onClick={() => {
                  router.push("/cart");
                  setIsOpen(false);
                }}
              >
                Cart{" "}
                <span className="right-0 h-6 w-6 rounded-full bg-black text-white flex items-center justify-center">
                  {state.cartItems}
                </span>{" "}
              </Button>
            </SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div> */}
    </div>
  );
};
