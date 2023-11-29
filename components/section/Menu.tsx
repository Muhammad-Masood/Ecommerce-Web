import React, { useState, ReactNode, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RootLayout from '@/app/layout';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@radix-ui/react-navigation-menu';
import { Search, ShoppingCart, XSquare } from 'lucide-react';
// import { contextProduct, contextVal } from "./CartContext";

export interface MenuProps {
  setHide: (hide: boolean) => void;
  children: ReactNode;
}

const Menu = ({  setHide,children }: MenuProps) => {
  const [show, setShow] = useState(true);
  // const {cartItems} = useContext(contextVal);

  return (
    <div className='p-5 '>
      {show ? (
        <nav >
          <div className="flex justify-between ">
            <Link href="/">
              <Image src="/Logo.webp" alt="website logo" width={150} height={150} />
            </Link>
            <XSquare onClick={() => setHide(false)} />
          </div>
          <div className='mt-[100px]'>
            <NavigationMenu>
              <NavigationMenuList >
                <NavigationMenuItem className="space-x-12 text-lg">
                  <Link href="/allprod/kids">Kids</Link>
                  <Link href="/allprod/boys">Boys</Link>
                  <Link href="/allprod/men">Men</Link>
                  <Link href="/allprod">All Products</Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex border border-black-600 rounded-lg items-center pl-2 mt-3">
            <Search className="bg-white rounded-l h-4" />
            <input
              type="text"
              placeholder="What you are looking for"
              className="rounded-r p-1 w-72 focus:outline-none"
            />
          </div>
          {/* <Link href="/cart" className="p-2 rounded-full bg-gray-200 hover:scale ease-in duration-300">
        <ShoppingCart className="relative"
        />
        <span className="absolute top-6 right-32 h-6 w-6 text-center rounded-full bg-[#f02d34] text-white">
          {cartItems}
        </span>
      </Link> */}
        </nav>
      ) : (
        /* @ts-expect-error Async Server Component */
        <RootLayout>{children}</RootLayout>
      )}
    </div>
  );
};

export default Menu;